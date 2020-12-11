const crypto = require('crypto')

let utils = {}

utils.hasK = function(o, k) {
    if (o.hasOwnProperty) {
        return o.hasOwnProperty(k)
    }
    return false
}

utils.hasKM = function(o, ...keys) {
    let res = true
    if (!o.hasOwnProperty) {
        res = false
        return res
    }

    for( let i=0, e=keys.length; i<e; i++ ) {
        if (this.hasK(o, keys[i])) {
            continue
        }

        res = false
        break
    }

    return res
}

//문자형이고, 공백아님
utils.isEmpty = function(s) {
    if (typeof s !== 'string') {
        return true
    }

    if (s.trim() === '') {
        return true
    }

    return false
}

utils.isEmptys = function(...items) {
    let res = false
    for( let i=0, e=items.length; i<e; i++ ) {
        if (this.isEmpty(items[i])) {
            res = true
            break
        }
    }

    return res
}

utils.isObjectEmpty = function(o, ...keys) {
    let res = false
    for ( let i=0, e=keys.length; i<e; i++ ) {
        if (this.isEmpty(o[keys[i]])) {
            res = true
            break
        }
    }

    return res
}


utils.isNull = function(o, ...keys) {
    let res = false
    for( let i=0, e=keys.length; i<e; i++ ) {

        if (!this.hasK(o, keys[i])) {
            res = true
            break
        }

        if (typeof o[keys[i]] === 'string' && this.isEmpty(o[keys[i]])) {
            // 문자 타입 일때만 공백 체크
            res = true
            break
        }
    }

    return res
}

utils.isNumCheck = function(o, ...keys){
    let res = false
    for(let i=0, e=keys.length; i<e; i++){

        if(!this.hasK(o,keys[i])){
            res = true
            break
        }

        if(typeof o[keys[i]] === 'string' && this.isEmpty(o[keys[i]])) {
            res = true
            break
        }

        if(isNaN(parseInt(o[keys[i]]))){
            res = true
            break
        }

    }
    return res
}

utils.isNum = function(i) {
    return typeof i == "number"
}

utils.isNums = function(...items) {
    let res = true
    for( let i=0, e=items.length; i<e; i++ ) {
        if (this.isNum(items[i])) {
            continue
        }

        res = false
        break
    }

    return res
}

utils.encryptSha256 = function(plainText) {
    if (!plainText || typeof plainText !== 'string' || plainText.trim().length < 1) {
        return false
    }
    return crypto.createHash('sha256').update(plainText).digest('hex')
}

module.exports = utils