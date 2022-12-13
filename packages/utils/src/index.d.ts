declare namespace utils {
    /**
     * 判断传入值的类型
     * @param value 传入值
     * @returns string 类型，除了 typeof 之外的类型外 ，会有额外判断：null、date、array
     */
    export function typeOf(value: any): string
    /**
     * 生成数字范围内的随机数
     * @param min 最小数字
     * @param max 最大数字
     * @returns number类型随机数
     */
    export function random(min: number, max: number): number

    /**
     * 格式化传入的时间
     * @param dateTime 需要格式化的时间，可传入：string、number、date
     * @param format 时间格式
     */
    export function formatDateTime(dateTime: any, format: string): string
    /**
     * 将传入的数字或字符串型数字转换成指定保留位数，且/或 包含分隔符的字符串显示形式
     * @param value 需要格式化的值
     * @param percision 小数位数
     * @param seperator 千位分隔符
     * @returns string类型的显示内容
     */
    export function formatNumber(
        value: number | string,
        percision: number,
        seperator: string
    ): string
    /**
     * 过滤和删除数组中指定的空元素
     * @param value 数组
     * @param empties 需要过滤掉/删除的元素
     */
    export function deleteEmptyArray(value: any[], empties: any[]): any[]
    /**
     * 删除对象中指定值的键值对
     * @param value 对象
     * @param empties 需要删除掉的值元素
     */
    export function deleteEmpty(value: object, empties: any[]): object
}

declare module '@rainbow57/utils' {
    export = utils
}
