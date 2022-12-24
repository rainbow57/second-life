import {
    isUrl,
    isExternal,
    isLowerCase,
    isUpperCase,
    isAlphabets,
    isEmail,
    isString,
    isArray,
    isObject,
    isPhone
} from '../src'

describe('校验模块测试', () => {
    // ==== isUrl ====
    it('isUrl(undefined) -> false', () => {
        expect(isUrl(undefined)).toEqual(false)
    })
    it('isUrl(null) -> false', () => {
        expect(isUrl(null)).toEqual(false)
    })
    it('isUrl("") -> false', () => {
        expect(isUrl('')).toEqual(false)
    })
    it('isUrl({}) -> false', () => {
        expect(isUrl({})).toEqual(false)
    })
    it('isUrl(false) -> false', () => {
        expect(isUrl(false)).toEqual(false)
    })
    it('isUrl(true) -> false', () => {
        expect(isUrl(true)).toEqual(false)
    })
    it('isUrl(() => {}) -> false', () => {
        expect(isUrl(() => {})).toEqual(false)
    })
    it('isUrl("/web/login") -> false', () => {
        expect(isUrl('/web/login')).toEqual(false)
    })
    it('isUrl("http://www.baidu.com/web/login") -> true', () => {
        expect(isUrl('http://www.baidu.com/web/login')).toEqual(true)
    })
    it('isUrl("https://www.baidu.com/web/login") -> true', () => {
        expect(isUrl('https://www.baidu.com/web/login')).toEqual(true)
    })
    it('isUrl("ftp://www.baidu.com/web/login") -> true', () => {
        expect(isUrl('ftp://www.baidu.com/web/login')).toEqual(true)
    })
    // ==== isExternal ====
    it('isExternal(undefined) -> false', () => {
        expect(isExternal(undefined)).toEqual(false)
    })
    it('isExternal(null) -> false', () => {
        expect(isExternal(null)).toEqual(false)
    })
    it('isExternal("") -> false', () => {
        expect(isExternal('')).toEqual(false)
    })
    it('isExternal({}) -> false', () => {
        expect(isExternal({})).toEqual(false)
    })
    it('isExternal(false) -> false', () => {
        expect(isExternal(false)).toEqual(false)
    })
    it('isExternal(true) -> false', () => {
        expect(isExternal(true)).toEqual(false)
    })
    it('isExternal(() => {}) -> false', () => {
        expect(isExternal(() => {})).toEqual(false)
    })
    it('isExternal("/web/login") -> false', () => {
        expect(isExternal('/web/login')).toEqual(false)
    })
    it('isExternal("http://www.baidu.com/web/login") -> true', () => {
        expect(isExternal('http://www.baidu.com/web/login')).toEqual(true)
    })
    it('isExternal("https://www.baidu.com/web/login") -> true', () => {
        expect(isExternal('https://www.baidu.com/web/login')).toEqual(true)
    })
    it('isExternal("ftp://www.baidu.com/web/login") -> true', () => {
        expect(isExternal('ftp://www.baidu.com/web/login')).toEqual(true)
    })
    it('isExternal("mailto://8058883@163.com") -> true', () => {
        expect(isExternal('mailto://8058883@163.com')).toEqual(true)
    })
    it('isExternal("tel://13712345678") -> true', () => {
        expect(isExternal('tel://13712345678')).toEqual(true)
    })
    // ==== isLowerCase ====
    it('isLowerCase(undefined) -> false', () => {
        expect(isLowerCase(undefined)).toEqual(false)
    })
    it('isLowerCase(null) -> false', () => {
        expect(isLowerCase(null)).toEqual(false)
    })
    it('isLowerCase("") -> false', () => {
        expect(isLowerCase('')).toEqual(false)
    })
    it('isLowerCase(undefined) -> false', () => {
        expect(isLowerCase(undefined)).toEqual(false)
    })
    it('isLowerCase({}) -> false', () => {
        expect(isLowerCase({})).toEqual(false)
    })
    it('isLowerCase(false) -> false', () => {
        expect(isLowerCase(false)).toEqual(false)
    })
    it('isLowerCase(true) -> false', () => {
        expect(isLowerCase(true)).toEqual(false)
    })
    it('isLowerCase(() => {}) -> false', () => {
        expect(isLowerCase(() => {})).toEqual(false)
    })
    it('isLowerCase("AAA") -> false', () => {
        expect(isLowerCase('AAA')).toEqual(false)
    })
    it('isLowerCase("Aaa") -> false', () => {
        expect(isLowerCase('Aaa')).toEqual(false)
    })
    it('isLowerCase("aaa") -> true', () => {
        expect(isLowerCase('aaa')).toEqual(true)
    })
    // ==== isUpperCase ====
    it('isUpperCase(undefined) -> false', () => {
        expect(isUpperCase(undefined)).toEqual(false)
    })
    it('isUpperCase(null) -> false', () => {
        expect(isUpperCase(null)).toEqual(false)
    })
    it('isUpperCase("") -> false', () => {
        expect(isUpperCase('')).toEqual(false)
    })
    it('isUpperCase(undefined) -> false', () => {
        expect(isUpperCase(undefined)).toEqual(false)
    })
    it('isUpperCase({}) -> false', () => {
        expect(isUpperCase({})).toEqual(false)
    })
    it('isUpperCase(false) -> false', () => {
        expect(isUpperCase(false)).toEqual(false)
    })
    it('isUpperCase(true) -> false', () => {
        expect(isUpperCase(true)).toEqual(false)
    })
    it('isUpperCase(() => {}) -> false', () => {
        expect(isUpperCase(() => {})).toEqual(false)
    })
    it('isUpperCase("AAA") -> true', () => {
        expect(isUpperCase('AAA')).toEqual(true)
    })
    it('isUpperCase("Aaa") -> false', () => {
        expect(isUpperCase('Aaa')).toEqual(false)
    })
    it('isUpperCase("aaa") -> false', () => {
        expect(isUpperCase('aaa')).toEqual(false)
    })
    // ==== isAlphabets ====
    it('isAlphabets(undefined) -> false', () => {
        expect(isAlphabets(undefined)).toEqual(false)
    })
    it('isAlphabets(null) -> false', () => {
        expect(isAlphabets(null)).toEqual(false)
    })
    it('isAlphabets("") -> false', () => {
        expect(isAlphabets('')).toEqual(false)
    })
    it('isAlphabets(undefined) -> false', () => {
        expect(isAlphabets(undefined)).toEqual(false)
    })
    it('isAlphabets({}) -> false', () => {
        expect(isAlphabets({})).toEqual(false)
    })
    it('isAlphabets(false) -> false', () => {
        expect(isAlphabets(false)).toEqual(false)
    })
    it('isAlphabets(true) -> false', () => {
        expect(isAlphabets(true)).toEqual(false)
    })
    it('isAlphabets(() => {}) -> false', () => {
        expect(isAlphabets(() => {})).toEqual(false)
    })
    it('isAlphabets("AAA,") -> false', () => {
        expect(isAlphabets('AAA,')).toEqual(false)
    })
    it('isAlphabets("AAA.") -> false', () => {
        expect(isAlphabets('AAA.')).toEqual(false)
    })
    it('isAlphabets("A。A.") -> false', () => {
        expect(isAlphabets('A。A.')).toEqual(false)
    })
    it('isAlphabets("A，A.") -> false', () => {
        expect(isAlphabets('A，A.')).toEqual(false)
    })
    it('isAlphabets("AAA") -> true', () => {
        expect(isAlphabets('AAA')).toEqual(true)
    })
    it('isAlphabets("Aaa") -> true', () => {
        expect(isAlphabets('Aaa')).toEqual(true)
    })
    it('isAlphabets("aaa") -> true', () => {
        expect(isAlphabets('aaa')).toEqual(true)
    })
    // ==== isEmail ====
    it('isEmail(undefined) -> false', () => {
        expect(isEmail(undefined)).toEqual(false)
    })
    it('isEmail(null) -> false', () => {
        expect(isEmail(null)).toEqual(false)
    })
    it('isEmail("") -> false', () => {
        expect(isEmail('')).toEqual(false)
    })
    it('isEmail(undefined) -> false', () => {
        expect(isEmail(undefined)).toEqual(false)
    })
    it('isEmail({}) -> false', () => {
        expect(isEmail({})).toEqual(false)
    })
    it('isEmail(false) -> false', () => {
        expect(isEmail(false)).toEqual(false)
    })
    it('isEmail(true) -> false', () => {
        expect(isEmail(true)).toEqual(false)
    })
    it('isEmail(() => {}) -> false', () => {
        expect(isEmail(() => {})).toEqual(false)
    })
    it('isEmail("mailto://8058883@163.com") -> false', () => {
        expect(isEmail('mailto://8058883@163.com')).toEqual(false)
    })
    it('isEmail("8058883@163.com") -> true', () => {
        expect(isEmail('8058883@163.com')).toEqual(true)
    })
    it('isEmail("yejin_@qq.com") -> true', () => {
        expect(isEmail('yejin_@qq.com')).toEqual(true)
    })
    // ==== isString ====
    it('isString(undefined) -> false', () => {
        expect(isString(undefined)).toEqual(false)
    })
    it('isString(null) -> false', () => {
        expect(isString(null)).toEqual(false)
    })
    it('isString("") -> true', () => {
        expect(isString('')).toEqual(true)
    })
    it('isString(undefined) -> false', () => {
        expect(isString(undefined)).toEqual(false)
    })
    it('isString({}) -> false', () => {
        expect(isString({})).toEqual(false)
    })
    it('isString(false) -> false', () => {
        expect(isString(false)).toEqual(false)
    })
    it('isString(true) -> false', () => {
        expect(isString(true)).toEqual(false)
    })
    it('isString(() => {}) -> false', () => {
        expect(isString(() => {})).toEqual(false)
    })
    it('isString("aa") -> true', () => {
        expect(isString('aa')).toEqual(true)
    })
    // ==== isArray ====
    it('isArray(undefined) -> false', () => {
        expect(isArray(undefined)).toEqual(false)
    })
    it('isArray(null) -> false', () => {
        expect(isArray(null)).toEqual(false)
    })
    it('isArray("") -> false', () => {
        expect(isArray('')).toEqual(false)
    })
    it('isArray(undefined) -> false', () => {
        expect(isArray(undefined)).toEqual(false)
    })
    it('isArray({}) -> false', () => {
        expect(isArray({})).toEqual(false)
    })
    it('isArray(false) -> false', () => {
        expect(isArray(false)).toEqual(false)
    })
    it('isArray(true) -> false', () => {
        expect(isArray(true)).toEqual(false)
    })
    it('isArray(() => {}) -> false', () => {
        expect(isArray(() => {})).toEqual(false)
    })
    it('isArray("aa") -> false', () => {
        expect(isArray('aa')).toEqual(false)
    })
    it('isArray([]) -> true', () => {
        expect(isArray([])).toEqual(true)
    })
    it('isArray([undefined]) -> true', () => {
        expect(isArray([undefined])).toEqual(true)
    })
    // ==== isObject ====
    it('isObject(undefined) -> false', () => {
        expect(isObject(undefined)).toEqual(false)
    })
    it('isObject(null) -> false', () => {
        expect(isObject(null)).toEqual(false)
    })
    it('isObject("") -> false', () => {
        expect(isObject('')).toEqual(false)
    })
    it('isObject(undefined) -> false', () => {
        expect(isObject(undefined)).toEqual(false)
    })
    it('isObject({}) -> true', () => {
        expect(isObject({})).toEqual(true)
    })
    it('isObject({a: 1}) -> true', () => {
        expect(isObject({ a: 1 })).toEqual(true)
    })
    it('isObject(false) -> false', () => {
        expect(isObject(false)).toEqual(false)
    })
    it('isObject(true) -> false', () => {
        expect(isObject(true)).toEqual(false)
    })
    it('isObject(() => {}) -> false', () => {
        expect(isObject(() => {})).toEqual(false)
    })
    it('isObject("aa") -> false', () => {
        expect(isObject('aa')).toEqual(false)
    })
    it('isObject([]) -> false', () => {
        expect(isObject([])).toEqual(false)
    })
    it('isObject([undefined]) -> false', () => {
        expect(isObject([undefined])).toEqual(false)
    })
    // ==== isPhone ====
    it('isPhone(undefined) -> false', () => {
        expect(isPhone(undefined)).toEqual(false)
    })
    it('isPhone(null) -> false', () => {
        expect(isPhone(null)).toEqual(false)
    })
    it('isPhone("") -> false', () => {
        expect(isPhone('')).toEqual(false)
    })
    it('isPhone(undefined) -> false', () => {
        expect(isPhone(undefined)).toEqual(false)
    })
    it('isPhone({}) -> false', () => {
        expect(isPhone({})).toEqual(false)
    })
    it('isPhone({a: 1}) -> false', () => {
        expect(isPhone({ a: 1 })).toEqual(false)
    })
    it('isPhone(false) -> false', () => {
        expect(isPhone(false)).toEqual(false)
    })
    it('isPhone(true) -> false', () => {
        expect(isPhone(true)).toEqual(false)
    })
    it('isPhone(() => {}) -> false', () => {
        expect(isPhone(() => {})).toEqual(false)
    })
    it('isPhone("aa") -> false', () => {
        expect(isPhone('aa')).toEqual(false)
    })
    it('isPhone([]) -> false', () => {
        expect(isPhone([])).toEqual(false)
    })
    it('isPhone([undefined]) -> false', () => {
        expect(isPhone([undefined])).toEqual(false)
    })
    it('isPhone("21757156880") -> false', () => {
        expect(isPhone('21757156880')).toEqual(false)
    })
    it('isPhone("13757156880") -> true', () => {
        expect(isPhone('13757156880')).toEqual(true)
    })
    it('isPhone("137571568801") -> false', () => {
        expect(isPhone('137571568801')).toEqual(false)
    })
})
