export const createField = function (params: any = {}): field {
    if (!params || !params.prop) {
        return {
            prop: '',
            label: ''
        }
    }
    /* eslint no-restricted-syntax: ["error", "WithStatement", "BinaryExpression[operator='in']"] */
    const {
        prop = '',
        label = '',
        searchType,
        showInSearch = false,
        showInTable = false,
        showInForm = false,
        ...rest
    } = params || {}
    if (showInSearch) {
    } else {
        // 不是搜索字段，删除与搜索相关的字段
        delete rest.options
        delete rest.optionsApi
        delete rest.optionsFeildKey
        delete rest.optionsFieldLabel
    }
    if (showInTable) {
    }
    if (showInForm) {
    }
    return {
        prop,
        label,
        searchType,
        showInForm,
        showInSearch,
        showInTable,
        ...rest
    }
}

export const createSearchField = function (params: any = {}): field {
    if (!params || !params.prop || !params.options) {
        return {
            prop: '',
            label: ''
        }
    }
    params.showInSearch = true
    return createField(params)
}

export const createTableField = function (params: any = {}): field {
    if (!params || !params.prop) {
        return {
            prop: '',
            label: ''
        }
    }
    params.showInTable = true
    return createField(params)
}

export const createFormField = function (params: any = {}): field {
    if (!params || !params.prop) {
        return {
            prop: '',
            label: ''
        }
    }
    params.showInForm = true
    return createField(params)
}
