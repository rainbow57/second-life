export * from './time'
export * from './map'
export * from './tree'
export * from './validate/validate'

export function typeOf(value: any): string {
    let type = typeof value
    if (type === 'object') {
        if (value === null) return 'null'
        if (value instanceof Date) return 'date'
        if (value instanceof Array) return 'array'
    }
    return type
}

export function random(min: number, max: number): number {
    if (isNaN(min)) {
        min = 0
    }
    if (isNaN(max)) {
        max = Number.MAX_VALUE
    }
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function isEmpty(value: any, deep: boolean = false): boolean {
    if (typeOf(value) === 'number') return isNaN(value)
    if (typeOf(value) === 'boolean') return false
    if (!value) return true
    // 如果是数组，没有元素，则返回空
    if (typeOf(value) === 'array') {
        if (!value.length) return true
        // 不检查深层对象，并且数组长度不为 0，则返回 false
        if (!deep && value.length) return false
        const arr = deep ? deleteEmptyArray(value) : value
        if (!arr.length) return true
        return false
    } else if (typeOf(value) === 'object') {
        //  如果是对象
        const obj = deep ? deleteEmpty(value) : value
        // 是否没有键值对
        return deep ? JSON.stringify(obj) === '{}' : false
    }
    return false
}

export function formatNumber(
    value: number | string,
    percision: number = 2,
    seperator: string = ''
): string {
    isNaN(percision) ? (percision = 2) : (percision = Math.max(0, percision))
    if (!value)
        return percision === 0
            ? '0'
            : `0.${Math.pow(10, percision)
                  .toString()
                  .slice(0 - percision)}`
    const numStr =
        typeOf(value) === 'string' ? (value as string).replace(/,/g, '') : `${value || ''}`
    const arr = numStr.split('.')
    let strInt = arr[0]
    let strFraction = arr[1] || ''
    // 要求的小数位数与实际小数位数之差
    const patchPercision = percision - strFraction.length
    // 添加千位分隔符
    if (seperator) {
        strInt = strInt.replace(/\d{1,3}(?=(\d{3})+$)/g, `$&${seperator}`)
    }
    // 实际的小数位数比要求的小数位数大
    if (patchPercision < 0) {
        strFraction = strFraction.substring(0, percision)
    } else if (patchPercision > 0) {
        // 实际的小数位数比要求的小数位数小，需要补零
        strFraction += Math.pow(10, patchPercision)
            .toString()
            .slice(0 - patchPercision)
    }
    if (strFraction.length > 0) {
        return `${strInt}.${strFraction}`
    }
    return strInt
}

export function deleteEmptyArray(obj: any[], empties: any[] = ['', undefined, null]): any[] {
    if (!obj || !obj.length) return []
    return obj
        .filter((item: any) => !empties.includes(item))
        .map((item: any) =>
            typeOf(item) === 'object' ? deleteEmpty(item as object, empties) : item
        )
}

export function deleteEmpty(
    obj: object | null,
    empties: any[] = ['', undefined, null]
): object | null {
    if (!obj) return obj
    // 处理数组
    if (typeOf(obj) === 'array') {
        return deleteEmptyArray(obj as any[], empties)
    }
    const result: any = {}
    // 处理对象
    for (const key in obj) {
        const value: any = (obj as any)[key]
        const valueType = typeOf(value)

        if (empties.includes(value)) continue

        if (valueType === 'array') {
            if (value.length) {
                result[key] = deleteEmptyArray(value, empties)
            }
        } else if (valueType === 'object') {
            result[key] = deleteEmpty(value, empties)
        } else {
            result[key] = value
        }
    }
    return result
}

// http
export function parseQuery(url: string, types: fieldType[] = []): objectType {
    if (!url) return {}
    const search = url.split('?')[1]
    if (!search) return {}
    const query: objectType = JSON.parse(
        `{"${decodeURIComponent(search)
            .replace(/"/g, '"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"')
            .replace(/\+/g, ' ')}"}`
    )
    if (types && types.length) {
        types.forEach(item => {
            const { prop = '', type = '' } = item
            if (!prop || !type) return
            if (query[prop]) {
                // 按规定的格式调整数据类型
                if (type === 'number') {
                    query[prop] = parseFloat(query[prop])
                } else if (type === 'string') {
                    query[prop] = query[prop] ? query[prop] + '' : ''
                } else if (type === 'boolean') {
                    query[prop] = query[prop] === 'true' || query[prop] === true
                }
            }
        })
    }
    const keys = Object.keys(query)
    const result: objectType = {}
    // 过滤掉键为空的对
    keys.filter(key => !!key).forEach(cur => (result[cur] = query[cur]))
    return result
}

export function stringifyQuery(query: objectType = {}): string {
    if (!query) return ''
    if (typeOf(query) !== 'object') return ''
    return Object.keys(query)
        .filter(
            key =>
                !decodeURIComponent(key).includes('&') &&
                !decodeURIComponent(key).includes('=') &&
                !decodeURIComponent(query[key]).includes('&') &&
                !decodeURIComponent(query[key]).includes('=')
        )
        .map(
            key =>
                `${encodeURIComponent(decodeURIComponent(key))}=${
                    !query[key] ? '' : encodeURIComponent(decodeURIComponent(query[key]))
                }`
        )
        .join('&')
}

export function toCamelCase(str: string): string {
    return str.split('-').map((word, index) => {
        // 将第一个单词保持原样，将其他单词首字母大写
        return !index ? word : word.charAt(0).toUpperCase() + word.slice(1)
    }).join('')
}
