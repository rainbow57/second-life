import { typeOf } from '..'

export const hourTimestamp = 1000 * 60 * 60

export const dayTimestamp = 24 * hourTimestamp

export const dateTypes = [
    'millisecond',
    'milliseconds',
    'second',
    'seconds',
    'minute',
    'minutes',
    'hour',
    'hours',
    'day',
    'days',
    'week',
    'weeks',
    'mounth',
    'mounths',
    'year',
    'years'
]

export function formatDateTime(
    dateTime: string | number | Date,
    format: string = 'YYYY-MM-DD HH:mm:ss'
): string {
    if (!dateTime) return ''
    const _dateTime = new Date(dateTime)
    if (_dateTime.toString() === 'Invalid Date') {
        // console.error('传入的时间格式错误')
        return ''
    }
    const obj: object = {
        Y: _dateTime.getFullYear(),
        M: _dateTime.getMonth() + 1,
        D: _dateTime.getDate(),
        H: _dateTime.getHours(),
        m: _dateTime.getMinutes(),
        s: _dateTime.getSeconds()
    }
    return format.replace(/(Y+|M+|D+|H+|m+|s+)/g, (replaceValue: string) =>
        String((replaceValue.length > 1 ? '0' : '') + (obj as any)[replaceValue.slice(-1)]).slice(
            -(replaceValue.length > 2 ? replaceValue.length : 2)
        )
    )
}

export function getDateInterval(start: any, end: any, type: string = 'milliseconds'): number {
    if (!start || !end) return 0
    start = new Date(start)
    end = new Date(end)
    if (typeOf(start) !== 'date' || typeOf(end) !== 'date') return 0
    if (start.toString() === 'Invalid Date' || end.toString() === 'Invalid Date') return 0

    const milliseconds = Math.abs(end - start)
    if (['second', 'seconds'].includes(type)) {
        return Math.floor(milliseconds / 1000)
    } else if (['minute', 'minutes'].includes(type)) {
        return Math.floor(milliseconds / (1000 * 60))
    } else if (['hour', 'hours'].includes(type)) {
        return Math.floor(milliseconds / hourTimestamp)
    } else if (['day', 'days'].includes(type)) {
        return Math.floor(milliseconds / dayTimestamp)
    } else if (['week', 'weeks'].includes(type)) {
        return Math.floor(milliseconds / (dayTimestamp * 7))
    }
    return milliseconds
}

export function getDateRange(
    days: number = 0,
    format: string = 'YYYY-MM-DD HH:mm:ss'
): string[] | null {
    days = parseInt(days + '')
    if (isNaN(days)) return null

    const now = new Date()
    let start, end
    if (days < 0) {
        start = `${formatDateTime(now, 'YYYY-MM-DD')} 00:00:00`
        end = `${formatDateTime(now.setDate(now.getDate() - days), 'YYYY-MM-DD')} 23:59:59`
    } else {
        end = `${formatDateTime(now, 'YYYY-MM-DD')} 23:59:59`
        start = `${formatDateTime(now.setDate(now.getDate() - days), 'YYYY-MM-DD')} 00:00:00`
    }
    return [formatDateTime(start, format), formatDateTime(end, format)]
}
