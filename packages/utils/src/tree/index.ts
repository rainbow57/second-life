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

export function getTreePath(
    list: objectType[],
    value: number | string,
    params: TreeParameter = { field: 'id', parent: 'parentId', children: 'children' }
): any[] {
    // 删除无效数组元素
    const clone = deleteEmptyArray(list)
    if (!clone || !clone.length || typeof value === undefined) return []
    const { field = 'id' } = params || {}
    const result: any[] = []
    // 查找 field 字段对应值为 value 的父节点
    let parent = getParent(clone, value, params)
    if (parent) {
        // 找到了父节点，将自己塞入数组，作为最后一个元素
        result.unshift(value)
        while (parent !== undefined) {
            // 将父节点的 field 字段对应的值塞入数组
            result.unshift(parent[field])
            // 查找当前父节点的父节点
            parent = getParent(clone, parent[field], params)
        }
    } else {
        // 找不到父节点，看看是不是顶层的 id
        const self = clone.find(item => item[field] === value)
        if (self) {
            // 传入的 value 值是父节点的值，将该值塞入数组
            result.push(value)
        }
    }
    return result
}

export function getParent(
    list: objectType[],
    value: number | string,
    params: TreeParameter = { field: 'id', parent: 'parentId', children: 'children' }
): objectType | undefined {
    if (!list || !list.length || typeof value === undefined) return undefined
    const {
        field = 'id',
        parent: parentField = 'parentId',
        children: childrenField = 'children'
    } = params || {}
    const parentId = getParentId(list, value, params)
    if (parentId === undefined) return undefined
    // 另外拷贝一份，防止修改原来的列表
    const allList = JSON.parse(JSON.stringify(list))
    for (let i = 0; i < allList.length; i++) {
        const item = allList[i]
        if (item[field] === parentId) return item
        // 将子节点的列表拷贝至 allList
        if (typeOf(item[childrenField]) === 'array' && item[childrenField].length) {
            allList.push(...item[childrenField])
        }
    }
    return undefined
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
    const clone = deleteEmptyArray(list)
    if (!clone || !clone.length || typeof value === undefined) return undefined
    const {
        field = 'id',
        parent: parentField = 'parentId',
        children: childrenField = 'children'
    } = params || {}
    let parentValue: number | string | undefined
    for (let i = 0; i < clone.length; i++) {
        const item = clone[i]
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
