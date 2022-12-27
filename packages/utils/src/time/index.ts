export const hourTimestamp = 1000 * 60 * 60

export const dayTimestamp = 24 * hourTimestamp

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
