import React from 'react'
import API from '../helpers/API'
import config from '../configs/api.config.json'
import { Alert } from 'reactstrap'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formdata: {
                username: '',
                password: ''
            },
            isRequest: false,
            /* loginStatus : sessionStorage.getItem(loginStatus.status),
            loginMassage: sessionStorage.getItem(loginStatus.message) */
        }
        this.onSignIn = this.onSignIn.bind(this)
        this.textChanged = this.textChanged.bind(this)
        
    }
    textChanged(e) {
        let tmp = this.state.formdata
        tmp[e.target.name] = e.target.value
        this.setState({
            formdata: tmp
        })
        //delete localStorage.loginStatus
    }
    async onSignIn() {
        this.setState({
            isRequest: true
        })
        //debugger
        let result = await API.login(this.state.formdata.username, this.state.formdata.password)
        //alert(result)
        console.log(result)
        if (result.code === 200) {
            localStorage.setItem(config.LS.USERDATA, JSON.stringify(result.message.userdata))
            localStorage.setItem(config.LS.TOKEN, result.message.token)
            debugger
            this.props.history.push('/dashboard')
            delete localStorage.loginStatus
        } else {
            //alert(result.message)
            localStorage.message= result.message
            delete localStorage.loginStatus
        }

        this.setState({
            isRequest: false
        })
    }

    componentDidMount(){
        if(localStorage.getItem(config.LS.TOKEN)){
            //this.props.history.goBack()
            this.props.history.push('/dashboard')
            
        }
        
    }

    render() {
        return (
            <div>
            <form className="form-signin">
                <div className="text-center">
                    <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
                    { /* (this.state.loginStatus == 1) ? <Alert color ="success"> {this.state.loginMassage} </Alert>:'' */ }
                    { (localStorage.loginStatus) ? <Alert color ="danger" > Please Sign In first.</Alert>:''}
                    { (localStorage.message) ? <Alert color ="danger" > {localStorage.message} </Alert>:''}
                </div>
                    
                    
                    {/* <label for="inputEmail" style={{marginTop : '5px', marginBottom : '3px'}}>Username</label> */}
                    <input type="text" className="form-control" placeholder="Username" name="username" required="" autofocus="" value={this.state.username} onChange={this.textChanged}
                        style={{ marginTop : '20px', marginBottom : '10px', padding : "7 12 7 12", borderRadius : 5}}
                    />
                    <input type="password" className="form-control" placeholder="Password" name="password" required="" value={this.state.password} onChange={this.textChanged} 
                        style={{ marginBottom : '30px', padding : "7 12 7 12", borderRadius : 5}}
                    />
                    <button className="btn btn-lg btn-primary btn-block" disabled={this.state.isRequest} type="button" onClick={this.onSignIn}
                        style={{ borderRadius : 25}}
                    >Sign in</button>
                    {/* <p className="mt-5 mb-3 text-muted">© 2017-2018</p> */}
            </form>
                
                    <div style={{position: "absolute", bottom: "1px", left: "46.7%"}}>
                        <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
                    </div>
                
            </div>
        )
    }
}

export default Login
