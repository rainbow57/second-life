import gcoord from 'gcoord'

export const bd09ToGcj02 = (latitude: number, longitude: number): number[] => {
    return gcoord.transform([latitude, longitude], gcoord.BD09, gcoord.GCJ02)
}

export const gcj02ToBd09 = (latitude: number, longitude: number): number[] => {
    return gcoord.transform([latitude, longitude], gcoord.GCJ02, gcoord.BD09)
}

export const bd09ToWgs84 = (latitude: number, longitude: number): number[] => {
    return gcoord.transform([latitude, longitude], gcoord.BD09, gcoord.WGS84)
}

export const wgs84ToBd09 = (latitude: number, longitude: number): number[] => {
    return gcoord.transform([latitude, longitude], gcoord.WGS84, gcoord.BD09)
}

export const gcj02ToWgs84 = (latitude: number, longitude: number): number[] => {
    return gcoord.transform([latitude, longitude], gcoord.GCJ02, gcoord.WGS84)
}

export const wgs84ToGcj02 = (latitude: number, longitude: number): number[] => {
    return gcoord.transform([latitude, longitude], gcoord.WGS84, gcoord.GCJ02)
}
