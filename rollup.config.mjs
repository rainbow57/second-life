import path from 'path'
import ts from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import polyfillNode from 'rollup-plugin-polyfill-node'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'

if (!process.env.TARGET) {
	throw new Error('TARGET package must be specified via --environment flag.')
  }

// packages 目录所在路径
const packagesDir = path.resolve(__dirname, 'packages')
// 各个包打包输出目录
const packageDir = path.resolve(packagesDir, process.env.TARGET)
// 返回当前包打包输出路径
const resolve = p => path.resolve(packageDir, p)
// 加载 package.json 文件
const pkg = require(resolve('package.json'))
// 主版本号
const masterVersion = require('./package.json').version
// package.json 打包配置
const packageOptions = pkg.buildOptions | {}
// 包名
const name = packageOptions.filename || path.basename(packageDir)

// ensure TS checks only once for each build
let hasTSChecked = false

const outputConfigs = {
	'esm-bundler': {
		file: resolve(`dist/index.esm-bundler.js`),
		format: 'es'
	},
	'esm-browser': {
		file: resolve(`dist/index.esm-browser.js`),
		format: 'es'
	},
	cjs: {
		file: resolve(`dist/index.cjs.js`),
		format: 'cjs'
	},
	global: {
		file: resolve(`dist/index.global.js`),
		format: 'iife'
	},
	'esm-bundler-runtime': {
		file: resolve(`dist/index.runtime.esm-bundler.js`),
		format: 'es'
	},
	'esm-browser-runtime': {
		file: resolve(`dist/index.runtime.esm-browser.js`),
		format: 'es'
	},
	'global-runtime': {
		file: resolve(`dist/index.runtime.global.js`),
		format: 'iife'
	}
}

// 默认打包格式
const defaultFormats = ['esm-bundler', 'cjs']
// 打包指令指定的打包格式
const inlineFormats = process.env.FORMATS && process.FORMATS.split(',')
const packageFormats = inlineFormats || defaultFormats
// 根据打包格式返回一个数组
const packageConfigs = process.env.PROD_ONLY ? [] : packageFormats.map(format => createConfig(format, outputConfigs[format]))

function createReplacePlugin(isProduction, isBundlerESMBuild, isBrowserESMBuild, isBrowserBuild, isGlobalBuild, isNodeBuild, isCompatBuild, isServerRenderer) {
	const replacements = {
		__COMMIT__: `"${process.env.COMMIT}"`,
		__VERSION__: `${masterVersion}`,
		__DEV__: isBundlerESMBuild ? '(process.env.NODE_ENV !== "production")' : !isProduction,
		__TEST__: false,
		__BROWSER__: isBrowserBuild,
		__GLOBAL__: isGlobalBuild,
		__ESM_BUNDLER__: isBundlerESMBuild,
		__ESM_BROWSER__: isBrowserESMBuild,
		__NODE_JS__: isNodeBuild,
		__SSR__: isNodeBuild || isBundlerESMBuild || isServerRenderer,
		// for compiler-sfc browser build inlined deps
		...(isBrowserESMBuild ? {'process.env': '({})', 'process.platform': '""', 'process.stdout': 'null'} : {}),
		// compat build
		__COMPAT__: isCompatBuild
	}
	Object.keys(replacements).forEach(key => {
		if (key in process.env) {
			replacements[key] = process.env[key]
		}
	})
	return replace({
		values: replacements,
		preventAssignment: true
	})
}

/**
 * 生成对应格式的打包配置
 * @param {string} format 打包格式（必传）
 * @param {object} output 某个格式的打包输出配置（必传）
 * @param {array} plugins 插件数组
 */
