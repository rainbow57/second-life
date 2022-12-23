export const createField = function (params: any = {}): field {
    if (!params) {
        return {
            prop: '',
            label: ''
        }
    }
    const {
        prop = '',
        label = '',
        searchType,
        showInSearch = false,
        showInTable = false,
        showInForm = false
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
        showInTable
    }
}
