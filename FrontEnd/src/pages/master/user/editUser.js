import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'



class EditUser extends React.Component {
    constructor (props) {
        super(props)
        
        this.state={
            formdata:{
                username:'',
                password:'',
                m_role_id:'',
                m_employee_id:''
            },
            role:[],
            employee:[],
            repassword: '',
            passStatus: '',
            passValid: false
        }
        // let number=this.state.user.length
        this.submitHandler=this.submitHandler.bind(this)
        this.changeHandler=this.changeHandler.bind(this)
        this.getListEmployee=this.getListEmployee.bind(this)
        this.getListRole=this.getListRole.bind(this)
        this.confirmPassword=this.confirmPassword.bind(this)
        this.noeditHandler=this.noeditHandler.bind(this)
    }

    getListRole() {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.ROLE,
            method: "get",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response)=>{
            this.setState({
                role: response.data.message

        
            })
            //debugger
        })
        .catch((error)=>{
            console.log(error)
        })
        
    }
    getListEmployee() {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.EMPLOYEE,
            method: "get",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response)=>{
            this.setState({
                employee: response.data.message

                
            })
            //debugger
            
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    componentDidMount(){
        this.getListRole()
        this.getListEmployee()
        
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps)
        this.setState({
            formdata : newProps.user
        })
    }

    changeHandler(e) {
        let tmp = this.state.formdata
        tmp[e.target.name]=e.target.value
        this.setState({
            formdata:tmp
        })
    }

    confirmPassword(e){
        let pass=this.state
        pass.repassword=e.target.value
        this.setState({
            repassword:pass.repassword
        })

        let tmp=this.state.formdata
        if(pass.repassword){
            if(pass.repassword==tmp.password){
                this.setState({
                    passStatus: "Password match.",
                    passValid: true
                })
            }else{
                this.setState({
                    passStatus: "Password not match.",
                    passValid: false
                })
            }
        }else{
            this.setState({
                passStatus: "",
                passValid: false
            })
        }
        
    }

    noeditHandler(){
        
        this.props.closeModalHandler(false)
        window.location.reload()
    }

    submitHandler() {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.USER +'/'+ this.state.formdata._id,
            method: "put",
            headers:{
                "Authorization": token,
                "Content-Type" : "application/json"
            },
            data: this.state.formdata
           
        }
        let userdata=JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        option.data.update_by=userdata.username
        debugger
        axios(option)
        .then((response) => { 
            // console.log(this.state.formdata)
            if(response.data.code == 200) {
                this.props.closeModalHandler(false)
                window.location.reload(alert('Success'))
            } else {
                this.props.closeModalHandler(false)
                window.location.reload(alert(response.data.message))
            }
        })
        .catch((error) => {
            console.log(error);            
        })
    }

    render(){
        // console.log(this.state.formdata)
        return(
            <Modal isOpen={this.props.edit} className={this.props.className}>
                <ModalHeader> Edit User</ModalHeader>
                <ModalBody >
                <form>
                <div className="form-row">
                    <div className="form-group col">
                        <label for="text">*Role Name</label>
                        <select
                            className="custom-select mr-sm"
                            name="m_role_id"
                            value={this.state.formdata.m_role_id}
                            onChange={this.changeHandler}
                            /* onClick={this.getListCompany} */
                        >   
                            {this.state.role.map(ele =>{
                                return this.props.user.role==ele.name? 
                                <option selected value={ele.code}>{ele.name}</option> : 
                                <option value={ele.code}>{ele.name}</option>
                            })}
                        </select>

                        <label for="text">*Employee Name</label>
                        <select
                            className="custom-select mr-sm"
                            name="m_employee_id"
                            value={this.state.formdata.m_employee_id}
                            onChange={this.changeHandler}
                            /* onClick={this.getListCompany} */
                        >  
                            {this.state.employee.map(ele =>{
                                return this.props.user.firstname+" "+this.props.user.lastname==ele.first_name+" "+ele.last_name? 
                                <option selected value={ele.employee_number}>{ele.first_name+" "+ele.last_name}</option> : 
                                <option value={ele.employee_number}>{ele.first_name+" "+ele.last_name}</option>
                            })}
                        </select>
                    </div>

                    <div className="form-group col">
                        <label for="text">*Username</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Type Username"
                            name="username"
                            value={this.state.formdata.username}
                            onChange={this.changeHandler}
                            required
                            autoFocus
                        />
                        
                        <label for="text">*Password</label>
                        <input
                            type="password"
                            class="form-control"
                            placeholder="Type Password"
                            name="password"
                            value={this.state.formdata.password}
                            onChange={this.changeHandler}
                            required
                        />

                        <label for="text">*Re-type Password</label>
                        <input
                            type="password"
                            class="form-control"
                            placeholder="Re-type Password"
                            name="repassword"
                            value={this.state.repassword}
                            onChange={this.confirmPassword}
                            required
                        />
                        <span
                            style={this.state.passValid==true?{"color":"green"}:{"color":"red"}}>{this.state.passStatus}
                        </span>
                    </div>
                </div>
                </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick ={this.submitHandler}>Save</Button>
                    <Button color="warning" onClick={this.noeditHandler}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default EditUser