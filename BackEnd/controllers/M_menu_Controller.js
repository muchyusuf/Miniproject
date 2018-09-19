const DB = require('../models/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ResponseHelper = require('../helpers/responseHelper')
const authConfig = require('../configs/auth.config.json')
const User = require('../models/usermodel')
const MenuHelper = require('../helpers/menuHelper')
const ObjectID = require('mongodb').ObjectID
const M_menu = require('../models/M_menu_model')
const db = DB.getConnection()
Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
}
const M_menu_Controller = {
    readMenuAllHandler: (req, res, next) => { //res=lempar data ke client
        db.collection('m_menu').find({ is_delete: null }).sort({ code: 1 })
            .toArray((err, docs) => {
                let m_menu =
                    docs.map((ele) => {
                        return new M_menu(ele)
                    })
                ResponseHelper.sendResponse(res, 200, m_menu)
            })
    },
    readOneById: (req, res, next) => {
        // console.log(req.params.menuid)
        db.collection('m_menu').findOne({
            _id: new ObjectID(req.params.menuid)
            // db.collection('m_menu').find().limit(1).sort({$natural:-1})
        }, (err, doc) => {
            ResponseHelper.sendResponse(res, 200, new M_menu(doc))
        })
    },
    create_menu_Handler: (req, res, next) => {
        let data = req.body //req=ngambil data dr client
        // data.code = MenuHelper.createCode()  // membuat kode random
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
        let menuObject = new M_menu(data)
        db.collection('m_menu').find().limit(1).sort({ $natural: -1 }).toArray((err, docs) => {
           if(docs[0].code){
            let lastcode= docs[0].code
            let lastnum = lastcode.replace("ME"," ")
            lastnum = parseInt(lastnum)
            lastnum +=1
            let padnum=(lastnum).pad(4)
            let gencode="ME"+padnum
            menuObject.code=gencode
           }
           else
           {
            menuObject.code="ME0001"
           }
            db.collection('m_menu').insert(menuObject, (err, docs) => {
                ResponseHelper.sendResponse(res, 200, docs)
            })
        })

    },
    updateMenuHandler: (req, res, next) => {
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
        data._id = new ObjectID(req.params.menuid)
        data.update_date = tgl
        let menuObject = new M_menu(data)
        db.collection('m_menu').update(
            { _id: menuObject._id },
            
            menuObject,
            
            (err, docs) => {
                ResponseHelper.sendResponse(res, 200, docs)
            })
    },
    deleteMenuHandler: (req, res, next) => {
        // deleteUnit: (req, res, next) => {
        let data = new ObjectID(req.params.menuid)
        db.collection('m_menu').update(
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

module.exports = M_menu_Controller