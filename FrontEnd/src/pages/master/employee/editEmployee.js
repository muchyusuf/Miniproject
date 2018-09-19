import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

const Drop=(props)=>{
    
    return(
       <option value={props.id}>{props.company}</option>
   )
   debugger
}

class EditEmployee extends React.Component {
    constructor (props) {
        super(props)
        let userdata=JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        console.log(userdata)
        super(props)
        this.state = {
            formdata: {
                employee_number : '',
                first_name      : '',
                last_name       : '',
                m_company_id    : '',
                email           : '',
                update_by       :userdata.username
            },
            company : []
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.getListCompany = this.getListCompany.bind(this)
    }

    getListCompany() {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.COMPANY,
            method: "get",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response)=>{
            this.setState({
                company: response.data.message

        
            })
            debugger
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    componentDidMount(){
        this.getListCompany()
        debugger
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps)
        this.setState({
            formdata : newProps.employee
        })
    }

    changeHandler(e) {
        let tmp = this.state.formdata
        tmp[e.target.name]=e.target.value
        this.setState({
            formdata:tmp
        })
    }

    submitHandler() {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.EMPLOYEE +'/'+ this.state.formdata._id,
            method: "put",
            headers:{
                "Authorization": token,
                "Content-Type" : "application/json"
            },
            data: this.state.formdata
           
        }
        axios(option)
        .then((response) => { 
            if(response.data.code == 200) {
                window.location.reload()
                this.props.modalStatus(1,  'Data Updated ! Data Employee has been updated')
            } else {
                alert(response.data.message)
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
                <ModalHeader> Edit Employee - {this.props.employee.first_name} {this.props.employee.last_name} ({this.props.employee.employee_number})</ModalHeader>
                <ModalBody >
                <form>
                        <div class ="form-row">
                            <div className ="form-group col">
                                <label for="text">Emp ID Number</label>
                                    <input type="text" 
                                    class="form-control" 
                                    placeholder="" readOnly
                                    name="employee_number" 
                                    value={this.state.formdata.employee_number} 
                                    onChange={this.changeHandler} />
                                
                                <label>First Name</label>
                                    <input type="text" 
                                        class="form-control" 
                                        placeholder="Type First Name" 
                                        name="first_name" 
                                        value={this.state.formdata.first_name} 
                                        onChange={this.changeHandler} 
                                    required />

                                <label>Last Name</label>
                                    <input type="text" class="form-control" 
                                        placeholder="Type Last Name" 
                                        name="last_name" 
                                        value={this.state.formdata.last_name}
                                        onChange={this.changeHandler} 
                                    required/>

                            </div>

                            <div className ="form-groupcol">
                                <label for="text">Company Name</label>
                                    <select
                                        className="custom-select mr-sm"
                                        name="m_company_id"
                                        value={this.state.formdata.m_company_id}
                                         onChange={this.changeHandler}
                                        onClick={this.getListCompany}>
                                        { this.state.company.map(ele =>{
                                            return this.props.employee.company==ele.name? 
                                                <option selected value={ele.code}>{ele.name}</option> : 
                                                <option value={ele.code}>{ele.name}</option>
                                        })}
                                    </select>

                                <label for="text">Email</label>
                                    <input type="email" 
                                        class="form-control" 
                                        placeholder="Type Email" 
                                        name="email" value={this.state.formdata.email}
                                        onChange={this.changeHandler}
                                        required/>
                                    
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick ={this.submitHandler}>Save</Button>
                    <Button color="warning" onClick={this.props.closeModalHandler}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default EditEmployee