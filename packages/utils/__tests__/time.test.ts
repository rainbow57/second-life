import { formatDateTime, getDateInterval, getDateRange } from '../src/time'

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

describe('获取两个时间的间隔 -> getDateInterval', () => {
    it('传入空值 -> should return 0', () => {
        expect(getDateInterval(undefined, undefined)).toEqual(0)
        expect(getDateInterval(0, 0)).toEqual(0)
        expect(getDateInterval('', undefined)).toEqual(0)
        expect(getDateInterval('', '')).toEqual(0)
    })
    it('传入无效时间 -> should return 0', () => {
        expect(getDateInterval(NaN, 0)).toEqual(0)
        expect(getDateInterval(true, false, 'day')).toEqual(0)
        expect(getDateInterval('2022-12-27 10:50:00', () => {}, 'day')).toEqual(0)
    })
    it('返回毫秒数', () => {
        expect(getDateInterval('2022-12-27 10:50:00', '2022-12-27 10:50:01')).toEqual(1000)
        expect(getDateInterval('2022-12-27 10:50:01', '2022-12-27 10:50:00')).toEqual(1000)
        expect(getDateInterval('2022-12-27 10:51:10', '2022-12-27 10:50:01')).toEqual(69000)
        expect(getDateInterval('2022-12-27 10:50:01', '2022-12-27 10:51:10')).toEqual(69000)
        expect(
            getDateInterval(new Date('2022-12-27 10:51:10'), new Date('2022-12-27 10:50:01'))
        ).toEqual(69000)
        expect(
            getDateInterval(new Date('2022-12-27 10:50:01'), new Date('2022-12-27 10:51:10'))
        ).toEqual(69000)
    })
    it('返回秒数', () => {
        expect(getDateInterval('2022-12-27 10:50:00', '2022-12-27 10:50:01', 'second')).toEqual(1)
        expect(getDateInterval('2022-12-27 10:50:01', '2022-12-27 10:50:00', 'seconds')).toEqual(1)
        expect(getDateInterval('2022-12-27 10:51:10', '2022-12-27 10:50:01', 'seconds')).toEqual(69)
        expect(getDateInterval('2022-12-27 10:50:01', '2022-12-27 10:51:10', 'seconds')).toEqual(69)
        expect(getDateInterval('2022-12-27 10:51:10', '2022-12-27 10:50:01', 'seconds')).toEqual(69)
        expect(getDateInterval('2022-12-27 10:50:01', '2022-12-27 10:51:10', 'seconds')).toEqual(69)
    })
    it('返回分钟数', () => {
        expect(getDateInterval('2022-12-27 10:50:00', '2022-12-27 10:50:01', 'minute')).toEqual(0)
        expect(getDateInterval('2022-12-27 10:50:01', '2022-12-27 10:50:00', 'minutes')).toEqual(0)
        expect(
            getDateInterval(
                new Date('2022-12-27 10:51:10'),
                new Date('2022-12-27 10:50:01'),
                'minute'
            )
        ).toEqual(1)
        expect(
            getDateInterval(
                new Date('2022-12-27 10:50:01'),
                new Date('2022-12-27 10:51:10'),
                'minutes'
            )
        ).toEqual(1)
    })
    it('返回小时数', () => {
        expect(getDateInterval('2022-12-27 10:50:00', '2022-12-27 10:50:01', 'hour')).toEqual(0)
        expect(getDateInterval('2022-12-27 10:50:01', '2022-12-27 10:50:00', 'hours')).toEqual(0)
        expect(getDateInterval('2022-12-27 11:51:10', '2022-12-27 10:50:01', 'hour')).toEqual(1)
        expect(getDateInterval('2022-12-27 10:50:01', '2022-12-27 11:51:10', 'hours')).toEqual(1)
        expect(
            getDateInterval(
                new Date('2022-12-27 11:51:10'),
                new Date('2022-12-27 10:50:01'),
                'hour'
            )
        ).toEqual(1)
        expect(
            getDateInterval(
                new Date('2022-12-27 10:50:01'),
                new Date('2022-12-27 11:51:10'),
                'hours'
            )
        ).toEqual(1)
    })
    it('返回天数', () => {
        expect(getDateInterval('2022-12-27 10:50:00', '2022-12-27 10:50:01', 'day')).toEqual(0)
        expect(getDateInterval('2022-12-27 10:50:01', '2022-12-27 10:50:00', 'days')).toEqual(0)
        expect(getDateInterval('2022-12-28 11:51:10', '2022-12-27 10:50:01', 'day')).toEqual(1)
        expect(getDateInterval('2022-12-27 10:50:01', '2022-12-28 11:51:10', 'days')).toEqual(1)
        expect(
            getDateInterval(new Date('2022-12-28 11:51:10'), new Date('2022-12-27 10:50:01'), 'day')
        ).toEqual(1)
        expect(
            getDateInterval(
                new Date('2022-12-27 10:50:01'),
                new Date('2022-12-28 11:51:10'),
                'days'
            )
        ).toEqual(1)
    })
    it('返回星期数', () => {
        expect(getDateInterval('2022-12-27 10:50:00', '2022-12-27 10:50:01', 'week')).toEqual(0)
        expect(getDateInterval('2022-12-27 10:50:01', '2022-12-27 10:50:00', 'weeks')).toEqual(0)
        expect(getDateInterval('2022-12-17 11:51:10', '2022-12-27 10:50:01', 'week')).toEqual(1)
        expect(getDateInterval('2022-12-27 10:50:01', '2022-12-17 11:51:10', 'weeks')).toEqual(1)
        expect(
            getDateInterval(
                new Date('2022-12-17 11:51:10'),
                new Date('2022-12-27 10:50:01'),
                'week'
            )
        ).toEqual(1)
        expect(
            getDateInterval(
                new Date('2022-12-27 10:50:01'),
                new Date('2022-12-17 11:51:10'),
                'weeks'
            )
        ).toEqual(1)
    })
})
