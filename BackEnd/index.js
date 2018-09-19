const restify = require('restify')
const AuthMiddleware = require('./middlewares/authmiddleware')
const DatabaseConnection = require('./models/db')
DatabaseConnection.connect((err, db) => {
    if (err != null) {
        console.log(err)
        process.exit()
    } else {
        console.log('[DATABASE] connected')

        const server = restify.createServer()
        const port = 3000

        // CORS
        const corsMiddleware = require('restify-cors-middleware');
        const cors = corsMiddleware({
            origins: ['*'],
            allowHeaders: ['Authorization']
        });
        server.pre(cors.preflight);
        server.use(cors.actual);

        // Controllers
        const AuthController = require('./controllers/AuthController')
        const AuthMiddleware = require('./middlewares/authmiddleware')

        const CompanyController = require('./controllers/M_company_Controller')
        const EventController = require('./controllers/T_event_Controller')
        const EmployeeController = require('./controllers/M_employee_Controller')
        const RoleController = require('./controllers/M_role_Controller')
        const UserController = require('./controllers/M_user_Controller')
        // const MenuController = require("./controllers/M_menu_Controller") 
        

        server.use(restify.plugins.queryParser());
        server.use(restify.plugins.bodyParser({ mapParams: false }));

        // routes
        server.post('/api/auth/login', AuthController.loginHandler)
        //server.post('/api/auth/forgotpassword', AuthController.forgotPasswordHandler)


        
        server.get('/api/company',AuthMiddleware.checkToken, CompanyController.readCompanyAllHandler)
        server.get('/api/company/:companyid',AuthMiddleware.checkToken, CompanyController.readOneById)
        server.post('/api/company',AuthMiddleware.checkToken, CompanyController.create_company_Handler)
        server.put('/api/company/:companyid',AuthMiddleware.checkToken, CompanyController.updateCompanyHandler)
        server.del('/api/company/:companyid',AuthMiddleware.checkToken, CompanyController.deleteCompanyHandler)

        server.get('/api/employee',AuthMiddleware.checkToken, EmployeeController.readEmployeeAllHandler)
        server.post('/api/employee',AuthMiddleware.checkToken, EmployeeController.create_employee_Handler)
        server.put('/api/employee/:employeeid',AuthMiddleware.checkToken, EmployeeController.updateEmployeeHandler)
        server.del('/api/employee/:employeeid',AuthMiddleware.checkToken, EmployeeController.deleteEmployeeHandler)

        server.get('/api/role',AuthMiddleware.checkToken, RoleController.readRoleAllHandler)
        server.post('/api/role',AuthMiddleware.checkToken, RoleController.create_role_Handler)
        server.put('/api/role/:roleid',AuthMiddleware.checkToken, RoleController.updateRoleHandler)
        server.del('/api/role/:roleid',AuthMiddleware.checkToken, RoleController.deleteRoleHandler)

        server.get('/api/user',AuthMiddleware.checkToken, UserController.readUserAllHandler)
        server.post('/api/user',AuthMiddleware.checkToken, UserController.create_user_Handler)
        server.put('/api/user/:userid',AuthMiddleware.checkToken, UserController.updateUserHandler)
        server.del('/api/user/:userid',AuthMiddleware.checkToken, UserController.deleteUserHandler)

        // server.get('/api/menu', AuthMiddleware.checkToken, MenuController.readMenuAllHandler)
        // server.get('/api/menu/:menuid', AuthMiddleware.checkToken, MenuController.readOneById)
        // server.post('/api/menu', AuthMiddleware.checkToken, MenuController.create_menu_Handler)
        // server.put('/api/menu/:menuid', AuthMiddleware.checkToken, MenuController.updateMenuHandler)
        // server.del('/api/menu/:menuid', AuthMiddleware.checkToken, MenuController.deleteMenuHandler) 
        
        server.get('/api/event',AuthMiddleware.checkToken, EventController.readEventAllHandler)
        server.get('/api/event/:eventid',AuthMiddleware.checkToken, EventController.readOneById)
        server.post('/api/event',AuthMiddleware.checkToken, EventController.create_event_Handler)
        server.put('/api/event/:eventid',AuthMiddleware.checkToken, EventController.updateEventHandler)

        server.listen(port, () => {
            console.log('[SERVER] running at port '+port)
        })
    }
})
