import gcoord from 'gcoord';

function formatDateTime(dateTime, format = 'YYYY-MM-DD HH:mm:ss') {
    if (!dateTime)
        return '';
    let _dateTime = new Date(dateTime);
    if (_dateTime.toString() === 'Invalid Date') {
        // console.error('传入的时间格式错误')
        return '';
    }
    const obj = {
        Y: _dateTime.getFullYear(),
        M: _dateTime.getMonth() + 1,
        D: _dateTime.getDate(),
        H: _dateTime.getHours(),
        m: _dateTime.getMinutes(),
        s: _dateTime.getSeconds()
    };
    return format.replace(/(Y+|M+|D+|H+|m+|s+)/g, (replaceValue) => String((replaceValue.length > 1 ? '0' : '') + obj[replaceValue.slice(-1)]).slice(-(replaceValue.length > 2 ? replaceValue.length : 2)));
}

const bd09ToGcj02 = (longitude, latitude) => {
    return gcoord.transform([longitude, latitude], gcoord.BD09, gcoord.GCJ02);
};
const gcj02ToBd09 = (longitude, latitude) => {
    return gcoord.transform([longitude, latitude], gcoord.GCJ02, gcoord.BD09);
};
const bd09ToWgs84 = (longitude, latitude) => {
    return gcoord.transform([longitude, latitude], gcoord.BD09, gcoord.WGS84);
};
const wgs84ToBd09 = (longitude, latitude) => {
    return gcoord.transform([longitude, latitude], gcoord.WGS84, gcoord.BD09);
};
const gcj02ToWgs84 = (longitude, latitude) => {
    return gcoord.transform([longitude, latitude], gcoord.GCJ02, gcoord.WGS84);
};
const wgs84ToGcj02 = (longitude, latitude) => {
    return gcoord.transform([longitude, latitude], gcoord.WGS84, gcoord.GCJ02);
};

function typeOf(value) {
    let type = typeof value;
    if (type === 'object') {
        if (value === null)
            return 'null';
        if (value instanceof Date)
            return 'date';
        if (value instanceof Array)
            return 'array';
    }
    return type;
}
function random(min, max) {
    if (isNaN(min)) {
        min = 0;
    }
    if (isNaN(max)) {
        max = Number.MAX_VALUE;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function formatNumber(value, percision = 2, seperator = '') {
    isNaN(percision) ? (percision = 2) : (percision = Math.max(0, percision));
    if (!value)
        return percision === 0
            ? '0'
            : `0.${Math.pow(10, percision)
                .toString()
                .slice(0 - percision)}`;
    const numStr = typeOf(value) === 'string' ? value.replace(/,/g, '') : `${value || ''}`;
    const arr = numStr.split('.');
    let strInt = arr[0];
    let strFraction = arr[1] || '';
    // 要求的小数位数与实际小数位数之差
    const patchPercision = percision - strFraction.length;
    // 添加千位分隔符
    if (seperator) {
        strInt = strInt.replace(/\d{1,3}(?=(\d{3})+$)/g, `$&${seperator}`);
    }
    // 实际的小数位数比要求的小数位数大
    if (patchPercision < 0) {
        strFraction = strFraction.substring(0, percision);
    }
    else if (patchPercision > 0) {
        // 实际的小数位数比要求的小数位数小，需要补零
        strFraction += Math.pow(10, patchPercision)
            .toString()
            .slice(0 - patchPercision);
    }
    if (strFraction.length > 0) {
        return `${strInt}.${strFraction}`;
    }
    return strInt;
}
function deleteEmptyArray(obj, empties = ['', undefined, null]) {
    if (!obj || !obj.length)
        return [];
    return obj
        .filter((item) => !empties.includes(item))
        .map((item) => typeOf(item) === 'object' ? deleteEmpty(item, empties) : item);
}
function deleteEmpty(obj, empties = ['', undefined, null]) {
    if (obj === null)
        return null;
    if (!obj)
        return {};
    // 处理数组
    if (typeOf(obj) === 'array') {
        return deleteEmptyArray(obj, empties);
    }
    const result = {};
    // 处理对象
    for (const key in obj) {
        const value = obj[key];
        const valueType = typeOf(value);
        if (empties.includes(value))
            continue;
        if (valueType === 'array') {
            result[key] = deleteEmptyArray(value, empties);
        }
        else if (valueType === 'object') {
            result[key] = deleteEmpty(value, empties);
        }
        else {
            result[key] = value;
        }
    }
    return result;
}

export { bd09ToGcj02, bd09ToWgs84, deleteEmpty, deleteEmptyArray, formatDateTime, formatNumber, gcj02ToBd09, gcj02ToWgs84, random, typeOf, wgs84ToBd09, wgs84ToGcj02 };
