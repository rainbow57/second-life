// 校验相关函数

import { typeOf } from '..'

/**
 * 是否 URL
 * @param url URL
 * @returns 是/否
 */
export function isUrl(url: any): boolean {
    if (typeOf(url) !== 'string' || !url) return false
    const reg =
        /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return reg.test(url)
}
/**
 * 是否外部链接
 * @param url URL
 * @returns 是/否
 */
export function isExternal(url: any): boolean {
    if (typeOf(url) !== 'string' || !url) return false
    return /^(https?:|mailto:|tel:)/.test(url)
}
/**
 * 是否全部小写
 * @param value 字符串
 * @returns 是/否
 */
export function isLowerCase(value: any): boolean {
    if (typeOf(value) !== 'string' || !value) return false
    return /^[a-z]+$/.test(value)
}
/**
 * 是否全部大写
 * @param value 字符串
 * @returns 是/否
 */
export function isUpperCase(value: any): boolean {
    if (typeOf(value) !== 'string' || !value) return false
    return /^[A-Z]+$/.test(value)
}

export function isAlphabets(value: any): boolean {
    if (typeOf(value) !== 'string' || !value) return false
    return /^[A-Za-z]+$/.test(value)
}
/**
 * 是否电子邮箱
 * @param value
 * @returns
 */
export function isEmail(value: any): boolean {
    if (typeOf(value) !== 'string' || !value) return false
    const reg =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(value)
}

export function isString(value: any): boolean {
    if (typeof value === 'string' || value instanceof String) {
        return true
    }
    return false
}

export function isArray(value: any): boolean {
    if (typeof Array.isArray === 'undefined') {
        return Object.prototype.toString.call(value) === '[object Array]'
    }
    return Array.isArray(value)
}

export function isObject(value: any): boolean {
    return typeOf(value) === 'object'
}
/**
 * 是否手机号
 * @param phone
 * @returns
 */
export function isPhone(phone: string): boolean {
    const reg = /^[1][1-9][0-9]{9}$/
    if (!phone) return false
    return reg.test(phone)
}
