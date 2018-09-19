import React from 'react'
import API from '../../../helpers/API';
import apiconfig from '../../../configs/api.config.json'
import axios from 'axios';
import { Link } from 'react-router-dom'
import EditEvent from './editEvent';
import CreateEvent from './createEvent';
import { Alert } from 'reactstrap'
import ViewEvent from './viewEvent'
import ReasonEvent from './reasonEvent';


const SingleSouvRow=(props)=>{
    
    // console.log(this.state.event.length)
    // for(n<this.state.event.length;n++)
     return(
        <tr>
            <td>{props.no}</td>
            <td>{props.code}</td>
            <td>{props.request_by}</td>            
            <td>{props.request_date}</td>            
            <td>{props.status}</td>
            <td>{props.created_date}</td>
            <td>{props.created_by}</td>
            <td>
                <Link to='#'>
                <span onClick = {() => {props.viewModalHandler(props._id)}} className="fa fa-search" style={{fontSize : '18px', paddingRight : '30px'}} />    
                
                <span onClick = {() => {props.editModalHandler(props._id)}} class="fa fa-edit" style={{fontSize : '18px', paddingRight : '30px'}} />            
                 
                </Link>
            </td>
        </tr>
    )
}

class ListEvent extends React.Component {
    constructor(props){
        var angka =1;
        super(props)
        this.state={
            formdata:{
                approved_by : ''
            
            },
            showCreateEvent:false,
            event:[],
            currentEvent: {},
            alertData: {
                status: 0,
                message: ''
            }
            // unit:[]
        }
        this.showHandler=this.showHandler.bind(this)
        this.submitHandler=this.submitHandler.bind(this)
        this.changeHandler=this.changeHandler.bind(this)
        this.closeModalHandler = this.closeModalHandler.bind(this)
        this.closeHandler=this.closeHandler.bind(this)
        this.viewModalHandler = this.viewModalHandler.bind(this)
        this.editModalHandler = this.editModalHandler.bind(this)
        this.modalStatus = this.modalStatus.bind(this)
    }

    deleteModalHandler(eventid) {
        let tmp = {}
        this.state.event.map((ele) => {
            if (eventid == ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentEvent : tmp,
            deleteEvent : true
        })
    }


    viewModalHandler(eventid) {
        let tmp = {}
        this.state.event.map((ele) => {
            if (eventid == ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentEvent : tmp,
            viewEvent : true
        })
    }

    editModalHandler(eventid) {
        let tmp = {}
        this.state.event.map((ele) => {
            if (eventid == ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentEvent : tmp,
            editEvent : true
        })
        debugger
    }

    closeModalHandler() {
        this.setState({
            viewEvent : false,
            editEvent : false
        })
    }

    showHandler(){
        this.setState({showCreateEvent:true})
    }

    closeHandler(){
        this.setState({showCreateEvent:false})
    }

    changeHandler(e){
        let tmp=this.state.formdata
        tmp[e.target.name]=e.target.value
        this.setState({
            formdata:tmp
        })
    }
    
    approvHandler = () =>{
        let token=localStorage.getItem(apiconfig.LS.TOKEN)
        let option={
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.EVENT,
            method: "put",
            headers:{
                "Authorization": token,
                "Content-Type" : "application/json"
            },
            approved_by: this.state.formdata
        }
        debugger
        axios(option)
        .then((response)=>{
            if(response.data.code===200){
                alert('Success')
                this.props.history.push('/event')
            } else {
                alert(response.data.message)
            }
        })
        .catch((error)=>{
            console.log(error);            
        })
    }
    submitHandler(){
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
                alert('Success')
                this.props.history.push('/event')
            } else {
                alert(response.data.message)
            }
        })
        .catch((error)=>{
            console.log(error);            
        })
    }
    getListEvent() {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.EVENT,
            method: "get",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response)=>{
            this.setState({
                event: response.data.message
                
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    componentDidMount(){
        this.getListEvent()
    }
  
    modalStatus(status, message) {
        this.setState({
            alertData : {
                status : status,
                message : message
            },
            viewEvent : false,
            editEvent : false
        })
        this.getListUnit()
    }

    render(){
    return (
        <div>
        <ul class="breadcrumb">
            <li><a href="#">Home</a> <span class="divider">/</span></li>
            <li><a href="#">Master</a> <span class="divider">/</span></li>
            <li class="active">List Event</li>
        </ul>
       
        <div class="container">
            <h4>List Event</h4>

             {
                (this.state.alertData.status == 1) ? <Alert color ="success"> {this.state.alertData.message} </Alert>:''
            }
            {
                (this.state.alertData.status == 2) ? <Alert color ="danger"> {this.state.alertData.message} </Alert>: ''
            }


                <button type="button" class="btn btn-primary float-right"
                onClick ={this.showHandler}> Add </button>
                <CreateEvent
                show = {this.state.showCreateEvent}
                closeHandler={this.closeHandler} />
                <ReasonEvent                
                closeModalHandler = {this.closeModalHandler} />
                <ViewEvent
                view = {this.state.viewEvent}
                closeModalHandler = {this.closeModalHandler} 
                event = {this.state.currentEvent}
                approvHandler = {this.approvHandler}
                />
                {/* <DeleteEvent
                delete = {this.state.deleteEvent}
                event = {this.state.currentEvent}
                closeModalHandler = {this.closeModalHandler}
                modalStatus = {this.modalStatus}
                 /> */}
                <EditEvent
                edit = {this.state.editEvent}
                closeModalHandler = {this.closeModalHandler}
                event = {this.state.currentEvent} 
                modalStatus = {this.modalStatus}
                />
                <br/> <br/>
                <form class="form-inline">
                <div class ="container">
                <input type="text" placeholder="Transaction Code" class="col-sm-2 padding=3px" id="text"/>
                {/* <input type="text" placeholder="Request By" class="col-sm-2 padding=5px" id="text"/>
                <input type="date" placeholder="Request Date" class="col-sm-2 padding=5px datepicker" id="text"/>
                <input type="text" placeholder="Status" class="col-sm-1 padding=5px" id="text"/>
                <input type="date" placeholder="Created date" class="col-sm-2 padding=5px datepicker" id="date"/>
                <input type="text" placeholder="Created By" class="col-sm-2 padding=5px" id="text"/> */}
                
                <button type="button" class="btn btn-warning float-right " 
                onClick ={this.searchHandler}> Search </button>
                </div>
                </form>
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Transaction Code</th>    
                        <th>Request By</th>
                        <th>Request Date</th>
                        <th>Status </th>
                        <th>Created Date</th>
                        <th>Created By</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                       {
                        //   let tmp =1; 
                           this.state.event.map((ele,number)=>{
                            // let tmp=1
                             
                            // let number=this.state.event.length
                            // console.log(number)
                            // // // tmp+=1
                            //   while(tmp<=number)
                            //   {
                            //       tmp+1
                            //   }
                                return <SingleSouvRow 
                                no = {number+1}
                                code={ele.code}
                                request_by={ele.request_by}               _id={ele._id}             
                                request_date={ele.request_date}
                                status={ele.status}
                                created_date={ele.created_date}
                                created_by={ele.created_by}
                                viewModalHandler={this.viewModalHandler}
                                editModalHandler={this.editModalHandler}
                                /> 
                            
                            // }//tmp+=1
                        } 
                        )
                       }
                    </tbody>
                </table>
                </div>
                </div>
        )
    }
}

export default ListEvent