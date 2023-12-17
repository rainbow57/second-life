import {
    random,
    formatNumber,
    typeOf,
    deleteEmpty,
    deleteEmptyArray,
    isEmpty,
    parseQuery,
    stringifyQuery,
    toCamelCase
} from '../src/index'

describe('生成大于等于 min，小于等于 max 的随机整数 -> random', () => {
    it('random(1, 1) -> should return 1', () => {
        expect(random(1, 1)).toBe(1)
    })
    it('random(NaN, 1) -> should return 0 <= number <= 1', () => {
        expect(random(NaN, 1)).toBeGreaterThanOrEqual(0)
        expect(random(NaN, 1)).toBeLessThanOrEqual(1)
    })
    it('random(1, NaN) -> should return number >= 1', () => {
        expect(random(1, NaN)).toBeGreaterThanOrEqual(1)
    })
    it('random(1, 10) -> should return 1 <= number <= 10', () => {
        expect(random(1, 10)).toBeGreaterThanOrEqual(1)
        expect(random(1, 10)).toBeLessThanOrEqual(10)
    })
    it('random(10, 1) -> should return 1 <= number <= 10', () => {
        const num = random(1, 10)
        expect(num).toBeGreaterThanOrEqual(1)
        expect(num).toBeLessThanOrEqual(10)
    })
})

describe('是否为空，数字类型 -> isEmpty', () => {
    it('isEmpty(NaN) -> true', () => {
        expect(isEmpty(NaN)).toEqual(true)
    })
    it('isEmpty(-1) -> false', () => {
        expect(isEmpty(-1)).toEqual(false)
    })
    it('isEmpty(0) -> false', () => {
        expect(isEmpty(0)).toEqual(false)
    })
    it('isEmpty(1) -> false', () => {
        expect(isEmpty(1)).toEqual(false)
    })
})

describe('是否为空，字符串 -> isEmpty', () => {
    it('isEmpty("") -> true', () => {
        expect(isEmpty('')).toEqual(true)
    })
    it('isEmpty("-1") -> false', () => {
        expect(isEmpty('-1')).toEqual(false)
    })
    it('isEmpty("0") -> false', () => {
        expect(isEmpty('0')).toEqual(false)
    })
})

describe('是否为空，布尔类型 -> isEmpty', () => {
    it('isEmpty(true) -> false', () => {
        expect(isEmpty(true)).toEqual(false)
    })
    it('isEmpty(false) -> false', () => {
        expect(isEmpty(false)).toEqual(false)
    })
})

describe('是否为空，函数类型 -> isEmpty', () => {
    it('isEmpty(() => {}) -> false', () => {
        expect(isEmpty(() => {})).toEqual(false)
    })
})

describe('是否为空，对象类型 -> isEmpty', () => {
    it('isEmpty(undefined) -> true', () => {
        expect(isEmpty(undefined)).toEqual(true)
    })
    it('isEmpty(null) -> true', () => {
        expect(isEmpty(null)).toEqual(true)
    })
    it('isEmpty(null, true) -> true', () => {
        expect(isEmpty(null, true)).toEqual(true)
    })
    it('isEmpty({}) -> false', () => {
        expect(isEmpty({})).toEqual(false)
    })
    it('isEmpty({}, true) -> true', () => {
        expect(isEmpty({}, true)).toEqual(true)
    })
})

describe('是否为空，数组类型 -> isEmpty', () => {
    it('isEmpty([]) -> true', () => {
        expect(isEmpty([])).toEqual(true)
    })
    it('isEmpty([undefined]) -> false', () => {
        expect(isEmpty([undefined])).toEqual(false)
    })
    it('isEmpty([null]) -> false', () => {
        expect(isEmpty([null])).toEqual(false)
    })
    it('isEmpty([null], true) -> true', () => {
        expect(isEmpty([null], true)).toEqual(true)
    })
    it('isEmpty([1]) -> false', () => {
        expect(isEmpty([1])).toEqual(false)
    })
    it('isEmpty([{a: 1}]) -> false', () => {
        expect(isEmpty([{ a: 1 }])).toEqual(false)
    })
    it('isEmpty([{a: 1}], true) -> false', () => {
        expect(isEmpty([{ a: 1 }], true)).toEqual(false)
    })
})

