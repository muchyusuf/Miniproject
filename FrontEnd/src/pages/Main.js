import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Login'
import Dashboard from './Dashboard'

const Main = () => {
    return (
        <main>
            <Switch>
                <Route exact path='/' component={Login} />
                <Dashboard> 
                    <Route path='/dashboard' component={Dashboard} />
                </Dashboard> 
            </Switch>
        </main>
    )
}

export default Main
