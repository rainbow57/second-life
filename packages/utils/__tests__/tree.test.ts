import { getParentId, list2Tree } from '../src/tree'

describe('====从数组中找出对应值的父节点 Id -> getParentId====', () => {
    it('空值传入 -> getParentId', () => {
        expect(getParentId([], '')).toEqual(undefined)
        expect(getParentId([], 0)).toEqual(undefined)
    })

    it('未找到 -> should return undefined', () => {
        expect(getParentId([{}], '1')).toEqual(undefined)
    })

    it('能找到对应节点 -> 返回 该节点的父节点值', () => {
        expect(getParentId([{ id: 1, parentId: 0 }], 1)).toEqual(0)
        expect(
            getParentId(
                [
                    { id: 1, parentId: 0 },
                    { id: 2, parentId: 0 }
                ],
                2
            )
        ).toEqual(0)
    })

    it('在子节点中找到对应节点 -> 返回 该节点的父节点值', () => {
        const tree = [
            {
                id: 1,
                parentId: 0,
                children: [
                    { id: 10, parentId: 1 },
                    { id: 11, parentId: 1 }
                ]
            }
        ]
        expect(getParentId(tree, 11)).toEqual(1)
        tree.push({
            id: 2,
            parentId: 0,
            children: [
                { id: 20, parentId: 2 },
                { id: 21, parentId: 2 }
            ]
        })
        expect(getParentId(tree, 21)).toEqual(2)
        expect(getParentId(tree, 22)).toEqual(undefined)
    })

    it('能找到对应节点,自定义字段 -> 返回 该节点的父节点值', () => {
        expect(getParentId([{ key: 1, pid: 0 }], 1, { field: 'key', parent: 'pid' })).toEqual(0)
        expect(
            getParentId(
                [
                    { key: 1, pid: 0 },
                    { key: 2, pid: 0 }
                ],
                2,
                { field: 'key', parent: 'pid' }
            )
        ).toEqual(0)
    })

    it('在子节点中找到对应节点,自定义字段 -> 返回 该节点的父节点值', () => {
        const tree = [
            {
                key: 1,
                pid: 0,
                child: [
                    { key: 10, pid: 1 },
                    { key: 11, pid: 1 }
                ]
            }
        ]
        expect(getParentId(tree, 11, { field: 'key', parent: 'pid', children: 'child' })).toEqual(1)
        tree.push({
            key: 2,
            pid: 0,
            child: [
                { key: 20, pid: 2 },
                { key: 21, pid: 2 }
            ]
        })
        expect(getParentId(tree, 21, { field: 'key', parent: 'pid', children: 'child' })).toEqual(2)
        expect(getParentId(tree, 22, { field: 'key', parent: 'pid', children: 'child' })).toEqual(
            undefined
        )
    })

    it('能找到对应节点,自定义字段设置为 undefined/null -> 返回 该节点的父节点值', () => {
        expect(getParentId([{ id: 1, parentId: 0 }], 1, undefined)).toEqual(0)
        expect(
            getParentId(
                [
                    { id: 1, parentId: 0 },
                    { id: 2, parentId: 0 }
                ],
                2,
                undefined
            )
        ).toEqual(0)
        expect(getParentId([{ id: 1, parentId: 0 }], 1, null)).toEqual(0)
        expect(
            getParentId(
                [
                    { id: 1, parentId: 0 },
                    { id: 2, parentId: 0 }
                ],
                2,
                null
            )
        ).toEqual(0)

        expect(getParentId([{ key: 1, pid: 0 }], 1, undefined)).toEqual(undefined)
        expect(
            getParentId(
                [
                    { key: 1, pid: 0 },
                    { key: 2, pid: 0 }
                ],
                2,
                undefined
            )
        ).toEqual(undefined)
        expect(getParentId([{ key: 1, pid: 0 }], 1, null)).toEqual(undefined)
        expect(
            getParentId(
                [
                    { key: 1, pid: 0 },
                    { key: 2, pid: 0 }
                ],
                2,
                null
            )
        ).toEqual(undefined)
    })
})

describe('====将普通数组转换成树形数组 list2Tree ====', () => {
    it('传入空值 -> 返回空数组', () => {
        expect(list2Tree(undefined)).toEqual([])
        expect(list2Tree(null)).toEqual([])
        expect(list2Tree([])).toEqual([])
        expect(list2Tree([undefined])).toEqual([])
        expect(list2Tree([undefined, null])).toEqual([])
    })

    it('传入默认键值的对象数组 -> 返回默认键值的树形数组', () => {
        const list = [
            {
                id: 1,
                parentId: 0,
                children: [
                    { id: 11, parentId: 1 },
                    { id: 12, parentId: 1 }
                ]
            },
            { id: 2, parentId: 0 },
            { id: 22, parentId: 2 },
            { id: 3, parentId: 0 }
        ]
        const tree = list2Tree(list, 0)
        expect(tree).toEqual([
            {
                id: 1,
                parentId: 0,
                children: [
                    { id: 11, parentId: 1 },
                    { id: 12, parentId: 1 }
                ]
            },
            { id: 2, parentId: 0, children: [{ id: 22, parentId: 2 }] },
            { id: 3, parentId: 0 }
        ])
    })

    it('传入自定义键值的对象数组 -> 返回自定义键值的树形数组', () => {
        const list = [
            {
                id: 1,
                pid: 0,
                child: [
                    { id: 11, pid: 1 },
                    { id: 12, pid: 1 }
                ]
            },
            { id: 2, pid: 0 },
            { id: 22, pid: 2 },
            { id: 3, pid: 0 }
        ]
        const tree = list2Tree(list, 0, { parent: 'pid', children: 'child' })
        expect(tree).toEqual([
            {
                id: 1,
                pid: 0,
                child: [
                    { id: 11, pid: 1 },
                    { id: 12, pid: 1 }
                ]
            },
            { id: 2, pid: 0, child: [{ id: 22, pid: 2 }] },
            { id: 3, pid: 0 }
        ])
    })
})
