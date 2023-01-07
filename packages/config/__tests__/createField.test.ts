import { createField } from '../src/index'

describe('createField', () => {
    it('缺少 prop 属性，生成空字段 -> {prop: "", label: ""}', () => {
        expect(() => createField()).toThrowError('函数缺少必传参数')
        expect(() => createField(null)).toThrowError('函数缺少必传参数')
        expect(() => createField(undefined)).toThrowError('函数缺少必传参数')
        expect(() => createField({})).toThrowError('函数缺少必传参数')
        expect(() => createField({ prop: '' })).toThrowError('函数缺少必传参数')
        expect(() => createField({ label: '' })).toThrowError('函数缺少必传参数')
        expect(() => createField({ prop: '', label: '主键' })).toThrowError('函数缺少必传参数')
    })

    it('创建 Input 类型查询字段 -> {prop: "code", label: "编码", showInSearch: true}', () => {
        expect(createField({ prop: 'code', label: '编码', showInSearch: true })).toEqual({
            prop: 'code',
            label: '编码',
            showInSearch: true
        })
    })

    it('创建下拉选择字段', () => {
        const params = { prop: 'id', label: '客户', showInSearch: true, searchType: 'select' }
        expect(() => createField(params)).toThrowError(
            '下拉选择类型字段不能缺少 options 或 optionsApi 参数'
        )
        const params1 = {
            prop: 'id',
            label: '客户',
            showInSearch: true,
            searchType: 'select',
            optionsApi: '/api'
        }
        expect(createField(params1)).toEqual(params1)
        const params2 = {
            prop: 'id',
            label: '客户',
            showInSearch: true,
            searchType: 'select',
            options: [
                { value: 1, label: '客户 A' },
                { value: 2, label: '客户 B' }
            ]
        }
        expect(createField(params2)).toEqual(params2)
    })

    it('创建时间范围选择字段', () => {
        let params: { [prop: string]: any } = {
            prop: 'createTime',
            label: '创建时间',
            showInSearch: true,
            searchType: 'datetimerange'
        }
        expect(() => createField(params)).toThrowError(
            '时间范围选择类型字段不能缺少 startProp 和 endProp 参数'
        )
        params = { ...params, startProp: 'createStartTime' }
        expect(() => createField(params)).toThrowError(
            '时间范围选择类型字段不能缺少 startProp 和 endProp 参数'
        )
        params = { ...params, endProp: 'createEndTime' }
        expect(createField(params)).toEqual(params)
    })

    it('创建表格字段 -> {prop: "code", label: "编码", showInTable: true}', () => {
        expect(createField({ prop: 'code', label: '编码', showInTable: true })).toEqual({
            prop: 'code',
            label: '编码',
            showInTable: true
        })
    })

    it('创建表单字段 -> {prop: "code", label: "编码", showInForm: true}', () => {
        expect(createField({ prop: 'code', label: '编码', showInForm: true })).toEqual({
            prop: 'code',
            label: '编码',
            showInForm: true
        })
    })
})
