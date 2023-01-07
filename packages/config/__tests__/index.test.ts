import { createFormField, createSearchField, createTableField } from '../src/index'

describe('createSearchField', () => {
    it('生成空字段 -> {prop: "", label: ""}', () => {
        expect(() => createSearchField()).toThrowError('函数缺少必传参数')
        expect(() => createSearchField(null)).toThrowError('函数缺少必传参数')
        expect(() => createSearchField(undefined)).toThrowError('函数缺少必传参数')
        expect(() => createSearchField({})).toThrowError('函数缺少必传参数')
        expect(() => createSearchField({ prop: '' })).toThrowError('函数缺少必传参数')
        expect(() => createSearchField({ label: '' })).toThrowError('函数缺少必传参数')
        expect(() => createSearchField({ prop: '', label: '主键' })).toThrowError(
            '函数缺少必传参数'
        )
    })
})

describe('createTableField', () => {
    it('生成空字段 -> {prop: "", label: ""}', () => {
        expect(() => createTableField()).toThrowError('函数缺少必传参数')
        expect(() => createTableField(null)).toThrowError('函数缺少必传参数')
        expect(() => createTableField(undefined)).toThrowError('函数缺少必传参数')
        expect(() => createTableField({})).toThrowError('函数缺少必传参数')
        expect(() => createTableField({ prop: '' })).toThrowError('函数缺少必传参数')
        expect(() => createTableField({ label: '' })).toThrowError('函数缺少必传参数')
        expect(() => createTableField({ prop: '', label: '主键' })).toThrowError('函数缺少必传参数')
    })
})

describe('createFormField', () => {
    it('生成空字段 -> {prop: "", label: ""}', () => {
        expect(() => createFormField()).toThrowError('函数缺少必传参数')
        expect(() => createFormField(null)).toThrowError('函数缺少必传参数')
        expect(() => createFormField(undefined)).toThrowError('函数缺少必传参数')
        expect(() => createFormField({})).toThrowError('函数缺少必传参数')
        expect(() => createFormField({ prop: '' })).toThrowError('函数缺少必传参数')
        expect(() => createFormField({ label: '' })).toThrowError('函数缺少必传参数')
        expect(() => createFormField({ prop: '', label: '主键' })).toThrowError('函数缺少必传参数')
    })
})
