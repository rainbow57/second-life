export function formatDateTime(
    dateTime: string | number | Date,
    format: string = 'YYYY-MM-DD HH:mm:ss'
): string {
    if (!dateTime) return ''
    let _dateTime = new Date(dateTime)
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
