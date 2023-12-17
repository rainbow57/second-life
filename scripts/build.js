const execa = require('execa')
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const parseArgs = require('minimist')
const { targets: allTargets, fuzzyMatchTarget } = require('./utils')
const { gzipSync } = require('zlib')

const args = parseArgs(process.argv.splice(2))
const targets = args._
const formats = args.formats || args.f
const devOnly = args.devOnly || args.d
const prodOnly = !devOnly && (args.prodOnly || args.p)
const sourceMap = args.sourcemap || args.s
const isRelease = args.release
const buildTypes = args.t || args.types || isRelease
const buildAllMatching = args.all || args.a
const commit = execa.sync('git', ['rev-parse', 'HEAD']).stdout.slice(0, 7)
console.log('buildTypes :>> ', buildTypes)

/**
 * 并行执行
 * @param {number} maxConCurrency 并行数量
 * @param {object} source 源
 * @param {function} iteratorFn 迭代函数
 */
async function runParallel(maxConCurrency, source, iteratorFn) {
    const ret = []
    const executing = []
    for (const item of source) {
        const p = Promise.resolve().then(() => iteratorFn(item, source))
        ret.push(p)

        if (maxConCurrency <= source.length) {
            const e = p.then(() => executing.splice(executing.indexOf(e), 1))
            executing.push(e)
            if (executing.length >= maxConCurrency) {
                await Promise.race(executing)
            }
        }
    }
    return Promise.all(ret)
}

async function build(target) {
    const pkgDir = path.resolve(`packages/${target}`)
    const pkg = require(`${pkgDir}/package.json`)

    if ((isRelease || !targets.length) && pkg.private) return
    // 没有指定格式，则移除 dist 目录重新编译
    if (!formats) {
        await fs.remove(`${pkgDir}/dist`)
    }
    const env =
        (pkg.buildOptions && pkg.buildOptions.env) || (devOnly ? 'development' : 'production')
    await execa(
        'rollup',
        [
            '-c',
            '--bundleConfigAsCjs',
            '--environment',
            [
                `COMMIT:${commit}`,
                `NODE_ENV:${env}`,
                `TARGET:${target}`,
                formats ? `FORMATS:${formats}` : '',
                buildTypes ? 'TYPES:true' : '',
                prodOnly ? 'PROD:true' : '',
                sourceMap ? 'SOURCE_MAP:true' : ''
            ]
                .filter(Boolean)
                .join(',')
        ],
        { stdio: 'inherit' }
    )

    if (buildTypes && pkg.types) {
        console.log()
        console.log(chalk.bold(chalk.yellow(`Rolling up type definitions for ${target}...`)))
        const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor')

        const extractorConfigPath = path.resolve(pkgDir, 'api-extractor.json')
        const extractorConfig = ExtractorConfig.loadFileAndPrepare(extractorConfigPath)
        const extractorResult = Extractor.invoke(extractorConfig, {
            localBuild: true,
            showVerboseMessages: true
        })

        if (extractorResult.sucessed) {
            // 合并 d.ts 到 rollup 的 dts
            const typesDir = path.resolve(pkgDir, 'types')
            if (await fs.exists(typesDir)) {
                const dtsPath = path.resolve(pkgDir, pkg.types)
                const existing = await fs.readFile(dtsPath, 'utf-8')
                const typeFiles = await fs.readdir(typesDir)
                const toAdd = await Promise.all(
                    typeFiles.map(file => fs.readFile(path.resolve(typesDir, file), 'utf-8'))
                )
                await fs.writeFile(dtsPath, existing + '\n' + toAdd.join('\n'))
            }
            console.log(chalk.bold(chalk.green('API Extractor completed successfully.')))
        } else {
            console.error(
                `API Extractor completed with ${extractorResult.errorCount} errors and ${extractorResult.warningCount} warnings`
            )
            process.exitCode = 1
        }
    }
}

async function buildAll(targets) {
    await runParallel(require('os').cpus().length, targets, build)
}

function checkFileSize(filePath) {
    if (!fs.existsSync(filePath)) return

    const file = fs.readFileSync(filePath)
    const minSize = (file.length / 1024).toFixed(2) + 'kb'
    const gzipped = gzipSync(file)
    const gzippedSize = (gzipped.length / 1024).toFixed(2) + 'kb'
    const compressed = compress(file)
    const compressedSize = (compressed.length / 1024).toFixed(2) + 'kb'
    console.log(
        `${chalk.gray(
            chalk.bold(path.basename(filePath))
        )} min:${minSize} / gzip:${gzippedSize} / brotil:${compressedSize}`
    )
}

function checkSize(target) {
    const pkgDir = path.resolve(`packages/${target}`)
    checkFileSize(`${pkgDir}/dist/${target}.global.prod.js`)
    if (!formats || formats.includes('global-runtime')) {
        checkFileSize(`${pkgDir}/dist/${target}.runtime.global.prod.js`)
    }
}

function checkAllSizes(targets) {
    if (devOnly || (formats && !formats.includes('global'))) return
    console.log()
    for (const target of targets) {
        checkSize(target)
    }
    console.log()
}

async function run() {
    console.log('isRelease :>> ', isRelease)
    if (isRelease) {
        await fs.remove(path.resolve(__dirname, './node_modules/.rts2_cache'))
    }
    if (!targets.length) {
        await buildAll(allTargets)
        checkAllSizes(allTargets)
    } else {
        await buildAll(fuzzyMatchTarget(targets, buildAllMatching))
        checkAllSizes(fuzzyMatchTarget(targets, buildAllMatching))
    }
}
// 执行
run()
