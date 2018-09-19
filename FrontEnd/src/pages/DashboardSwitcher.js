import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ListCompany from './master/company/listCompany';
import ListMenu from './master/menu/listMenu';
import ListProduct from './master/product/listProduct';
import ListUnit from './master/unit/listUnit';
import ListEmployee from './master/employee/listEmployee';
import ListRole from './master/role/listRole' 
import apiconfig from '../configs/api.config.json'
import Redirect from 'react-router-dom/Redirect';
import ListUser from './master/user/listUser';
import ListEvent from './transaction/event/listEvent';

const DashboardSwitcher = () => {
    return (
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <Switch>
                {/* <Route exact path="/dashboard" component={Listcompany}/> */}
                {/* <Route path="/employee" component={Listemployee}/> */}
                <PrivateRoute path="/dashboard" component={ListCompany}/>
                <PrivateRoute path="/employee" component={ListEmployee}/>
                <PrivateRoute path="/menu" component={ListMenu}/>
                <PrivateRoute path="/product" component={ListProduct}/>
                <PrivateRoute path="/role" component={ListRole}/>
                <PrivateRoute path="/unit" component={ListUnit}/>
                <PrivateRoute path="/user" component={ListUser}/>
                <PrivateRoute path="/event" component={ListEvent}/>
            </Switch>
        </main>
    )
}

const PrivateRoute = ({ component : Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem(apiconfig.LS.TOKEN)!=null? (
                <Component {...props} />
            ):( localStorage.loginStatus = 2 &&
                <Redirect
                    to={
                        {pathname: "/",
                        state: { from: props.location}
                        }
                    }
                />
            )
        }
    />
);

export default DashboardSwitcher
