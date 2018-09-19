const DB = require('../models/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ResponseHelper = require('../helpers/responseHelper')
const authConfig = require('../configs/auth.config.json')
const User = require('../models/usermodel')
const MiscHelper = require('../helpers/miscHelper')
const ObjectID = require('mongodb').ObjectID
const M_company = require('../models/M_company_model')
const db = DB.getConnection()
Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
}
const M_company_Controller = {
    readCompanyAllHandler: (req, res, next) => { //res=lempar data ke client
        db.collection('m_company').find({ is_delete: null }).sort({ code: 1 })
            .toArray((err, docs) => {
                let m_company =
                    docs.map((ele) => {
                        return new M_company(ele)
                    })
                ResponseHelper.sendResponse(res, 200, m_company)
            })
    },
    readOneById: (req, res, next) => {
        // console.log(req.params.companyid)
        db.collection('m_company').findOne({
            _id: new ObjectID(req.params.companyid)
            // db.collection('m_company').find().limit(1).sort({$natural:-1})
        }, (err, doc) => {
            ResponseHelper.sendResponse(res, 200, new M_company(doc))
        })
    },
    create_company_Handler: (req, res, next) => {
        let data = req.body //req=ngambil data dr client
        // data.code = MiscHelper.createCode()  // membuat kode random
        tanggal = new Date()
        let dd = tanggal.getDate()
        let mm = tanggal.getMonth() + 1
        let yyyy = tanggal.getFullYear()//.substring(-2) untuk potong 2 depan
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }

        let tgl = dd + '/' + mm + '/' + yyyy

        data.created_date = tgl
        let companyObject = new M_company(data)
        db.collection('m_company').find().limit(1).sort({ $natural: -1 }).toArray((err, docs) => {
           if(docs.length > 0){
            let lastcode= docs[0].code
            let lastnum = lastcode.replace("CP"," ")
            lastnum = parseInt(lastnum)
            lastnum +=1
            let padnum=(lastnum).pad(4)
            let gencode="CP"+padnum
            companyObject.code=gencode
           }
           else
           {
            companyObject.code="CP0001"
           }
            db.collection('m_company').insert(companyObject, (err, docs) => {
                ResponseHelper.sendResponse(res, 200, docs)
            })
        })

    },
    updateCompanyHandler: (req, res, next) => {
        let data = req.body
        tanggal = new Date()
        let dd = tanggal.getDate()
        let mm = tanggal.getMonth() + 1
        let yyyy = tanggal.getFullYear()//.substring(-2) untuk potong 2 depan
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        let tgl = dd + '/' + mm + '/' + yyyy
        data._id = new ObjectID(req.params.companyid)
        let companyObject = new M_company(data)
        db.collection('m_company').update(
            { _id: companyObject._id },

            companyObject,
            {
                $set: {
                    update_date: tgl
                }
            },
            (err, docs) => {
                ResponseHelper.sendResponse(res, 200, docs)
            })
    },
    deleteCompanyHandler: (req, res, next) => {
        // deleteUnit: (req, res, next) => {
        let data = new ObjectID(req.params.companyid)
        db.collection('m_company').update(
            { _id: data },
            {
                $set: {
                    is_delete: true
                }
            },
            (err, docs) => {
                ResponseHelper.sendResponse(res, 200, docs)
            })
    },
    
}

module.exports = M_company_Controller