import {
    bd09ToGcj02,
    bd09ToWgs84,
    gcj02ToBd09,
    gcj02ToWgs84,
    wgs84ToBd09,
    wgs84ToGcj02
} from '../src/map'
const wgs84 = { latitude: 31.19585109778197, longitude: 121.31558777710563 }
const gcj02 = { latitude: 31.19388372384131, longitude: 121.3200999260954 }
const bd09 = { latitude: 31.20024611115898, longitude: 121.32650024749125 }

describe('百度坐标转国测局坐标->bd09ToGcj02', () => {
    it('传入空字符串', () => {
        const gps = bd09ToGcj02('', '') || { latitude: 0, longitude: 0 }
        const { latitude, longitude } = gps
        expect(longitude).toEqual(0)
        expect(latitude).toEqual(0)
    })
    it('传入 0', () => {
        const gps = bd09ToGcj02(0, 0) || { latitude: 0, longitude: 0 }
        const { latitude, longitude } = gps
        expect(longitude).toEqual(0)
        expect(latitude).toEqual(0)
    })
    it('传入字符串型经纬度', () => {
        const gps = bd09ToGcj02(bd09.longitude + '', bd09.latitude + '')
        const { latitude, longitude } = gps
        expect(longitude).toBeGreaterThan(121)
        expect(latitude).toBeGreaterThan(31)
    })
    it('传入数字型经纬度', () => {
        const gps = bd09ToGcj02(bd09.longitude, bd09.latitude)
        const { latitude, longitude } = gps
        expect(longitude).toBeGreaterThan(121)
        expect(latitude).toBeGreaterThan(31)
    })
})

describe('百度坐标转WGS84坐标->bd09ToWgs84', () => {
    it('传入空字符串', () => {
        const gps = bd09ToWgs84('', '') || { latitude: 0, longitude: 0 }
        const { latitude, longitude } = gps
        expect(longitude).toEqual(0)
        expect(latitude).toEqual(0)
    })
    it('传入 0', () => {
        const gps = bd09ToWgs84(0, 0) || { latitude: 0, longitude: 0 }
        const { latitude, longitude } = gps
        expect(longitude).toEqual(0)
        expect(latitude).toEqual(0)
    })
    it('传入字符串型经纬度', () => {
        const gps = bd09ToWgs84(bd09.longitude + '', bd09.latitude + '')
        const { latitude, longitude } = gps
        expect(longitude).toBeGreaterThan(121)
        expect(latitude).toBeGreaterThan(31)
    })
    it('传入数字型经纬度', () => {
        const gps = bd09ToWgs84(bd09.longitude, bd09.latitude)
        const { latitude, longitude } = gps
        expect(longitude).toBeGreaterThan(121)
        expect(latitude).toBeGreaterThan(31)
    })
})

describe('WGS84转百度坐标->wgs84ToBd09', () => {
    it('传入空字符串', () => {
        const gps = wgs84ToBd09('', '') || { latitude: 0, longitude: 0 }
        const { latitude, longitude } = gps
        expect(longitude).toEqual(0)
        expect(latitude).toEqual(0)
    })
    it('传入 0', () => {
        const gps = wgs84ToBd09(0, 0) || { latitude: 0, longitude: 0 }
        const { latitude, longitude } = gps
        expect(longitude).toEqual(0)
        expect(latitude).toEqual(0)
    })
    it('传入字符串型经纬度', () => {
        const gps = wgs84ToBd09(wgs84.longitude + '', wgs84.latitude + '')
        const { latitude, longitude } = gps
        expect(longitude).toBeGreaterThan(121)
        expect(latitude).toBeGreaterThan(31)
    })
    it('传入数字型经纬度', () => {
        const gps = wgs84ToBd09(wgs84.longitude, wgs84.latitude)
        const { latitude, longitude } = gps
        expect(longitude).toBeGreaterThan(121)
        expect(latitude).toBeGreaterThan(31)
    })
})

describe('WGS84转国测局坐标->wgs84ToGcj02', () => {
    it('传入空字符串', () => {
        const gps = wgs84ToGcj02('', '') || { latitude: 0, longitude: 0 }
        const { latitude, longitude } = gps
        expect(longitude).toEqual(0)
        expect(latitude).toEqual(0)
    })
    it('传入 0', () => {
        const gps = wgs84ToGcj02(0, 0) || { latitude: 0, longitude: 0 }
        const { latitude, longitude } = gps
        expect(longitude).toEqual(0)
        expect(latitude).toEqual(0)
    })
    it('传入字符串型经纬度', () => {
        const gps = wgs84ToGcj02(wgs84.longitude + '', wgs84.latitude + '')
        const { latitude, longitude } = gps
        expect(longitude).toBeGreaterThan(121)
        expect(latitude).toBeGreaterThan(31)
    })
    it('传入数字型经纬度', () => {
        const gps = wgs84ToGcj02(wgs84.longitude, wgs84.latitude)
        const { latitude, longitude } = gps
        expect(longitude).toBeGreaterThan(121)
        expect(latitude).toBeGreaterThan(31)
    })
})

describe('国测局转WGS84坐标->gcj02ToWgs84', () => {
    it('传入空字符串', () => {
        const gps = gcj02ToWgs84('', '') || { latitude: 0, longitude: 0 }
        const { latitude, longitude } = gps
        expect(longitude).toEqual(0)
        expect(latitude).toEqual(0)
    })
    it('传入 0', () => {
        const gps = gcj02ToWgs84(0, 0) || { latitude: 0, longitude: 0 }
        const { latitude, longitude } = gps
        expect(longitude).toEqual(0)
        expect(latitude).toEqual(0)
    })
    it('传入字符串型经纬度', () => {
        const gps = gcj02ToWgs84(gcj02.longitude + '', gcj02.latitude + '')
        const { latitude, longitude } = gps
        expect(longitude).toBeGreaterThan(121)
        expect(latitude).toBeGreaterThan(31)
    })
    it('传入数字型经纬度', () => {
        const gps = gcj02ToWgs84(gcj02.longitude, gcj02.latitude)
        const { latitude, longitude } = gps
        expect(longitude).toBeGreaterThan(121)
        expect(latitude).toBeGreaterThan(31)
    })
})

describe('国测局转百度坐标->gcj02ToWgs84', () => {
    it('传入空字符串', () => {
        const gps = gcj02ToBd09('', '') || { latitude: 0, longitude: 0 }
        const { latitude, longitude } = gps
        expect(longitude).toEqual(0)
        expect(latitude).toEqual(0)
    })
    it('传入 0', () => {
        const gps = gcj02ToBd09(0, 0) || { latitude: 0, longitude: 0 }
        const { latitude, longitude } = gps
        expect(longitude).toEqual(0)
        expect(latitude).toEqual(0)
    })
    it('传入字符串型经纬度', () => {
        const gps = gcj02ToBd09(gcj02.longitude + '', gcj02.latitude + '')
        const { latitude, longitude } = gps
        expect(longitude).toBeGreaterThan(121)
        expect(latitude).toBeGreaterThan(31)
    })
    it('传入数字型经纬度', () => {
        const gps = gcj02ToBd09(gcj02.longitude, gcj02.latitude)
        const { latitude, longitude } = gps
        expect(longitude).toBeGreaterThan(121)
        expect(latitude).toBeGreaterThan(31)
    })
})
