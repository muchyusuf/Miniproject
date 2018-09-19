import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'
import { debug } from 'util';

class EditCompany extends React.Component {
    constructor (props) {
        super(props)
        let userdata=JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        console.log(userdata)
        super(props)
        this.state = {
            formdata:{
                code:'',
                name:'',
                description:'',
                created_by:userdata.username
            },
            noedit:{},
            statusEdit:''
            
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.noeditHandler = this.noeditHandler.bind(this)
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps)
        this.setState({
            formdata : newProps.role,
        })
        debugger

    }

    componentDidMount(){
        if(this.state.formdata){
            this.state.noedit=this.state.formdata
        }
        debugger
    }

    noeditHandler(){
        
        this.props.closeModalHandler(false)
        window.location.reload()
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
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.ROLE +'/'+ this.state.formdata._id,
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
            console.log(this.state.formdata)
            debugger
            if(response.data.code == 200) {
                this.props.closeModalHandler(false)
                window.location.reload(alert('Success!'))
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
                <ModalHeader> Edit Role</ModalHeader>
                <ModalBody >
                <form>
                    <div className="form-row">
                        <div className="form-group col">
                            <label for="text"> *Role Code</label>
                            <input type="text" class="form-control" readOnly
                            name="code" 
                            value={this.state.formdata.code}  
                            onChange={this.changeHandler} />
                        </div>
                        <div className="form-group col">
                            <label for="text"> *Role Name </label>
                            <input type="text" class="form-control" 
                            name="name" 
                            value={this.state.formdata.name} 
                            onChange={this.changeHandler} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <label for="text"> Description </label>
                            <input type="text" class="form-control" 
                            name="description" 
                            value={this.state.formdata.description} 
                            onChange={this.changeHandler} />
                        </div>
                    </div>
                   
                </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick ={this.submitHandler}>Save</Button>
                    {/* <Button color="warning" onClick={this.props.closeModalHandler}>Cancel</Button> */}
                    <Button color="warning" onClick={this.noeditHandler}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default EditCompany