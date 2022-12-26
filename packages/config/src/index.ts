export const createField = function (params: any = {}): field {
    if (!params) {
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
