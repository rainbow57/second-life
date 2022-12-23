import strChineseFirstPY from './chineseFirstPY'
import oMultiDiff from './multiPY'
/**
 * 检查该unicode码是否在处理范围之内,在则返回该码对映汉字的拼音首字母,不在则调用其它函数处理
 * @param {String} ch unicode
 * @returns 字母
 */
function checkCh(ch: string) {
    var uni = ch.charCodeAt(0)
    // 如果不在汉字处理范围之内,返回原字符,也可以调用自己的处理函数
    if (uni > 40869 || uni < 19968) {
        return ch
    }
    // 检查是否是多音字,是按多音字处理,不是就直接在strChineseFirstPY字符串中找对应的首字母
    return oMultiDiff[uni] ? oMultiDiff[uni] : strChineseFirstPY.charAt(uni - 19968)
}

export default (val: string): string | string[] => {
    if (typeof val !== 'string') return ''
    const middleResult = []
    for (let i = 0; i < val.length; i++) {
        // 获得 unicode
        const ch = val.charAt(i)
        middleResult.push(checkCh(ch))
    }
    // 处理中间结果, 返回所有可能的拼音首字母串数组
    return middleResult.reduce(
        (prev, result) => {
            const strLength = result.length
            if (strLength === 1) {
                prev = prev.map(_ => _ + result)
            } else {
                const tempArr = prev.slice(0)
                prev = []
                for (let i = 0; i < strLength; i++) {
                    // 赋值相同的 tempArr 元素 将当前的字符添加到每个元素的末尾
                    const temp = tempArr.slice(0).map(_ => _ + result.charAt(i))
                    // 把复制并修改后的数组连接到prev上
                    prev = prev.concat(temp)
                }
            }
            return prev
        },
        ['']
    )
}
