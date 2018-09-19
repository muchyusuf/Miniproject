import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class CreateRole extends React.Component{
    constructor (props){
        super(props)
        // let number=this.props.company
        // console.log(number)
        let userdata=JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        this.state={
            formdata:{
                code:'',
                name:'',
                description:'',
                created_by:userdata.username
            }
        }
        // let number=this.state.company.length
        this.submitHandler=this.submitHandler.bind(this)
        this.changeHandler=this.changeHandler.bind(this)
        this.closeCreate=this.closeCreate.bind(this)
    }
    closeCreate(){
        this.props.closeHandler(false)
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
        debugger
        let option={
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.ROLE,
            method: "post",
            headers:{
                "Authorization": token,
                "Content-Type" : "application/json"
            },
            data: this.state.formdata
        }
        debugger
        axios(option)
        .then((response)=>{
            debugger
            if(response.data.code===200){
                this.props.closeHandler(false)
                
                // console.log(response)
                //this.props.history.push('/role')
                
                window.location.reload(alert('Success'))
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
                <ModalHeader> Add Role</ModalHeader>
                <ModalBody >
                <form>
                    <div className="form-row">
                        <div className="form-group col">
                            <label for="text">*Role Code</label>
                            <input
                            type="text"
                            class="form-control"
                            placeholder="Auto Generated"
                            readOnly
                            name="code"
                            value={this.state.formdata.code}
                            onChange={this.changeHandler}
                            />
                        </div>

                        <div className="form-group col">
                            <label for="text">*Role Name</label>
                            <input
                            type="text"
                            class="form-control"
                            placeholder="Type Role Name"
                            name="name"
                            value={this.state.formdata.name}
                            onChange={this.changeHandler}
                            required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <label for="text">Deskripsi</label>
                            <input
                            type="text"
                            class="form-control"
                            placeholder="Type Deskription"
                            name="description"
                            value={this.state.formdata.description}
                            onChange={this.changeHandler}
                            required
                            />
                        </div>
                        
                    </div>
                    

                </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick ={this.submitHandler}>Save</Button>
                    <Button color="warning" onClick={this.closeCreate}>Cancel</Button>
                </ModalFooter>
        </Modal>
        )
    }
}
export default CreateRole