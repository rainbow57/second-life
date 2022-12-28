import { deleteEmptyArray, typeOf } from '..'

/**
 * 将普通数组转换成树形数组
 * @param list 普通数组
 * @param params 树形数组相关配置
 */
export function list2Tree(
    list: objectType[],
    parentValue: number | string | undefined = undefined,
    params: TreeParameter = { field: 'id', parent: 'parentId', children: 'children' }
): objectType[] {
    list = deleteEmptyArray(list)
    if (!list || !list.length) return []
    const {
        field = 'id',
        parent: parentField = 'parentId',
        children: childrenField = 'children'
    } = params
    const tree: objectType[] = []
    list.filter(item => item[parentField] === parentValue).forEach(item => {
        // 查找子节点
        const children = list2Tree(list, item[field], params)
        if (children && children.length) {
            if (
                item &&
                item[childrenField] &&
                typeOf(item[childrenField]) === 'array' &&
                item[childrenField].length
            ) {
                tree.push({ ...item, [childrenField]: [...item[childrenField], ...children] })
            } else {
                tree.push({ ...item, [childrenField]: [...children] })
            }
        } else {
            tree.push({ ...item })
        }
    })
    return tree
}

/**
 * 根据当前节点的值，返回父节点值
 * @param list 树形数组
 * @param value 当前节点值
 * @param params 相关配置
 * @returns 父节点值
 */
export function getParentId(
    list: objectType[],
    value: number | string,
    params: TreeParameter = { field: 'id', parent: 'parentId', children: 'children' }
): number | string | undefined {
    if (!list || !list.length || typeof value === undefined) return undefined
    const {
        field = 'id',
        parent: parentField = 'parentId',
        children: childrenField = 'children'
    } = params || {}
    let parentValue: number | string | undefined
    for (let i = 0; i < list.length; i++) {
        const item = list[i]
        // 已经找到对应的结果
        if (item[field] === value) {
            return item[parentField]
        } else if (
            item[childrenField] &&
            typeOf(item[childrenField]) === 'array' &&
            item[childrenField].length
        ) {
            // 在子节点中找到该值的对应父节点值
            parentValue = getParentId(item[childrenField], value, params)
            if (parentValue !== undefined) return parentValue
        }
    }
    return undefined
}
