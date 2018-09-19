const DB = require('../models/db')
const ResponseHelper = require('../helpers/responseHelper')
const ObjectID = require('mongodb').ObjectID
const M_employee = require('../models/M_employee_model')
const db = DB.getConnection()

Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) {
        s = "0" + s;
    }
    return s;
}

const M_employee_Controller = {
    readEmployeeAllHandler: (req, res, next) => { //res=lempar data ke client

        db.collection('m_employee').aggregate([
            { $lookup:
                {
                    from        : 'm_company',
                    localField  : 'm_company_id',
                    foreignField: 'code',
                    as          : 'company'
                }
            },
            { $match: 
                {
                    is_delete 	: null 
                }
            },  
            { $project : 
                {
                    "_id"	            : "$_id",
                    "employee_number"   : "$employee_number",
                    "first_name"        : "$first_name",
                    "last_name"         : "$last_name",
                    "company"           : "$company.name",
                    "email"              : "$email",
                    "is_delete"         : "$id_delete",
                    "created_by"        : "$created_by",
                    "created_date"      : "$created_date",
                    "update_by"         : "$update_by",
                    "update_date"       : "$update_date"
                }
            }
        ]).toArray((err, docs) => {  
            if(docs.is_delete==null){
                ResponseHelper.sendResponse(res, 200, docs)
            }    
        })
        /* db.collection('m_employee').find({
                is_delete: null
            }).sort({
                code: 1
            })
            .toArray((err, docs) => {
                let m_employee =
                    docs.map((ele) => {
                        return new M_employee(ele)
                    })
                ResponseHelper.sendResponse(res, 200, m_employee)
            }) */
    },
    create_employee_Handler: (req, res, next) => {
        let data = req.body
        console.log("[THIS IS POST ROLE]")

        tanggal = new Date()
        let dd = tanggal.getDate()
        let mm = tanggal.getMonth() + 1
        let yyyy = tanggal.getFullYear()
        let tahun = tanggal.getFullYear().toString().substring(2,4)
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }

        let tgl = dd + '/' + mm + '/' + yyyy
        let nip = tahun + '.' + mm + '.' + dd + '.'
        data.created_date = tgl

        let employeeObject = new M_employee(data)
        db.collection('m_employee').find().limit(1).sort({
            $natural: -1
        }).toArray((err, docs) => {
            if (docs.length>0) {
                let lastcode = docs[0].employee_number
                let empNumber = lastcode.substring(0, 9)
                console.log("\n[THIS IS EMP NUMBER")
                console.log(empNumber)
                if (empNumber == nip) {
                    let lastnum = lastcode.substring(9, (lastcode.length))
                    lastnum = parseInt(lastnum)
                    lastnum += 1

                    let padnum = (lastnum).pad(2)
                    let gencode = nip + padnum

                    employeeObject.employee_number = gencode

                } else {
                    employeeObject.employee_number = nip + "01"
                }
            } else {
                employeeObject.employee_number = nip + "01"
            }
            db.collection('m_employee').insert(employeeObject, (err, docs) => {
                ResponseHelper.sendResponse(res, 200, docs)
            })
        })
    },
    updateEmployeeHandler: (req, res, next) => {
        let data = req.body
        tanggal = new Date()
        let dd = tanggal.getDate()
        let mm = tanggal.getMonth() + 1
        let yyyy = tanggal.getFullYear() //.substring(-2) untuk potong 2 depan
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        let tgl = dd + '/' + mm + '/' + yyyy
        data._id = new ObjectID(req.params.employeeid)
        let employeeObject = new M_employee(data)

        console.log("[THIS IS UPDATE ROLE")
        console.log(req.body)
        console.log("\n\n")
        db.collection('m_employee').update({
                _id: employeeObject._id
            },

            employeeObject, {
                $set: {
                    update_date: tgl
                }
            },
            (err, docs) => {
                ResponseHelper.sendResponse(res, 200, docs)
            })
    },
    deleteEmployeeHandler: (req, res, next) => {
        // deleteUnit: (req, res, next) => {
        let data = new ObjectID(req.params.employeeid)
        db.collection('m_employee').update({
                _id: data
            }, {
                $set: {
                    is_delete: true
                }
            },
            (err, docs) => {
                ResponseHelper.sendResponse(res, 200, docs)
            })
    },

}

module.exports = M_employee_Controller