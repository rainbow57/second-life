'use strict';

var gcoord = require('gcoord');

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
    longitude = Number(longitude);
    latitude = Number(latitude);
    if (isNaN(longitude) || isNaN(latitude) || !longitude || !latitude)
        return { longitude: 0, latitude: 0 };
    const gps = gcoord.transform([Number(longitude), Number(latitude)], gcoord.BD09, gcoord.GCJ02);
    return { longitude: gps[0], latitude: gps[1] };
};
const gcj02ToBd09 = (longitude, latitude) => {
    longitude = Number(longitude);
    latitude = Number(latitude);
    if (isNaN(longitude) || isNaN(latitude) || !longitude || !latitude)
        return { longitude: 0, latitude: 0 };
    const gps = gcoord.transform([Number(longitude), Number(latitude)], gcoord.GCJ02, gcoord.BD09);
    return { longitude: gps[0], latitude: gps[1] };
};
const bd09ToWgs84 = (longitude, latitude) => {
    longitude = Number(longitude);
    latitude = Number(latitude);
    if (isNaN(longitude) || isNaN(latitude) || !longitude || !latitude)
        return { longitude: 0, latitude: 0 };
    const gps = gcoord.transform([Number(longitude), Number(latitude)], gcoord.BD09, gcoord.WGS84);
    return { longitude: gps[0], latitude: gps[1] };
};
const wgs84ToBd09 = (longitude, latitude) => {
    longitude = Number(longitude);
    latitude = Number(latitude);
    if (isNaN(longitude) || isNaN(latitude) || !longitude || !latitude)
        return { longitude: 0, latitude: 0 };
    const gps = gcoord.transform([Number(longitude), Number(latitude)], gcoord.WGS84, gcoord.BD09);
    return { longitude: gps[0], latitude: gps[1] };
};
const gcj02ToWgs84 = (longitude, latitude) => {
    longitude = Number(longitude);
    latitude = Number(latitude);
    if (isNaN(longitude) || isNaN(latitude) || !longitude || !latitude)
        return { longitude: 0, latitude: 0 };
    const gps = gcoord.transform([Number(longitude), Number(latitude)], gcoord.GCJ02, gcoord.WGS84);
    return { longitude: gps[0], latitude: gps[1] };
};
const wgs84ToGcj02 = (longitude, latitude) => {
    longitude = Number(longitude);
    latitude = Number(latitude);
    if (isNaN(longitude) || isNaN(latitude) || !longitude || !latitude)
        return { longitude: 0, latitude: 0 };
    const gps = gcoord.transform([Number(longitude), Number(latitude)], gcoord.WGS84, gcoord.GCJ02);
    return { longitude: gps[0], latitude: gps[1] };
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
function isEmpty(value, deep = false) {
    if (typeOf(value) === 'number')
        return isNaN(value);
    if (typeOf(value) === 'boolean')
        return false;
    if (!value)
        return true;
    // 如果是数组，没有元素，则返回空
    if (typeOf(value) === 'array') {
        if (!value.length)
            return true;
        // 不检查深层对象，并且数组长度不为 0，则返回 false
        if (!deep && value.length)
            return false;
        const arr = deep ? deleteEmptyArray(value) : value;
        if (!arr.length)
            return true;
        return false;
    }
    else if (typeOf(value) === 'object') {
        //  如果是对象
        const obj = deep ? deleteEmpty(value) : value;
        // 是否没有键值对
        return deep ? JSON.stringify(obj) === '{}' : false;
    }
    return false;
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
    if (!obj)
        return obj;
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
            if (value.length) {
                result[key] = deleteEmptyArray(value, empties);
            }
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
// http
function parseQuery(url, types = []) {
    if (!url)
        return {};
    const search = url.split('?')[1];
    if (!search)
        return {};
    const query = JSON.parse(`{"${decodeURIComponent(search).replace(/"/g, '\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\+/g, ' ')}"}`);
    if (types && types.length) {
        types.forEach(item => {
            const { prop = '', type = '' } = item;
            if (!prop || !type)
                return;
            if (query[prop]) {
                // 按规定的格式调整数据类型
                if (type === 'number') {
                    query[prop] = parseFloat(query[prop]);
                }
                else if (type === 'string') {
                    query[prop] = query[prop] ? query[prop] + '' : '';
                }
                else if (type === 'boolean') {
                    query[prop] = query[prop] === 'true' || query[prop] === true;
                }
            }
        });
    }
    return query;
}

exports.bd09ToGcj02 = bd09ToGcj02;
exports.bd09ToWgs84 = bd09ToWgs84;
exports.deleteEmpty = deleteEmpty;
exports.deleteEmptyArray = deleteEmptyArray;
exports.formatDateTime = formatDateTime;
exports.formatNumber = formatNumber;
exports.gcj02ToBd09 = gcj02ToBd09;
exports.gcj02ToWgs84 = gcj02ToWgs84;
exports.isEmpty = isEmpty;
exports.parseQuery = parseQuery;
exports.random = random;
exports.typeOf = typeOf;
exports.wgs84ToBd09 = wgs84ToBd09;
exports.wgs84ToGcj02 = wgs84ToGcj02;
