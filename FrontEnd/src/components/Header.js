import React from 'react'
import {Link} from 'react-router-dom'
import apiconfig from '../configs/api.config.json'

class Sidebar extends React.Component {
    constructor(props){
        super(props)
        this.clearCache=this.clearCache.bind(this)
        let userdata=JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        this.state={
            username:userdata.username,
            name : userdata.firstname+" "+userdata.lastname
        }
    }

    clearCache(){
        localStorage.clear();
    }

    render() {
        return (
            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Welcom back {this.state.username}.</a>
                {/* <div style={{"color":"white"}}></div> */}
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <Link className="nav-link" to="/"  onClick={this.clearCache} >Sign out</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Sidebar
