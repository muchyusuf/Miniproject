import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class EditProduct extends React.Component {
    constructor (props) {
        super(props)
        let userdata=JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        console.log(userdata)
        super(props)
        this.state = {
            formdata: {
                code : '',
                name: '',
                address: '',
                update_by:userdata.username
            }
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps)
        this.setState({
            formdata : newProps.product
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
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.PRODUCT +'/'+ this.state.formdata._id,
            method: "put",
            headers:{
                "Authorization": token,
                "Content-Type" : "application/json"
            },
            data: this.state.formdata
           
        }
        axios(option)
        .then((response) => { 
            // console.log(this.state.formdata)
            if(response.data.code == 200) {
                window.location.reload(alert('Success'))
                this.props.history.push('/dashboard')
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
                <ModalHeader> Edit Product</ModalHeader>
                <ModalBody >
                <form class="form-inline">
                    <div class ="input-group mb-3 input-group-sm">
                        <label for="text"> *Product Code : </label>
                        <input type="text" class="form-control" readOnly
                        name="code" 
                        value={this.state.formdata.code}  
                        onChange={this.changeHandler} />
                    </div>
                </form>
                <form class="form-inline">
                    <div class="input-group mb-3 input-group-sm">
                        <label for="text"> *Product Name : </label>
                        <input type="text" class="form-control" 
                        name="name" 
                        value={this.state.formdata.name} 
                        onChange={this.changeHandler} />
                    </div>
                </form>
                <form>
                    <div class ="input-group mb-3 input-group-sm"> 
                        <label for="text"> Desciption : </label>
                        <textarea padding="5px" type="text" class="form-control"
                        name="description" 
                        value={this.state.formdata.description} 
                        onChange={this.changeHandler}/>
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
export default EditProduct