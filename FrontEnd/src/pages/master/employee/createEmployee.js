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

class CreateEmployee extends React.Component{
    constructor (props){
        super(props)
        let userdata=JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        this.state={
            formdata:{
                employee_number :'',
                first_name      :'',
                last_name       : '',
                m_company_id    : '',
                email           :'',
                created_by:userdata.username
            },
            company : []
        }
        
        this.submitHandler=this.submitHandler.bind(this)
        this.changeHandler=this.changeHandler.bind(this)
    }
    changeHandler(e){
        let tmp=this.state.formdata
        tmp[e.target.name]=e.target.value
        this.setState({
            formdata:tmp
        })
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
    }
    submitHandler(){
        let token=localStorage.getItem(apiconfig.LS.TOKEN)
        let option={
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.EMPLOYEE,
            method: "post",
            headers:{
                "Authorization": token,
                "Content-Type" : "application/json"
            },
            data: this.state.formdata
        }
        axios(option)
        .then((response)=>{
            if(response.data.code===200){
                window.location.reload()
                this.props.modalStatus(1,  'Data Saved ! New Employee has been added with employee ID Number '+this.props.employee.employee_number)
                
            } else {
                alert(response.data.message)
            }
        })
        .catch((error)=>{
            console.log(error);            
        })
    }
    render(){
        return(
            <Modal isOpen={this.props.show} className={this.props.className}>
                <ModalHeader> Add Employee</ModalHeader>
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
                                        <option selected>-Select Company Name -</option>
                                        { this.state.company.map(ele =>{
                                            return <Drop
                                                company ={ele.name}
                                                id ={ele.code}
                                            /> 
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
                        <Button color="warning" onClick={this.props.closeHandler}>Cancel</Button>
                    </ModalFooter>
            </Modal>
        )
    }
}
export default CreateEmployee