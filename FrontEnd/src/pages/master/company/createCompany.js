import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class CreateCompany extends React.Component{
    constructor (props){
        super(props)
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
        this.submitHandler=this.submitHandler.bind(this)
        // this.changeHandler=this.changeHandler.bind(this)
    }
    
    changeHandler= (e) =>{
        let tmp=this.state.formdata
        tmp[e.target.name]=e.target.value
        this.setState({
            formdata:tmp
        })
    }
    submitHandler(){
        let dataSama = false;
        if(this.state.formdata.name !== "" && 
           this.state.formdata.email !== ""  && 
           this.state.formdata.phone !== ""){
               {this.props.company.map(ele => {
                   if(ele.company.email == this.state.formdata.email){
                        dataSama = true;
                   }
               })
            }
            debugger
            if(dataSama == false){
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
                            this.props.modalStatus(1,"Data" + ''+ this.props.company.code +''+"has been saved" )
                            // window.location.reload(alert('Data saved!'))
                            this.props.history.push('/dashboard')
                        } else {
                            alert(response.data.message)
                        }
                    })
                    .catch((error)=>{
                        console.log(error);            
                    })
            }else if(dataSama == true){
                alert('Email sudah Ad ')
            }

        }
    }
    render(){
        return(
            
            <Modal isOpen={this.props.show} className={this.props.className}>
                <ModalHeader> Add Company</ModalHeader>
                <form>
                <ModalBody >
                 <div className="form-group row">
                        <label for="text" className="col-sm-3 col-form-label">Company Code
                        </label>
                        <div className="col">
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
                 </div>

                    <div className="form-group row">
                        <label for="text" className="col-sm-3 col-form-label" >Company Name</label>
                        <div className="col">
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

            <div className="form-group row">
                <label for="text" className="col-sm-3 col-form-label">Email</label>
                <div className="col">
                <input
                  type="email"
                  class="form-control"
                  placeholder="email"
                  name="email"
                  id="email"
                  value={this.state.formdata.email}
                  onChange={this.changeHandler}
                  required
                />
                </div>
                </div>
            <div className="form-group row">
                <label for="number" className="col-sm-3 col-form-label" >phone</label>
                <div className="col">
                <input
                  type="number"
                  class="form-control"
                  placeholder="phone"
                  name="phone"
                  value={this.state.formdata.phone}
                  onChange={this.changeHandler}
                  required
                />
              </div>
              </div>

              <div className="form-group row">
                <label for="text" className="col-sm-3 col-form-label">address</label>
                <div className="col">
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
                    <Button color="warning" onClick={this.props.closeHandler}>Cancel</Button>
                </ModalFooter>
          </form>
        </Modal>
        )
    }
}
export default CreateCompany