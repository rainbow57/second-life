const createField = function (params = {}) {
    if (!params) {
        return {
            prop: '',
            label: ''
        };
    }
    const { prop = '', label = '', searchType, showInSearch = false, showInTable = false, showInForm = false } = params || {};
    return {
        prop,
        label,
        searchType,
        showInForm,
        showInSearch,
        showInTable
    };
};

export { createField };
