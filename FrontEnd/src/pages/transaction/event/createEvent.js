import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class CreateEvent extends React.Component{
    constructor (props){
        super(props)
        // let number=this.props.company
        // console.log(number)
        let userdata=JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        this.state={
            formdata:{
                code:'',
                event_name:'',
                event_place:'',
                start_date:'',
                end_date:'',
                budget:'',
                note:'',
                request_by:userdata.username,
                created_date:'',
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
        alert(apiconfig.BASE_URL+apiconfig.ENDPOINTS.EVENT)
        let token=localStorage.getItem(apiconfig.LS.TOKEN)
        let option={
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.EVENT,
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
                this.props.history.push('/event')                
            // this.props.modalStatus(1,'Data '+''+this.props.event.code+'has been deleted')
            } else {
                alert(response.data.message)
            }
        })

        .catch((error)=>{
            // alert('Not Success')   
        })
    }
    render(){
        
        return(
            
            <Modal isOpen={this.props.show} className={this.props.className}>
                <ModalHeader> Add Event Request</ModalHeader>
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
                        <label for="date">Note</label>
                        <textarea type="text-area" class="form-control" placeholder="Type note" 
                        name="note" value={this.state.formdata.note} onChange={this.changeHandler} required/>
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
export default CreateEvent