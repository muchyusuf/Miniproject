const DB = require('../models/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ResponseHelper = require('../helpers/responseHelper')
const authConfig = require('../configs/auth.config.json')
const User = require('../models/usermodel')
const MiscHelper = require('../helpers/miscHelper')
const ObjectID = require('mongodb').ObjectID
const M_event = require('../models/T_event_model')
const db = DB.getConnection()
let createcode = []
createcode = MiscHelper.createCode()
const M_event_Controller = {
    readEventAllHandler: (req, res, next) => { //res=lempar data ke client
        db.collection('t_event').find({is_delete:null}).sort({code:1})
        .toArray((err, docs)=>{
            let t_event = 
            docs.map((ele) => {
                return new M_event(ele)
            })
            ResponseHelper.sendResponse(res, 200, t_event)
        })
    },
    readOneById:(req,res,next)=>{
        // console.log(req.params.companyid)
        db.collection('t_event').findOne({
            _id:new ObjectID(req.params.eventid)
            // db.collection('t_event').find().limit(1).sort({$natural:-1})
        },(err,doc)=>{
            ResponseHelper.sendResponse(res, 200, new M_event(doc))
        })
    },
    create_event_Handler: (req, res, next) => {
        let data=req.body //req=ngambil data dr client
        // data.code = MiscHelper.createCode()  // membuat kode random
        tanggal = new Date()
        let dd = ('0'+(tanggal.getDate())).slice(-2)
        let mm = ('0'+(tanggal.getMonth() + 1)).slice(-2)
        let yyyy = tanggal.getFullYear() 
        let tahun = tanggal.getFullYear().toString().substring(2,4)
        
        let tgl = dd+'/'+mm+'/'+yyyy
        let nip = "TRWOEV"+dd +mm+tahun      


        data.created_date = tgl
        data.request_date = tgl
        data.code = createcode 
        console.log(createcode)
        let eventObject = new M_event(data)
        db.collection('t_event').find().limit(1).sort({ $natural: -1 }).toArray((err, docs) => {   
        let eventObject=new M_event(data)
        if(docs.length>0){
            let lastcode= docs[0].code
            let evtNumber = lastcode.substring(0,12)
                if(evtNumber == nip){
                    let lastnum = lastcode.substring(13,(lastcode.length))
                    // lastnum = lastcode.replace("TRWOEV"," ")
                    lastnum = parseInt(lastnum)
                    lastnum +=1
                            
                    let padnum=(lastnum).pad(4)
                    let gencode=nip+padnum
                    eventObject.code = gencode
                }else {
                    eventObject.code = nip+"0001"
                }
           }
           else
           {
            eventObject.code=nip+"0001"
           }
            db.collection('t_event').insert(eventObject,(err, docs)=>{
                ResponseHelper.sendResponse(res, 200, docs)
            })
        })
    },
    updateEventHandler: (req, res, next) =>{
        let data=req.body
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
        
        let tgl = dd+'/'+mm+'/'+yyyy
        data._id= new ObjectID (req.params.eventid)
        let eventObject=new M_event (data)
        db.collection('t_event').update(
            {_id:eventObject._id},            
            eventObject, 
            {$set:{
                update_date : tgl
            }},
            (err, docs)=>{
                ResponseHelper.sendResponse(res, 200, docs)
        })
    },
    // deleteEventHandler: (req, res, next) =>{
    //     // deleteUnit: (req, res, next) => {
    //         let data = new ObjectID(req.params.eventid)
    //         db.collection('t_event').update(
    //             {_id: data},
    //             {$set:{
    //                 is_delete: true
    //             }},
    //             (err, docs) => {
    //                 ResponseHelper.sendResponse(res, 200, docs)
    //             })    
        // }
        // let data = new ObjectID (req.params.companyid)
        // db.collection('t_event').update({_id: data},
        //     {$set :{is_delete:true}}, (err,docs)=>{
        //         ResponseHelper.sendResponse(res,200,docs)
        //     }
        // )
    // },
    generateCode:(req, res, next) => { //res=lempar data ke client
        let data = req.body
        let companyObject=new M_event (data)
        db.collection('m_company').find({}).limit(1).sort({code:-1})
        .toArray((err, docs)=>{
            let t_event = 
            docs.map((ele) => {
                return new T_event(ele)
            })
            ResponseHelper.sendResponse(res, 200, t_event)
        })
    }
}

module.exports = M_event_Controller