describe('格式化空字符串型数字->formatNumber', () => {
    // 空字符串
    it('formatNumber("", 0) -> should return "0"', () => {
        expect(formatNumber('', 0)).toEqual('0')
    })
    it('formatNumber("") -> should return "0.00"', () => {
        expect(formatNumber('')).toEqual('0.00')
    })
    it('formatNumber("", 3, ",") -> should return "0.000"', () => {
        expect(formatNumber('', 3, ',')).toEqual('0.000')
    })
})

describe('格式化数字字符串型数字->formatNumber', () => {
    // 数字字符串
    it('formatNumber("33.56", ) -> should return "33"', () => {
        expect(formatNumber('33.56', 0)).toEqual('33')
    })
    it('formatNumber("33.56", 2) -> should return "33.56"', () => {
        expect(formatNumber('33.56', 2)).toEqual('33.56')
    })
    it('formatNumber("33.5689", 3) -> should return "33.568"', () => {
        expect(formatNumber('33.5689', 3)).toEqual('33.568')
    })
    it('formatNumber("2345678.87654", 3, ",") -> should return "2,345,678.876"', () => {
        expect(formatNumber('2345678.87654', 3, ',')).toEqual('2,345,678.876')
    })
    it('formatNumber("2,34567,8.87654", 3, ",") -> should return "2,345,678.876"', () => {
        expect(formatNumber('2345678.87654', 3, ',')).toEqual('2,345,678.876')
    })
    // 非数字字符串
})
describe('格式化无小数位数字->formatNumber', () => {
    // 数字
    //  小数位=0
    it('formatNumber(1, 0) -> should return "1"', () => {
        expect(formatNumber(1, 0)).toEqual('1')
    })
    it('formatNumber(100, 0) -> should return "100"', () => {
        expect(formatNumber(100, 0)).toEqual('100')
    })
    it('formatNumber(10000, 0, ",") -> should return "10,000"', () => {
        expect(formatNumber(10000, 0, ',')).toEqual('10,000')
    })
})
describe('格式化数字->formatNumber', () => {
    // 小数位大于 0
    it('formatNumber(1) -> should return 1.00', () => {
        expect(formatNumber(1)).toEqual('1.00')
    })
    it('formatNumber(1000) -> should return 1000.00', () => {
        expect(formatNumber(1000)).toEqual('1000.00')
    })
    it('formatNumber(10000, NaN, ",") -> should return 10,000.00', () => {
        expect(formatNumber(10000, NaN, ',')).toEqual('10,000.00')
    })
    it('formatNumber(10000, 2, ",") -> should return 10,000.00', () => {
        expect(formatNumber(10000, 2, ',')).toEqual('10,000.00')
    })
    it('formatNumber(10000, 3, ",") -> should return 10,000.000', () => {
        expect(formatNumber(10000, 3, ',')).toEqual('10,000.000')
    })
    it('formatNumber(10000.12, 3, ",") -> should return 10,000.120', () => {
        expect(formatNumber(10000.12, 3, ',')).toEqual('10,000.120')
    })
    it('formatNumber(10000.12345, 3, ",") -> should return 10,000.123', () => {
        expect(formatNumber(10000.12345, 3, ',')).toEqual('10,000.123')
    })
    it('formatNumber(10000.12356, 3, ",") -> should return 10,000.123', () => {
        expect(formatNumber(10000.12356, 3, ',')).toEqual('10,000.123')
    })
    it('formatNumber(10000.1296) -> should return 10000.12', () => {
        expect(formatNumber(10000.1296)).toEqual('10000.12')
    })
})

describe('获取传入值的类型->typeOf', () => {
    it('typeOf(undefined) -> should return "undefined"', () => {
        expect(typeOf(undefined)).toEqual('undefined')
    })
    it('typeOf("") -> should return "string"', () => {
        expect(typeOf('')).toEqual('string')
    })
    it('typeOf(()=>{}) -> should return "function"', () => {
        expect(typeOf(() => {})).toEqual('function')
    })
    it('typeOf(1) -> should return "number"', () => {
        expect(typeOf(1)).toEqual('number')
    })
    it('typeOf(NaN) -> should return "number"', () => {
        expect(typeOf(NaN)).toEqual('number')
    })
    it('typeOf(true) -> should return "boolean"', () => {
        expect(typeOf(true)).toEqual('boolean')
    })
    it('typeOf("true") -> should return "string"', () => {
        expect(typeOf('true')).toEqual('string')
    })
    it('typeOf({}) -> should return "object"', () => {
        expect(typeOf({})).toEqual('object')
    })
    it('typeOf({}) -> should return "object"', () => {
        expect(typeOf({})).toEqual('object')
    })
    it('typeOf([]) -> should return "array"', () => {
        expect(typeOf([])).toEqual('array')
    })
    it('typeOf(new Date()) -> should return "date"', () => {
        expect(typeOf(new Date())).toEqual('date')
    })
    it('typeOf(null) -> should return "null"', () => {
        expect(typeOf(null)).toEqual('null')
    })
})

