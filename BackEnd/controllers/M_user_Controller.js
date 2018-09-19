const DB = require('../models/db')
const ResponseHelper =require('../helpers/responseHelper')
const ObjectID = require('mongodb').ObjectID
const M_user = require('../models/M_user_model')
const db = DB.getConnection()
const bcrypt = require('bcrypt')

Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
}

const M_user_Controller = {
    readUserAllHandler: (req, res, next) => { //res=lempar data ke client
        
        db.collection('m_user').aggregate([
            { $lookup:
               {
                 from: 'm_employee',
                 localField: 'm_employee_id',
                 foreignField: 'employee_number',
                 as: 'employee'
               }               
            },
            { $lookup:
                {
                  from: 'm_role',
                  localField: 'm_role_id',
                  foreignField: 'code',
                  as: 'role'
                }               
            },
            { $lookup:
                {
                  from: 'm_company',
                  localField: 'employee.m_company_id',
                  foreignField: 'code',//harusnya foreignField: 'code'
                  as: 'company'
                }               
            },
            { $match: 
                {
                    is_delete 	: null 
                }
            },  
            { $project : 
                {
                    "_id"	        : "$_id",
                    "username"      : "$username",
                    "firstname"     : "$employee.first_name",
                    "lastname"      : "$employee.last_name",
                    "role"          : "$role.name",
                    "company"       : "$company.name",
                    "m_employee_id" : "$m_employee_id",
                    "m_role_id"     : "$m_role_id",
                    "created_by"    : "$created_by",
                    "created_date"  : "$created_date",
                    "update_by"     : "$update_by",
                    
                    "is_delete"     : "$is_delete",
                    "password"      : "$password"
                }
            }
            ]).toArray((err, docs) => {  
                if(docs.is_delete==null){
                    ResponseHelper.sendResponse(res, 200, docs)
                }    
            })
    },
    create_user_Handler: (req, res, next) => {
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
        data.password = bcrypt.hashSync(data.password, 10) 

        let userObject = new M_user(data)
        db.collection('m_user').find().limit(1).sort({ $natural: -1 }).toArray((err, docs) => {
            /* if(docs[0].code){
             let lastcode= docs[0].code
             let lastnum = lastcode.replace("RO"," ")
             lastnum = parseInt(lastnum)
             lastnum +=1
             let padnum=(lastnum).pad(4)
             let gencode="RO"+padnum
             //userObject.code=gencode
             userObject.code=gencode
            }
            else
            {
             userObject.code="RO0001"
            } */
            db.collection('m_user').insert(userObject, (err, docs) => {
                ResponseHelper.sendResponse(res, 200, docs)
            })
         })

         /* db.collection('m_user').aggregate([
            { $lookup:
               {
                 from: 'm_employee',
                 localField: 'm_employee_id',
                 foreignField: 'employee_number',
                 as: 'employee'
               }               
            },
            { $lookup:
                {
                  from: 'm_role',
                  localField: 'm_role_id',
                  foreignField: 'code',
                  as: 'role'
                }               
            },
            { $lookup:
                {
                  from: 'm_company',
                  localField: 'employee.m_company_id',
                  foreignField: 'name',//harusnya foreignField: 'code'
                  as: 'company'
                }               
            },
              
             { $project : 
                {
                    "_id"	        : "$_id",
                    "username"      : "$username",
                    "firstname"     : "$employee.first_name",
                    "lastname"      : "$employee.last_name",
                    "role"          : "$role.name",
                    "company"       : "$company.name",
                    "created_by"    : "$created_by",
                    "created_date"  : "$created_date",
                    "update_by"     : "$update_by",
                    "update_date"   : "$update_date",
                    "is_delete"     : "is_delete"
                }
            }
            ]) .toArray((err, docs) => {      
                ResponseHelper.sendResponse(res, 200, docs)
            }) */
    },
    updateUserHandler: (req, res, next) => {
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
        data._id = new ObjectID(req.params.userid)
        data.update_date = tgl
        let userObject = new M_user(data)

        console.log("[THIS IS UPDATE ROLE")
        console.log(req.body)
        console.log("\n\n")
        db.collection('m_user').update(
            { _id: userObject._id },

            userObject,
            (err, docs) => {
                ResponseHelper.sendResponse(res, 200, docs)
            })
    },
    deleteUserHandler: (req, res, next) => {
        // deleteUnit: (req, res, next) => {
        let data = new ObjectID(req.params.userid)
        db.collection('m_user').update(
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

module.exports = M_user_Controller