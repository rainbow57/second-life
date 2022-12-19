import gcoord from 'gcoord'

export const bd09ToGcj02 = (longitude: string | number, latitude: string | number): object => {
    longitude = Number(longitude)
    latitude = Number(latitude)
    if (isNaN(longitude) || isNaN(latitude) || !longitude || !latitude)
        return { longitude: 0, latitude: 0 }
    const gps = gcoord.transform([Number(longitude), Number(latitude)], gcoord.BD09, gcoord.GCJ02)
    return { longitude: gps[0], latitude: gps[1] }
}

export const gcj02ToBd09 = (longitude: string | number, latitude: string | number): object => {
    longitude = Number(longitude)
    latitude = Number(latitude)
    if (isNaN(longitude) || isNaN(latitude) || !longitude || !latitude)
        return { longitude: 0, latitude: 0 }
    const gps = gcoord.transform([Number(longitude), Number(latitude)], gcoord.GCJ02, gcoord.BD09)
    return { longitude: gps[0], latitude: gps[1] }
}

export const bd09ToWgs84 = (longitude: string | number, latitude: string | number): object => {
    longitude = Number(longitude)
    latitude = Number(latitude)
    if (isNaN(longitude) || isNaN(latitude) || !longitude || !latitude)
        return { longitude: 0, latitude: 0 }
    const gps = gcoord.transform([Number(longitude), Number(latitude)], gcoord.BD09, gcoord.WGS84)
    return { longitude: gps[0], latitude: gps[1] }
}

export const wgs84ToBd09 = (longitude: string | number, latitude: string | number): object => {
    longitude = Number(longitude)
    latitude = Number(latitude)
    if (isNaN(longitude) || isNaN(latitude) || !longitude || !latitude)
        return { longitude: 0, latitude: 0 }
    const gps = gcoord.transform([Number(longitude), Number(latitude)], gcoord.WGS84, gcoord.BD09)
    return { longitude: gps[0], latitude: gps[1] }
}

export const gcj02ToWgs84 = (longitude: string | number, latitude: string | number): object => {
    longitude = Number(longitude)
    latitude = Number(latitude)
    if (isNaN(longitude) || isNaN(latitude) || !longitude || !latitude)
        return { longitude: 0, latitude: 0 }
    const gps = gcoord.transform([Number(longitude), Number(latitude)], gcoord.GCJ02, gcoord.WGS84)
    return { longitude: gps[0], latitude: gps[1] }
}

export const wgs84ToGcj02 = (longitude: string | number, latitude: string | number): object => {
    longitude = Number(longitude)
    latitude = Number(latitude)
    if (isNaN(longitude) || isNaN(latitude) || !longitude || !latitude)
        return { longitude: 0, latitude: 0 }
    const gps = gcoord.transform([Number(longitude), Number(latitude)], gcoord.WGS84, gcoord.GCJ02)
    return { longitude: gps[0], latitude: gps[1] }
}
