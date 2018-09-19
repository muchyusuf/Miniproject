import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class EditEvent extends React.Component {
    constructor (props) {
        super(props)
        let userdata=JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        console.log(userdata)
        super(props)
        this.state = {
            formdata: {

            }
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps)
        this.setState({
            formdata : newProps.event
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
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.EVENT +'/'+ this.state.formdata._id,
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
                <ModalHeader> Edit Event</ModalHeader>
                <ModalBody >
                <form class="form-row">
                    <div class ="input-group col">
                        <div class ="input-group-sm">                
                        <label for="text">*Transaction Code</label>
                        <input type="text" class="form-control" placeholder="" readOnly
                        name="code" value={this.state.formdata.code} onChange={this.changeHandler} />
                        <label>*Event Name</label>
                        <input type="text" class="form-control" placeholder="Type event name" 
                        name="event_name" value={this.state.formdata.event_name} onChange={this.changeHandler} required />
                        <label>*Event Place</label>
                        <input type="text" class="form-control" placeholder="Type event place" 
                        name="event_place" value={this.state.formdata.event_place} onChange={this.changeHandler} required />
                        <label for="date">*Event Start Date</label>
                        <input type="date" class="form-control" placeholder="Select date" 
                        name="start_date" value={this.state.formdata.start_date} onChange={this.changeHandler} required/>
                        <label for="date">*Event End Date</label>
                        <input type="date" class="form-control" placeholder="Select date" 
                        name="end_date" value={this.state.formdata.end_date} onChange={this.changeHandler} required/>
                        <label for="budget">*Budget(Rp.)</label>
                        <input type="number" class="form-control" placeholder="10.000.000" 
                        name="budget" value={this.state.formdata.budget} onChange={this.changeHandler} required/>
                        </div>
                    </div>
                    
                
                 
                    <div class ="input-group col">
                        <div class ="input-group-sm">
                            <label for="text">*Request By</label>
                            <input type="text" class="form-control" placeholder="Event Name" readOnly
                            name="request_by" value={this.state.formdata.request_by} onChange={this.changeHandler} required/>                      
                            <label for="date">*Request Date</label>
                            <input type="date" class="form-control" placeholder="" readOnly
                            name="request_date" value={this.state.formdata.request_date} onChange={this.changeHandler} required/>
                            <label for="note">Note</label>
                            <textarea type="text-area" class="form-control" placeholder="Type note" 
                            name="note" value={this.state.formdata.note} onChange={this.changeHandler} required/>
                            <label for="status">Status</label>
                            <input type="text" class="form-control" placeholder="Submitted" readOnly 
                            name="status" value={this.state.formdata.status} onChange={this.changeHandler} required/>
                        </div>
                    </div>   
                   
                </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick ={this.submitHandler}>Update</Button>
                    <Button color="warning" onClick={this.props.closeModalHandler}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default EditEvent