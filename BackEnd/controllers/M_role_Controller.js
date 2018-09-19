const DB = require('../models/db')
const ResponseHelper =require('../helpers/responseHelper')
const ObjectID = require('mongodb').ObjectID
const M_role = require('../models/M_role_model')
const db = DB.getConnection()

Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
}

const M_role_Controller = {
    readRoleAllHandler: (req, res, next) => { //res=lempar data ke client
        
        db.collection('m_role').find({ is_delete: null }).sort({ code: 1 })
            .toArray((err, docs) => {
                let m_role =
                    docs.map((ele) => {
                        return new M_role(ele)
                    })
                ResponseHelper.sendResponse(res, 200, m_role)
            })
    },
    create_role_Handler: (req, res, next) => {
        let data = req.body
        console.log("[THIS IS POST ROLE]")

        tanggal = new Date()
        let dd = tanggal.getDate()
        let mm = tanggal.getMonth() + 1
        let yyyy = tanggal.getFullYear()
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }

        let tgl = dd + '/' + mm + '/' + yyyy
        data.created_date = tgl

        let roleObject = new M_role(data)
        db.collection('m_role').find().limit(1).sort({ $natural: -1 }).toArray((err, docs) => {
            if(docs.length>0){
             let lastcode= docs[0].code
             let lastnum = lastcode.replace("RO"," ")
             lastnum = parseInt(lastnum)
             lastnum +=1
             let padnum=(lastnum).pad(4)
             let gencode="RO"+padnum
             //roleObject.code=gencode
             roleObject.code=gencode
            }
            else
            {
             roleObject.code="RO0001"
            }
             db.collection('m_role').insert(roleObject, (err, docs) => {
                 ResponseHelper.sendResponse(res, 200, docs)
             })
         })
    },
    updateRoleHandler: (req, res, next) => {
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
        data._id = new ObjectID(req.params.roleid)
        data.update_date = tgl
        let roleObject = new M_role(data)

        console.log("[THIS IS UPDATE ROLE")
        console.log(req.body)
        console.log("\n\n")
        db.collection('m_role').update(
            { _id: roleObject._id },

            roleObject,
            (err, docs) => {
                ResponseHelper.sendResponse(res, 200, docs)
            })
    },
    deleteRoleHandler: (req, res, next) => {
        // deleteUnit: (req, res, next) => {
        let data = new ObjectID(req.params.roleid)
        db.collection('m_role').update(
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

module.exports = M_role_Controller