const jwt = require('jsonwebtoken')
const authconfig = require('../configs/auth.config.json')
const ResponseHelper = require('../helpers/responseHelper')
module.exports = {
    checkToken: (req, res, next) => {
        console.log("THIS IS MIDLEWARE")
        console.log(req)
        if (!req.headers.authorization) {
            ResponseHelper.sendResponse(res, 403, 'You are not authorized')
        } else {
            let token = req.headers.authorization
            jwt.verify(token, authconfig.secretkey, (err, decoded) => {
                if (decoded == undefined) {
                    ResponseHelper.sendResponse(res, 403, 'You are not authorized')
                } else {
                    
                    req.userdata = decoded
                    next()
                }
            })
        }
    }
}
