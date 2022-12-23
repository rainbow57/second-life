/**
 * config 的基础对象，一个查询条件、一个表格列、一个新增或编辑中的表单元素
 * field 的大部分属性都支持函数，函数传入参数是当前行的数据对象，返回值类型必须是对应的类型
 */
declare interface field {
    // field 的字段名，用于 v-model、el-form-item 中的 prop、 el-table-column 中的 prop
    prop: string | Function
    // 字段的中文名，用于在 el-form-item 的 label，用于 el-table-column 的 label
    label: string | Function
    // 查询类型： datetimerange / input / select ...
    searchType?: string | Function
    // 是否查询条件（true： 在查询条件中显示，false：不是查询条件）
    showInSearch?: boolean | Function
    // 是否表格列（true：在表格列中显示，false：不在表格列中显示）
    showInTable?: boolean | Function
    // 是否在新增/编辑页（对话框）中显示
    showInForm?: boolean | Function
    // 查询区域的显示顺序（先后顺序）
    searchSort?: number | Function
    // 表格区域的显示顺序（先后顺序）
    tableSort?: number | Function
    // 新增、编辑区域的显示顺序
    formSort?: number | Function
    // 是否可以排序（el-table 表格列的排序）
    sortable?: boolean | Function
    // 是否可以清除
    clearable?: boolean | Function
    // 是否可以过滤
    filterable?: boolean | Function
    // 自定义过滤方法
    filterMethod?: Function
    // 是否禁用
    disabled?: boolean | Function
    // 列最小宽度（仅在 table 中生效）
    minWidth?: number | string | Function
    // 列宽度（仅在 table 中生效）
    width?: number | string | Function
    // 渲染函数（仅在 table 中生效）
    render?: Function
    // ====== label 区域下拉选择相关属性 ====
    labelOptions?: field[] | Function
    // ====== 下拉选择（select、cascader 等）列相关属性 ====
    // 下拉选择项({prop, label, disabled, children})
    options?: field[] | Function
    // 动态获取远程地址
    optionsApi?: string
    // 下拉选择配置项（指定下拉选项的 value 字段名、label 字段名、children 字段名）
    optionsProps?: object

    // ====== 日期范围选择列相关属性 ====
    // 提交服务端查询时的开始时间字段名
    startProp?: string
    // // 提交服务端查询时的结束时间字段名
    endProp?: string
}
