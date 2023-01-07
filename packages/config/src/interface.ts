declare interface boolFunction {
    (row: any): boolean
}

declare interface numberFunction {
    (row: any): number
}

declare interface stringFunction {
    (row: any): string
}

declare interface selectFunction {
    (row: any): selectOption[]
}

declare interface anyFunction {
    (row: any): any
}

declare interface selectOption {
    value: string | number
    label: string
    code?: string
    disabled?: boolean
    children?: selectOption[]
}

/**
 * config 的基础对象，一个查询条件、一个表格列、一个新增或编辑中的表单元素
 * field 的大部分属性都支持函数，函数传入参数是当前行的数据对象，返回值类型必须是对应的类型
 */
declare interface field {
    // field 的字段名，用于 v-model、el-form-item 中的 prop、 el-table-column 中的 prop
    prop: string | stringFunction
    // 字段的中文名，用于在 el-form-item 的 label，用于 el-table-column 的 label
    label: string | stringFunction
    // 查询类型： datetimerange / input / select ...
    searchType?: string | stringFunction
    // 是否查询条件（true： 在查询条件中显示，false：不是查询条件）
    showInSearch?: boolean | boolFunction
    // 是否表格列（true：在表格列中显示，false：不在表格列中显示）
    showInTable?: boolean | boolFunction
    // 是否在新增/编辑页（对话框）中显示
    showInForm?: boolean | boolFunction
    // 查询区域的显示顺序（先后顺序）
    searchSort?: number | numberFunction
    // 表格区域的显示顺序（先后顺序）
    tableSort?: number | numberFunction
    // 新增、编辑区域的显示顺序
    formSort?: number | numberFunction
    // 是否多选（仅在 search 中有效）
    multiple?: boolean | boolFunction
    // 是否可以排序（el-table 表格列的排序）
    sortable?: boolean | boolFunction
    // 是否可以清除（仅在 search 中有效）
    clearable?: boolean | boolFunction
    // 是否可以过滤（仅在 search 中有效）
    filterable?: boolean | boolFunction
    // 自定义过滤方法
    filterMethod?: Function
    // 是否禁用（仅在 search 中有效）
    disabled?: boolean | boolFunction
    // 列最小宽度（仅在 table 中生效）
    minWidth?: number | string | anyFunction
    // 列宽度（仅在 table 中生效）
    width?: number | string | anyFunction
    // 渲染函数（仅在 table 中生效）
    render?: anyFunction
    // ====== label 区域下拉选择相关属性 ====
    labelOptions?: selectOption[] | selectFunction
    // ====== 下拉选择（select、cascader 等）列相关属性 ====
    // 下拉选择项({value, label, disabled, children})
    options?: selectOption[] | selectFunction
    // 动态获取远程地址
    optionsApi?: string | stringFunction
    // 下拉选择配置项（指定下拉选项的 value 字段名、label 字段名、children 字段名）
    optionsProps?: selectOption

    // ====== 日期范围选择列相关属性 ====
    // 提交服务端查询时的开始时间字段名
    startProp?: string | stringFunction
    // // 提交服务端查询时的结束时间字段名
    endProp?: string | stringFunction
}
