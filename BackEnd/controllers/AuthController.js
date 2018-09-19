const DB = require('../models/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ResponseHelper = require('../helpers/responseHelper')
const authConfig = require('../configs/auth.config.json')
const User = require('../models/usermodel')
const db = DB.getConnection()

const AuthController = {
    loginHandler: (req, res, next) => {
        console.log("\n[THIS IS WHAT WE GET IN LOGIN BACKEND] : ")
        console.log(req.body)
        
        if (!req.body.username || !req.body.password) {
            ResponseHelper.sendResponse(res, 404, 'Please fill the Sign In form.')
        } else {
            db.collection('m_user').findOne({
                username: req.body.username
            }, (err, doc) => {
                if (doc) {
                    /* console.log("\n[THIS IS DOC 1] : ")
                    console.log(doc)
                    console.log("\n[THIS IS WHAT WE GET ] : ")
                    console.log(req.body) */
                    if (bcrypt.compareSync(req.body.password, doc.password)) {
                        let token = jwt.sign(doc, authConfig.secretkey)

                        /* console.log("\n[THIS IS DOC 2] : ")
                        console.log(doc)
                        console.log("\n[THIS IS TOKEN]")
                        console.log(token) */

                        delete doc.password

                        /* console.log("\n[THIS IS DOC 3] : ")
                        console.log(doc)
                        console.log("\n") */
                        
                        let data = {
                            userdata: doc,
                            token: token
                        }
                        debugger
                        ResponseHelper.sendResponse(res, 200, data)
                    } else {
                        ResponseHelper.sendResponse(res, 404, 'The password you entered did not match your username.')
                    }
                } else {
                    ResponseHelper.sendResponse(res, 404, 'The username and password you entered did not match our records.')
                }   
            })
        }
    }
}
module.exports = AuthController
