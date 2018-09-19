import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'
import ReasonEvent from './reasonEvent';


const Drop = (props)=>{
    return(
        <option>{props.employe}</option>
    )
}
class ViewEvent extends React.Component {
    constructor (props){
        super(props)
        // let number=this.props.souvenir
        // console.log(number)
        let userdata=JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        this.state={
            formdata:{
                m_employe_id : ''
            },
            employe : []
        }
        this.reasonHandler=this.reasonHandler.bind(this)
        // this.changeHandler=this.changeHandler.bind(this)
    }
    changeHandler= (e) =>{
        let tmp=this.state.formdata
        tmp[e.target.name]=e.target.value
        this.setState({
            formdata:tmp
        })
    }
    
    reasonHandler(){
        this.setState({showReason:true})
    }
    getListEmploye(){
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.EMPLOYEE,
            method: "get",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response)=>{
            this.setState({
                employe: response.data.message
                
            })
            
        })
        .catch((error)=>{
            console.log(error)
        })           
    } componentDidMount(){
        this.getListEmploye()
        
    }
    render(){
        return(
            <Modal isOpen={this.props.view} className={this.props.className}>
                <ModalHeader> View Unit</ModalHeader>
                <ModalBody >
                <form class="form-row">
                    <div class ="input-group col">
                        <div class ="input-group-sm">                
                        <label for="text">*Transaction Code</label>
                        <input type="text" class="form-control" placeholder="" readOnly
                        name="code" value={this.props.event.code} onChange={this.changeHandler} />
                        <label>*Event Name</label>
                        <input type="text" class="form-control" placeholder="Type event name" readOnly
                        name="event_name" value={this.props.event.event_name} onChange={this.changeHandler} required />
                        <label>*Event Place</label>
                        <input type="text" class="form-control" placeholder="Type event place" readOnly
                        name="event_place" value={this.props.event.event_place} onChange={this.changeHandler} required />
                        <label for="date">*Event Start Date</label>
                        <input type="date" class="form-control" placeholder="Select date" readOnly
                        name="start_date" value={this.props.event.start_date} onChange={this.changeHandler} required/>
                        <label for="date">*Event End Date</label>
                        <input type="date" class="form-control" placeholder="Select date" readOnly
                        name="end_date" value={this.props.event.end_date} onChange={this.changeHandler} required/>
                        <label for="budget">*Budget(Rp.)</label>
                        <input type="number" class="form-control" placeholder="10.000.000" 
                        name="budget" value={this.props.event.budget} onChange={this.changeHandler} required/>
                        
                        <label for="assign">*Assign To</label>
                        <select
                            className="custom-select mr-sm"
                            name = "m_employe_id"
                            value = {this.state.formdata.m_employe_id}
                            onChange={this.changeHandler}
                            onClick={this.getListEmploye}>
                            <option selected>-Select Employee-</option>
                            {this.state.employe.map(ele=> {
                                return <Drop
                                 employe ={ele.first_name+" "+ele.last_name}
                                />
                            })}                        
                        </select>
                       </div>
                    </div>
                    
                
                 
                    <div class ="input-group col">
                    <div class ="input-group-sm">
                    <label for="text">*Request By</label>
                        <input type="text" class="form-control" placeholder="Event Name" readOnly
                        name="request_by" value={this.props.event.request_by} onChange={this.changeHandler} required/>                      
                        <label for="date">*Request Date</label>
                        <input type="date" class="form-control" placeholder="" readOnly
                        name="request_date" value={this.props.event.request_date} onChange={this.changeHandler} required/>
                        <label for="date">Note</label>
                        <textarea type="text-area" class="form-control" placeholder="Type note" readOnly
                        name="note" value={this.props.event.note} onChange={this.changeHandler} required/> 
                        <label for="status">Status</label>
                        <input type="text" class="form-control" placeholder="Submitted" readOnly 
                        name="status" value={this.props.event.status} onChange={this.changeHandler} required/>
                        
                    </div>
                </div>   
                   
                </form>
                </ModalBody>
                <ModalFooter>
                <ReasonEvent
                reason = {this.state.showReason}
                />
                    <Button color="primary" onClick={this.props.approvHandler}>Approved</Button>
                    <Button color="danger" onClick={this.reasonHandler}>Rejected</Button>
                    <Button color="warning" onClick={this.props.closeModalHandler}closeModalHandler ={ this.props.closeModalHandler}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default ViewEvent