describe('删除数组中默认的空值->deleteEmptyArray', () => {
    // 空数组
    it('deleteEmpty([]) should return []', () => {
        const result = deleteEmptyArray([])
        expect(JSON.stringify(result)).toEqual('[]')
    })
    // 简单数组
    it('deleteEmpty([undefined]) should return []', () => {
        const result = deleteEmptyArray([undefined])
        expect(JSON.stringify(result)).toEqual('[]')
    })
    it('deleteEmpty([undefined, 1, null, ""]) should return [1]', () => {
        const result = deleteEmptyArray([undefined, 1, null, ''])
        expect(JSON.stringify(result)).toEqual('[1]')
    })
    it('deleteEmpty([undefined, "a", ""]) should return ["a"]', () => {
        const result = deleteEmptyArray([undefined, 'a', ''])
        expect(JSON.stringify(result)).toEqual('["a"]')
    })
    // 复杂数组
    it('deleteEmpty([undefined, {}, ""]) should return [{}]', () => {
        const result = deleteEmptyArray([undefined, {}, ''])
        expect(JSON.stringify(result)).toEqual('[{}]')
    })
    it('deleteEmpty([undefined, {a: 1}, "", {b: "a"}]) should return [{a: 1}, {b: "a"}]', () => {
        const result = deleteEmptyArray([undefined, { a: 1 }, '', { b: 'a' }])
        expect(result).toEqual([{ a: 1 }, { b: 'a' }])
    })
    it('deleteEmpty([undefined, {a: [null, {b: 1}, undefined, ""]}, ""]) should return [{a: [{b: 1}]}]', () => {
        const result = deleteEmptyArray([undefined, { a: [null, { b: 1 }, undefined, ''] }, ''])
        expect(result).toEqual([{ a: [{ b: 1 }] }])
    })
})

describe('删除数组中指定的空值 -> deleteEmptyArray', () => {
    // 简单数组
    it('deleteEmpty([undefined], [null, ""]) should return [undefined]', () => {
        const result = deleteEmptyArray([undefined], [undefined])
        expect(result).toEqual([undefined])
    })
    it('deleteEmpty([undefined, 1, null, ""], [""]) should return [undefined, 1, null]', () => {
        const result = deleteEmptyArray([undefined, 1, null, ''], [''])
        expect(result).toEqual([undefined, 1, null])
    })
    it('deleteEmpty([undefined, "a", ""], [""]) should return [undefined, "a"]', () => {
        const result = deleteEmptyArray([undefined, 'a', ''], [''])
        expect(result).toEqual([undefined, 'a'])
    })
    // 复杂数组
    it('deleteEmpty([undefined, {}, ""], [undefined]) should return [{}, ""]', () => {
        const result = deleteEmptyArray([undefined, {}, ''], [undefined])
        expect(result).toEqual([{}, ''])
    })
    it('deleteEmpty([undefined, {a: 1}, "", {b: "a"}], [undefined]) should return [{a: 1}, "", {b: "a"}]', () => {
        const result = deleteEmptyArray([undefined, { a: 1 }, '', { b: 'a' }], [undefined])
        expect(result).toEqual([{ a: 1 }, '', { b: 'a' }])
    })
    it('deleteEmpty([undefined, {a: [null, {b: 1}, undefined, ""]}, ""], [undefined]) should return [{a: [{b: 1}]}, ""]', () => {
        const result = deleteEmptyArray(
            [undefined, { a: [null, { b: 1 }, undefined, ''] }, ''],
            [undefined]
        )
        expect(result).toEqual([{ a: [null, { b: 1 }, ''] }, ''])
    })
})

describe('删除简单对象中默认的空值 -> deleteEmpty', () => {
    // null 对象
    it('deleteEmpty(null) should return null', () => {
        const result = deleteEmpty(null)
        expect(result).toEqual(null)
    })
    // 对象
    it('deleteEmpty({}) should return {}', () => {
        const result = deleteEmpty({})
        expect(result).toEqual({})
    })
})

