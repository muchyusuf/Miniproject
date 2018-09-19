import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class CreateCompany extends React.Component{
    constructor (props){
        super(props)
        // let number=this.props.company
        // console.log(number)
        let userdata=JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        this.state={
            formdata:{
                code:'',
                name:'',
                email:'',
                address:'',
                phone:'',
                created_by:userdata.username
            }
        }
        // let number=this.state.company.length
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
    submitHandler(){
        let token=localStorage.getItem(apiconfig.LS.TOKEN)
        let option={
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.COMPANY,
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
                alert('Success')
                // console.log(response)
                this.props.history.push('/dashboard')
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
                <ModalHeader> Add Company</ModalHeader>
                <ModalBody >
                <form class="form-inline">
                <div class ="input-group mb-3 input-group-sm">
                    <label for="text">Company Code</label>
                    <input type="text" class="form-control" placeholder="" readOnly
                    name="code" value={this.state.formdata.code} onChange={this.changeHandler} />
                    <label for="text">Company Name</label>
                    <input type="text" class="form-control" placeholder="Company Name" 
                    name="name" value={this.state.formdata.name} onChange={this.changeHandler} required/>
                     </div>
                    </form>
                    <form class="form-inline">
                    <div class ="input-group mb-3 input-group-sm">
                    <label>Email</label>
                    <input type="text" class="form-control" placeholder="em@il" 
                    name="email" value={this.state.formdata.email} onChange={this.changeHandler} required />
                    <label for="text">address</label>
                    <textarea type="text-area" class="form-control" placeholder="address" 
                    name="address" value={this.state.formdata.address} onChange={this.changeHandler} required/>
                   
                   </div>
                   <form class="form-inline">
                    <div class ="input-group mb-3 input-group-sm">
                    <label>phone</label>
                    <input type="text" class="form-control" placeholder="phone" 
                    name="phone" value={this.state.formdata.phone} onChange={this.changeHandler} required/>
                   
                       </div>
                       </form>
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
export default CreateCompany