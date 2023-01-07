export const searchTypeEnum: string[] = [
    'select',
    'cascader',
    'date',
    'daterange',
    'datetime',
    'datetimerange'
]

export const createField = function (params: any = {}): field {
    if (!params || !params.prop) {
        throw new Error('函数缺少必传参数')
    }
    /* eslint no-restricted-syntax: ["error", "WithStatement", "BinaryExpression[operator='in']"] */
    const {
        prop = '',
        label = '',
        searchType,
        options,
        optionsApi,
        optionsProps,
        multiple,
        clearable,
        sortable,
        disabled,
        filterable,
        filterMethod,
        startProp,
        endProp,
        showInSearch = false,
        showInTable = false,
        showInForm = false,
        ...rest
    } = params || {}
    const field = {
        prop,
        label,
        ...rest
    }
    // 查询字段设置
    if (showInSearch) {
        field.showInSearch = true
        if (searchType) {
            field.searchType = searchType
            if (['select', 'cascader'].includes(searchType)) {
                if (!options && !optionsApi)
                    throw new Error('下拉选择类型字段不能缺少 options 或 optionsApi 参数')
                if (options) {
                    field.options = options
                } else if (optionsApi) {
                    field.optionsApi = optionsApi
                }
                optionsProps &&
                    (field.optionsProps = optionsProps || {
                        value: 'id',
                        label: 'name',
                        children: 'children'
                    })
            } else if (['daterange', 'datetimerange'].includes(searchType)) {
                if (!startProp || !endProp)
                    throw new Error('时间范围选择类型字段不能缺少 startProp 和 endProp 参数')
                field.startProp = startProp
                field.endProp = endProp
            }
        }
        // 是否可以多选
        if (typeof multiple !== 'undefined') {
            field.multiple = multiple
        }
        //  是否允许清除
        if (typeof clearable !== 'undefined') {
            field.clearable = clearable
        }
        // 是否可以过滤
        if (typeof filterable !== 'undefined') {
            field.filterable = filterable
            if (filterable) {
                typeof filterMethod === 'function' && (field.filterMethod = filterMethod)
            }
        }
        // 是否禁用
        if (typeof disabled !== 'undefined') {
            field.disabled = disabled
        }
    }
    // 表格字段设置
    if (showInTable) {
        field.showInTable = true
        if (typeof sortable !== 'undefined') {
            field.sortable = sortable
        }
    }
    // 表单字段设置
    if (showInForm) {
        field.showInForm = true
    }
    return field
}

export const createSearchField = function (params: any = {}): field {
    params = params || {}
    params.showInSearch = true
    try {
        return createField(params)
    } catch (error) {
        throw error
    }
}

export const createTableField = function (params: any = {}): field {
    params = params || {}
    params.showInTable = true
    try {
        return createField(params)
    } catch (error) {
        throw error
    }
}

export const createFormField = function (params: any = {}): field {
    params = params || {}
    params.showInForm = true
    try {
        return createField(params)
    } catch (error) {
        throw error
    }
}
