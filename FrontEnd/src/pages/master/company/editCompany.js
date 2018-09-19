import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class EditCompany extends React.Component {
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
            formdata : newProps.company
        })
    }

    changeHandler(e) {
        let tmp = this.state.formdata
        tmp[e.target.name]=e.target.value
        this.setState({
            formdata:tmp
        })
debugger
    }

    submitHandler() {
    if(this.state.formdata.name !== "" && 
    this.state.formdata.email !== ""  && 
    this.state.formdata.phone !== "" && 
    this.state.formdata.address !== ""){
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.COMPANY +'/'+ this.state.formdata._id,
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
               window.location.reload(this.props.modalStatus(1,"Data Updated"))
                this.props.history.push('/dashboard')
            } else {
                alert(response.data.message)
            }
        })
        .catch((error) => {
            console.log(error);            
        })
    }
}

    render(){
        // console.log(this.state.formdata)
        return(
            <Modal isOpen={this.props.edit} className={this.props.className}>
                <ModalHeader> Edit Company</ModalHeader>
                <form>
                <ModalBody >
               
                 <div className="form-row">
                    <div className="form-group col">
                        <label for="text">Company Code</label>
                        <input
                        type="text"
                        class="form-control"
                        placeholder=""
                        readOnly
                        name="code"
                        value={this.state.formdata.code}
                        onChange={this.changeHandler}
                        />
                    </div>

                    <div className="form-group col">
                        <label for="text">Company Name</label>
                        <input
                        type="text"
                        class="form-control"
                        placeholder="Company Name"
                        name="name"
                        value={this.state.formdata.name}
                        onChange={this.changeHandler}
                        required
                        />
                    </div>
            </div>

            <div className="form-row">
              <div className="form-group col">
                <label for = "text">Email</label>
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  id = "email"
                  value={this.state.formdata.email}
                  onChange={this.changeHandler}
                  required
                />
                <label>phone</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="phone"
                  name="phone"
                  value={this.state.formdata.phone}
                  onChange={this.changeHandler}
                  required
                />
              </div>
              <div className="form-group col">
                <label for="text">address</label>
                <textarea
                  rows="4"
                  type="text-area"
                  class="form-control"
                  placeholder="address"
                  name="address"
                  value={this.state.formdata.address}
                  onChange={this.changeHandler}
                  required
                />
              </div>
            </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick ={this.submitHandler}type="submit">Save</Button>
                    <Button color="warning" onClick={this.props.closeModalHandler}>Cancel</Button>
                </ModalFooter>
                
          </form>
            </Modal>
        )
    }
}
export default EditCompany