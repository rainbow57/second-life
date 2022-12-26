import { formatDateTime, getDateRange } from '../src/time'

describe('传入无效日期 -> formatDateTime', () => {
    it('传入空字符串 -> formatDateTime("")', () => {
        expect(formatDateTime('')).toEqual('')
    })
    it('传入0 -> formatDateTime(0)', () => {
        expect(formatDateTime(0)).toEqual('')
    })
    it('传入无效字符串日期 -> formatDateTime("a112")', () => {
        expect(formatDateTime('a112')).toEqual('')
    })
    it('传入无效字符串日期 -> formatDateTime("2022-02-31")', () => {
        expect(formatDateTime('2022-02-31')).toEqual('2022-03-03 08:00:00')
    })
    it('传入无效日期型日期 -> formatDateTime(new Date("Invalid Date"))', () => {
        expect(formatDateTime(new Date('Invalid Date'))).toEqual('')
    })
})

describe('传入字符型日期参数 -> formatDateTime', () => {
    it('传入数字字符串 -> formatDateTime("2022")', () => {
        expect(formatDateTime('2022')).toEqual('2022-01-01 08:00:00')
    })
    it('传入数字字符串 -> formatDateTime("2022-12-10")', () => {
        expect(formatDateTime('2022-12-10')).toEqual('2022-12-10 08:00:00')
    })
    it('传入数字字符串 -> formatDateTime("2022-12-10 20:19")', () => {
        expect(formatDateTime('2022-12-10 20:19')).toEqual('2022-12-10 20:19:00')
    })
    it('传入数字字符串 -> formatDateTime("2022-12-10 20:19:20")', () => {
        expect(formatDateTime('2022-12-10 20:19:20')).toEqual('2022-12-10 20:19:20')
    })
})

describe('传入数字型日期参数 -> formatDateTime', () => {
    it('传入数字字符串 -> formatDateTime(1672038573710)', () => {
        expect(formatDateTime(1672038573710)).toEqual('2022-12-26 15:09:33')
    })
    it('传入数字字符串 -> formatDateTime(1672038573710, "YYYY-MM-DD")', () => {
        expect(formatDateTime(1672038573710, 'YYYY-MM-DD')).toEqual('2022-12-26')
    })
})

describe('传入日期型日期参数 -> formatDateTime', () => {
    it('传入日期型 -> formatDateTime(new Date())', () => {
        const now = new Date(2022, 11, 26, 9, 1, 10, 20)
        expect(formatDateTime(now)).toEqual('2022-12-26 09:01:10')
    })
    it('传入日期型 -> formatDateTime(new Date(), "YYYY-MM-DD")', () => {
        const now = new Date(2022, 11, 26, 9, 1, 10, 20)
        expect(formatDateTime(now, 'YYYY-MM-DD')).toEqual('2022-12-26')
    })
})

describe('获取一个时间范围 -> getDateRange', () => {
    // ==== NaN ====
    it('getDateRange(NaN) -> should return null', () => {
        expect(getDateRange(NaN)).toEqual(null)
    })
    it('getDateRange(NaN, "YYYY-MM-DD") -> should return null', () => {
        expect(getDateRange(NaN, 'YYYY-MM-DD')).toEqual(null)
    })
    // ==== 大于等于 0 的整数 ====
    it('getDateRange(0)', () => {
        const now = new Date()
        const start = formatDateTime(now, 'YYYY-MM-DD 00:00:00')
        const end = formatDateTime(now, 'YYYY-MM-DD 23:59:59')
        expect(getDateRange(0)).toEqual([start, end])
    })
    it('getDateRange(0, "YYYY-MM-DD")', () => {
        const now = new Date()
        const start = formatDateTime(now, 'YYYY-MM-DD')
        const end = formatDateTime(now, 'YYYY-MM-DD')
        expect(getDateRange(0, 'YYYY-MM-DD')).toEqual([start, end])
    })
    it('getDateRange(1)', () => {
        const now = new Date()
        const end = formatDateTime(now, 'YYYY-MM-DD 23:59:59')
        const start = formatDateTime(now.setDate(now.getDate() - 1), 'YYYY-MM-DD 00:00:00')
        expect(getDateRange(1)).toEqual([start, end])
    })
    it('getDateRange(1, "YYYY-MM-DD")', () => {
        const now = new Date()
        const end = formatDateTime(now, 'YYYY-MM-DD')
        const start = formatDateTime(now.setDate(now.getDate() - 1), 'YYYY-MM-DD')
        expect(getDateRange(1, 'YYYY-MM-DD')).toEqual([start, end])
    })
    // ==== 小于 0 的整数 ====
    it('getDateRange(-1)', () => {
        const now = new Date()
        const start = formatDateTime(now, 'YYYY-MM-DD 00:00:00')
        const end = formatDateTime(now.setDate(now.getDate() + 1), 'YYYY-MM-DD 23:59:59')
        expect(getDateRange(-1)).toEqual([start, end])
    })
    it('getDateRange(-1, "YYYY-MM-DD")', () => {
        const now = new Date()
        const start = formatDateTime(now, 'YYYY-MM-DD')
        const end = formatDateTime(now.setDate(now.getDate() + 1), 'YYYY-MM-DD')
        expect(getDateRange(-1, 'YYYY-MM-DD')).toEqual([start, end])
    })
    // ==== 大于 0 的浮点数 ====
    it('getDateRange(1.902)', () => {
        const now = new Date()
        const end = formatDateTime(now, 'YYYY-MM-DD 23:59:59')
        const start = formatDateTime(now.setDate(now.getDate() - 1), 'YYYY-MM-DD 00:00:00')
        expect(getDateRange(1.902)).toEqual([start, end])
    })
    it('getDateRange(1.902, "YYYY-MM-DD")', () => {
        const now = new Date()
        const end = formatDateTime(now, 'YYYY-MM-DD')
        const start = formatDateTime(now.setDate(now.getDate() - 1), 'YYYY-MM-DD')
        expect(getDateRange(1.902, 'YYYY-MM-DD')).toEqual([start, end])
    })
    // ==== 小于 0 的浮点数 ====
    it('getDateRange(-1.902)', () => {
        const now = new Date()
        const start = formatDateTime(now, 'YYYY-MM-DD 00:00:00')
        const end = formatDateTime(now.setDate(now.getDate() + 1), 'YYYY-MM-DD 23:59:59')
        expect(getDateRange(-1.902)).toEqual([start, end])
    })
    it('getDateRange(-1.902, "YYYY-MM-DD")', () => {
        const now = new Date()
        const start = formatDateTime(now, 'YYYY-MM-DD')
        const end = formatDateTime(now.setDate(now.getDate() + 1), 'YYYY-MM-DD')
        expect(getDateRange(-1.902, 'YYYY-MM-DD')).toEqual([start, end])
    })
})
