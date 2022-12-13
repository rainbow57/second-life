export * from './time'
export * from './map'

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
    if (obj === null) return null
    if (!obj) return {}
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
            result[key] = deleteEmptyArray(value, empties)
        } else if (valueType === 'object') {
            result[key] = deleteEmpty(value, empties)
        } else {
            result[key] = value
        }
    }
    return result
}
