/**
 * 不确定键值对的对象类型
 */
declare interface objectType {
    [prop: string]: any
}
/**
 * 字段类型配置
 */
declare interface fieldType {
    // 字段名
    prop: string
    // 字段类型：数字、字符串、布尔类型
    type?: string
}