describe('删除对象中嵌套对象中默认的空值 -> deleteEmpty', () => {
    // 对象嵌套对象
    it('deleteEmpty({a: {aa: "", ab: 1, ac: "ac", ad: undefined, ae: null}, b: undefined, c: null, d: {}})', () => {
        const result = deleteEmpty({
            a: { aa: '', ab: 1, ac: 'ac', ad: undefined, ae: null },
            b: undefined,
            c: null,
            d: {}
        })
        expect(result).toEqual({ a: { ab: 1, ac: 'ac' }, d: {} })
    })
})

describe('删除对象中嵌套数组中默认的空值 -> deleteEmpty', () => {
    // 对象嵌套数组
    it('deleteEmpty({a: {aa: "", ab: 1, ac: "ac", ad: undefined, ae: null}, b: undefined, c: null, d: ["", undefined, null, {da: 1, db: "db", dc: undefined, dd: "dd"}]})', () => {
        const result = deleteEmpty({
            a: { aa: '', ab: 1, ac: 'ac', ad: undefined, ae: null },
            b: undefined,
            c: null,
            d: ['', undefined, null, { da: 1, db: 'db', dc: undefined, dd: 'dd' }]
        })
        expect(result).toEqual({ a: { ab: 1, ac: 'ac' }, d: [{ da: 1, db: 'db', dd: 'dd' }] })
    })
})

describe('删除对象中默认的空值 -> deleteEmpty', () => {
    // 数组
    it('deleteEmpty([]) should return []', () => {
        const result = deleteEmpty([])
        expect(JSON.stringify(result)).toEqual('[]')
    })
    // 数组嵌套数组
    // 数组嵌套对象
})

describe('删除对象中指定的空值 -> deleteEmpty', () => {
    // 对象
    it('deleteEmpty({}) should return {}', () => {
        const result = deleteEmpty({})
        expect(JSON.stringify(result)).toEqual('{}')
    })
    // 数组
    it('deleteEmpty([]) should return []', () => {
        const result = deleteEmpty([])
        expect(JSON.stringify(result)).toEqual('[]')
    })
})

describe('====解析 url 中 的参数 -> parseQuery====', () => {
    it('空字符串传入 should return {}', () => {
        expect(parseQuery('')).toEqual({})
    })
    it('无参数 URL传入 should return {}', () => {
        expect(parseQuery('https://www.baidu.com')).toEqual({})
    })
    it('空键值对参数 URL传入 should return {baidu: "123"}', () => {
        expect(parseQuery('https://www.baidu.com?=123')).toEqual({})
    })
    it('简单参数 URL传入 should return {baidu: "123"}', () => {
        expect(parseQuery('https://www.baidu.com?baidu=123')).toEqual({ baidu: '123' })
    })
    it('简单参数 URL传入，带字段类型 should return {baidu: 123}', () => {
        expect(
            parseQuery('https://www.baidu.com?baidu=123', [{ prop: 'baidu', type: 'number' }])
        ).toEqual({ baidu: 123 })
    })
    it('简单参数 URL传入 should return {baidu: "123", google: "true"}', () => {
        expect(parseQuery('https://www.baidu.com?baidu=123&google=true')).toEqual({
            baidu: '123',
            google: 'true'
        })
    })
    it('简单参数 URL传入，带字段类型 should return {baidu: 123, google: true}', () => {
        const query = parseQuery('https://www.baidu.com?baidu=123&google=true', [
            { prop: 'baidu', type: 'number' },
            { prop: 'google', type: 'boolean' }
        ])
        expect(query).toEqual({ baidu: 123, google: true })
    })
    it('简单参数 URL传入，带字段类型 should return {baidu: 123, google: "true"}', () => {
        const query = parseQuery('https://www.baidu.com?baidu=123&google=true', [
            { prop: 'baidu', type: 'number' },
            { prop: 'google', type: 'string' }
        ])
        expect(query).toEqual({ baidu: 123, google: 'true' })
    })
    it('复杂参数 URL 传入 -> 返回 {}', () => {
        const query = parseQuery(
            'https://www.baidu.com?rsv_idx=1&wd=%E7%A7%91%E5%85%B4%E4%B8%89%E9%92%88%E9%98%B2%E6%84%9F%E6%9F%93%E7%8E%87%E4%BB%858%25%EF%BC%9F%E7%9C%9F%E7%9B%B8%E6%9D%A5%E4%BA%86&fenlei=256&ie=utf-8&rsv_pq=83e8425900018268&oq=javascript%20set%E5%AF%B9%E8%B1%A1&rsv_t=880dSHDqzYvVOj2Bx1AvNyt9xWsT%2BbrnCSKRXC%2B6vGXhOGOXhgxzAD%2FnXII&rqid=83e8425900018268&rsf=96d9f12d576211e0f28bf507c0bf9661_1_15_2&rsv_dl=0_right_fyb_pchot_20811&sa=0_right_fyb_pchot_20811&='
        )
        expect(query).toEqual({
            rsv_idx: '1',
            wd: '科兴三针防感染率仅8%？真相来了',
            fenlei: '256',
            ie: 'utf-8',
            rsv_pq: '83e8425900018268',
            oq: 'javascript set对象',
            rqid: '83e8425900018268',
            rsf: '96d9f12d576211e0f28bf507c0bf9661_1_15_2',
            rsv_t: '880dSHDqzYvVOj2Bx1AvNyt9xWsT brnCSKRXC 6vGXhOGOXhgxzAD/nXII',
            sa: '0_right_fyb_pchot_20811',
            rsv_dl: '0_right_fyb_pchot_20811'
        })
    })
})

