import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class CreateUnit extends React.Component{
    constructor (props){
        super(props)
        // let number=this.props.unit
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
        // let number=this.state.unit.length
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
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.UNIT,
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
                window.location.reload(alert('Success'))
                console.log(response)
                debugger
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
                <ModalHeader> Add Unit</ModalHeader>
                <ModalBody >
                <form class="form-inline">
                    <div class ="input-group mb-3 input-group-sm">
                    <table>
                    <div>

                    <tr>
                        <td><label for="text">Unit Code</label></td>
                        <td>
                            <input type="text" class="form-control" placeholder="" readOnly
                            name="code" value={this.state.formdata.code} onChange={this.changeHandler} />
                        </td>
                    </tr>

                    <tr>
                        <td ><label for="text">Unit Name </label></td>
                        <td><input type="text" class="form-control" placeholder="Unit Name"
                            name="name" value={this.state.formdata.name} onChange={this.changeHandler} required/>
                        </td>
                    
                    
                    </tr>
                    
                    <tr>
                        <td><label>Description </label></td>
                        <td>
                            <input type="text" class="form-control" placeholder="Description" 
                            name="description" value={this.state.formdata.description} onChange={this.changeHandler} required />
                        </td>
                    </tr>


                    </div>
                    </table>
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
export default CreateUnit