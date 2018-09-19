const DB = require('../models/db')
const db = DB.getConnection()
const M_company = require('../models/M_company_model')
const ObjectID = require('mongodb').ObjectID

Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
}
const miscHelper = {
    createCode: () => {
        let lastcode = ''
        let prefix = "CP"
        // let lastcode = latest.code
        // console.log(latest.length)
        let lastnum = lastcode.replace(prefix, " ")
        lastnum = parseInt(lastnum)
        lastnum += 1
        let padnum = (lastnum).pad(4)
        let gencode = prefix + padnum
        return gencode

        //    })


        // return lastcode
        // })
        // return lastcode
        // 
        // console.log(gencode)
        // return gencode;
    }

}
module.exports = miscHelper