describe('将对象类型解析成 URL 上的 query 键值对字符串 -> stringifyQuery', () => {
    it('stringifyQuery() -> should return ""', () => {
        expect(stringifyQuery(undefined)).toEqual('')
        expect(stringifyQuery(null)).toEqual('')
        expect(stringifyQuery(0)).toEqual('')
        expect(stringifyQuery(NaN)).toEqual('')
        expect(stringifyQuery('')).toEqual('')
        expect(stringifyQuery('aaa')).toEqual('')
        expect(stringifyQuery(2)).toEqual('')
        expect(stringifyQuery(true)).toEqual('')
        expect(stringifyQuery({})).toEqual('')
        expect(stringifyQuery(() => {})).toEqual('')
    })
    it('stringifyQuery({a: 1, b: 2}) -> should return "a=1&b=2"', () => {
        expect(stringifyQuery({ a: 1, b: 2 })).toEqual('a=1&b=2')
    })
    it('stringifyQuery({"a_b": 1, "b_c": 2}) -> should return "a_b=1&b_c=2"', () => {
        expect(stringifyQuery({ a_b: 1, b_c: 2 })).toEqual('a_b=1&b_c=2')
    })
    it('stringifyQuery({"a&b": 1, "b&c": 2}) -> should return ""', () => {
        expect(stringifyQuery({ 'a&b': 1, 'b&c': 2 })).toEqual('')
    })
    it('stringifyQuery({"a=b": 1, "b=c": 2}) -> should return ""', () => {
        expect(stringifyQuery({ 'a=b': 1, 'b=c': 2 })).toEqual('')
    })
    it('stringifyQuery({"a%26b": 1, "b%26c": 2}) -> should return ""', () => {
        expect(stringifyQuery({ 'a%26b': 1, 'b%26c': 2 })).toEqual('')
    })
    it('stringifyQuery({"a%3Db": 1, "b%3Dc": 2}) -> should return ""', () => {
        expect(stringifyQuery({ 'a%3Db': 1, 'b%3Dc': 2 })).toEqual('')
    })
})

// camelCaseConverter.ts
export function toCamelCase(str: string): string {
    return str.split('-').map((word, index) => {
        return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
    }).join('');
}

// camelCaseConverter.test.ts

describe('toCamelCase', () => {
    it('converts single-word string to the same string', () => {
        expect(toCamelCase('hello')).toBe('hello');
    });

    it('converts multi-word string to camelCase', () => {
        expect(toCamelCase('hello-world')).toBe('helloWorld');
        expect(toCamelCase('my-name-is-john')).toBe('myNameIsJohn');
    });

    it('handles empty strings', () => {
        expect(toCamelCase('')).toBe('');
    });

    it('handles strings with multiple consecutive hyphens', () => {
        expect(toCamelCase('my--name--is--john')).toBe('myNameIsJohn');
    });

    it('handles strings that start or end with a hyphen', () => {
        expect(toCamelCase('-hello-world')).toBe('HelloWorld');
        expect(toCamelCase('hello-world-')).toBe('helloWorld');
    });
});

