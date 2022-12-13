import gcoord from 'gcoord'

export const bd09ToGcj02 = (longitude: number, latitude: number): object => {
    const gps = gcoord.transform([longitude, latitude], gcoord.BD09, gcoord.GCJ02)
    return { longitude: gps[0], latitude: gps[1] }
}

export const gcj02ToBd09 = (longitude: number, latitude: number): object => {
    const gps = gcoord.transform([longitude, latitude], gcoord.GCJ02, gcoord.BD09)
    return { longitude: gps[0], latitude: gps[1] }
}

export const bd09ToWgs84 = (longitude: number, latitude: number): object => {
    const gps = gcoord.transform([longitude, latitude], gcoord.BD09, gcoord.WGS84)
    return { longitude: gps[0], latitude: gps[1] }
}

export const wgs84ToBd09 = (longitude: number, latitude: number): object => {
    const gps = gcoord.transform([longitude, latitude], gcoord.WGS84, gcoord.BD09)
    return { longitude: gps[0], latitude: gps[1] }
}

export const gcj02ToWgs84 = (longitude: number, latitude: number): object => {
    const gps = gcoord.transform([longitude, latitude], gcoord.GCJ02, gcoord.WGS84)
    return { longitude: gps[0], latitude: gps[1] }
}

export const wgs84ToGcj02 = (longitude: number, latitude: number): object => {
    const gps = gcoord.transform([longitude, latitude], gcoord.WGS84, gcoord.GCJ02)
    return { longitude: gps[0], latitude: gps[1] }
}