function createConfig(format, output, plugins = []) {
	if (!format || !output) {
		// 缺少必传参数
		console.error(`无效格式: "${format}"`)
		process.exit(1)
	}
	// node 环境中明确指明 __DEV__ 为 false 或者 传入的输出文件中包含 prod.js 则判断为打生产环境的包
	const isProductionBuild = process.env.__DEV__ === 'false' || /\.prod\.js/.test(output.file)
	const isBundlerESMBuild = /esm-bundler/.test(output.format)
	const isBrowserESMBuild = /esm-browser/.test(output.format)
	// 是否服务端渲染
	const isServerRenderer = name === 'server-renderer'
	const isNodeBuild = format === 'cjs'
	const isGlobalBuild = /global/.test(format)
	const isCompatPackage = pkg.name.includes('/compat')
	const isCompatBuild = !!packageOptions.compat

	output.exports = isCompatPackage ? 'auto' : 'named'
	output.sourcemap = !!process.env.SOURCE_MAP
	output.externalLiveBindings = false

	if (isGlobalBuild) {
		output.name = packageOptions.name
	}

	const shouldEmitDeclarations = pkg.types && process.env.TYPES !== null && !hasTSChecked
	// TypeScript 插件配置
	const tsPlugin = ts({
		check: process.env.NODE_ENV === 'production' && !hasTSChecked,
		tsconfig: path.resolve(__dirname, 'tsconfig.json'),
		cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
		tsconfigOverride: {
			compilerOptions: {
				target: isServerRenderer || isNodeBuild ? 'es2019' : 'es2015',
				sourceMap: output.sourcemap,
				declaration: shouldEmitDeclarations,
				declarationMap: shouldEmitDeclarations
			},
			// 排除 test 目录
			exclude: ['**/__tests__']
		}
	})
	//
	hasTSChecked = true
	// 入口文件 如果是 runtime 结尾，入口文件为 runtime.ts
	let entryFile = /runtime$/.test(format) ? 'src/runtime.ts' : 'src/index.ts'
	if (isCompatPackage && (isBrowserESMBuild || isCompatBuild)) {
		entryFile = /runtime$/.test(format) ? 'src/esm-runtime.ts' : 'src/esm-index.ts'
	}

	let external = []
	const treeShakenDeps = ['source-map', '@babel/parser', 'estree-walker']

	if (isGlobalBuild || isBrowserESMBuild || isCompatBuild) {
		if (!packageOptions.enableNonBrowserBranches) {
			external = treeShakenDeps
		}
	} else {
		external = [
			...Object.keys(pkg.dependencies || {}),
			...Object.keys(pkg.peerDependencies || {}),
			// for @vue/compiler-sfc / server-renderer
			...['path', 'url', 'stream'],
			...treeShakenDeps
		]
	}

	let cjsIgnores = []
	// 抄 vue 的配置，不知道为什么要加这行
	// if (pkg.name === '@vue/compiler-sfc') {
	// 	cjsIgnores = [
	// 	]
	// }

	const nodePlugins = (format === 'cjs' && Object.keys(pkg.devDependencies || {}).length) || packageOptions.enableNonBrowserBranches
		? [
			commonjs({
				sourceMap: false,
				ignore: cjsIgnores
			}),
			...(format === 'cjs' ? [] : [polyfillNode()]),
			nodeResolve()
		]
		: []

	return {
		input: resolve(entryFile),
		external,
		plugins: [
			json({namedExports: false}),
			tsPlugin,
			createReplacePlugin(
				isProductionBuild,
				isBundlerESMBuild,
				isBrowserESMBuild,
				(isGlobalBuild || isBrowserESMBuild || isBundlerESMBuild) && !packageOptions.enableNonBrowserBranches,
				isGlobalBuild,
				isNodeBuild,
				isCompatBuild,
				isServerRenderer
			),
			...nodePlugins,
			...plugins
		],
		output,
		onwarn: (msg, warn) => {
			if (!/Circular/.test(msg)) {
				warn(msg)
			}
		},
		treeshake: {
			moduleSideEffects: false
		}
	}
}
/**
 * 生成对应格式的生产用配置
 * @param {string} format 打包格式
 */
function createProductionConfig(format) {
	return createConfig(format, {
		file: resolve(`dist/${name}.${format}.js`),
		format: outputConfigs[format].format
	})
}
/**
 * 生成对应格式的压缩配置
 * @param {string} format 打包格式
 */
function createMinifiedConfig(format) {
	return createConfig(
		format,
		{
			file: outputConfigs[format].file,
			format: outputConfigs[format].format
		},
		[
			terser({
				module: /^esm/.test(format),
				compress: {
					esma: 2015,
					pure_getters: true
				},
				safari10: true
			})
		]
	)
}

// 生产环境打包配置
// 如果 package.json 中的打包配置明确指出是非生产用，则跳出
if (process.env.NODE_ENV === 'production' && packageOptions.prod !== false) {
	packageFormats.forEach(format => {
		if (format === 'cjs') {
			packageConfigs.push(createProductionConfig(format))
		}
		if (/^(global|esm-browser)(-bundler)$/.test(format)) {
			packageConfigs.push(createMinifiedConfig(format))
		}
	})
}

export default packageConfigs