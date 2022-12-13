import { formatDateTime } from '../src/time'

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

describe('传入数字型日期参数 -> formatDateTime', () => {})

describe('传入日期型日期参数 -> formatDateTime', () => {})
