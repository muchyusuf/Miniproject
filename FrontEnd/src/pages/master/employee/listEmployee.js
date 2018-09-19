import React from 'react'
import API from '../../../helpers/API';
import apiconfig from '../../../configs/api.config.json'
import axios from 'axios';
import { Link } from 'react-router-dom'
import EditEmployee from './editEmployee';
import CreateEmployee from './createEmployee';
import { Alert } from 'reactstrap'
import DeleteEmployee from './deleteEmployee'
import ViewEmployee from './viewEmployee'


const SingleSouvRow=(props)=>{

     return(
        <tr>
            <td>{props.no}</td>
            <td>{props.employee_number}</td>
            <td>{props.name}</td>
            <td>{props.company}</td>
            <td>{props.created_date}</td>
            <td>{props.created_by}</td>
            <td>
                <Link to='#'>
                <span onClick = {() => {props.viewModalHandler(props._id)}} className="fa fa-search" style={{fontSize : '18px', paddingRight : '30px'}} />    
                
                <span onClick = {() => {props.editModalHandler(props._id)}} class="fa fa-edit" style={{fontSize : '18px', paddingRight : '30px'}} />            
                
                <span onClick = {() => {props.deleteModalHandler(props._id)}} class="fa fa-trash" style={{fontSize : '18px'}} />
                    
                </Link>
            </td>
        </tr>
    )
}

class ListEmployee extends React.Component {
    constructor(props){
       
        super(props)
        this.state={
            showCreateEmployee:false,
            employee        :[],
            currentEmployee : {},
            alertData: {
                status: 0,
                message: ''
            }
        }
        this.showHandler=this.showHandler.bind(this)
        this.submitHandler=this.submitHandler.bind(this)
        this.changeHandler=this.changeHandler.bind(this)
        this.unitHandler=this.unitHandler.bind(this)
        this.closeModalHandler = this.closeModalHandler.bind(this)
        this.closeHandler=this.closeHandler.bind(this)
        this.deleteHandler=this.deleteHandler.bind(this)
        this.deleteModalHandler = this.deleteModalHandler.bind(this)
        this.viewModalHandler = this.viewModalHandler.bind(this)
        this.editModalHandler = this.editModalHandler.bind(this)
        this.modalStatus = this.modalStatus.bind(this)
    }

    deleteModalHandler(employeeid) {
        let tmp = {}
        this.state.employee.map((ele) => {
            if (employeeid == ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentEmployee : tmp,
            DeleteEmployee : true
        })
        
    }


    viewModalHandler(employeeid) {
        let tmp = {}
        this.state.employee.map((ele) => {
            if (employeeid == ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentEmployee : tmp,
            ViewEmployee : true
        })
        debugger
    }

    editModalHandler(employeeid) {
        let tmp = {}
        this.state.employee.map((ele) => {
            if (employeeid == ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentEmployee : tmp,
            EditEmployee : true
        })
    }

    closeModalHandler() {
        this.setState({
            ViewEmployee : false,
            EditEmployee : false,
            DeleteEmployee : false    
        })
    }

    showHandler(){
        this.setState({showCreateEmployee:true})
    }

    closeHandler(){
        this.setState({showCreateEmployee:false})
    }

    changeHandler(e){
        let tmp=this.state.formdata
        tmp[e.target.name]=e.target.value
        this.setState({
            formdata:tmp
        })
    }
    unitHandler(e){
        let tmp=this.state.formdata
        tmp.m_unit_id=e.target.value
        this.setState({
            formdata:tmp
        })
    }
    submitHandler(){
        let token=localStorage.getItem(apiconfig.LS.TOKEN)
        let option={
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.EMPLOYEE,
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
                window.reload.location()
            } else {
                alert(response.data.message)
            }
        })
        .catch((error)=>{
            console.log(error);            
        })
    }
    getListEmployee() {
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
                employee: response.data.message
                
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    componentDidMount(){
        this.getListEmployee()
    }
    deleteHandler(param){
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.EMPLOYEE+'/'+param,
            method: "delete",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response)=>{
            let currentindex = -1
            this.state.employee.map((ele, idx)=>{
                if(ele._id==param){
                    currentindex=idx
                    this.props.history.goBack()
                }
            })
            let tmp=this.state.employee
            tmp.splice(currentindex,1)
            this.setState({
                employee: tmp
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    modalStatus(status, message) {
        this.setState({
            alertData : {
                status : status,
                message : message
            },
            ViewEmployee : false,
            EditEmployee : false,
            DeleteEmployee : false    
        })
        this.getListUnit()
    }

    render(){
    return (
        <div>
        <ul class="breadcrumb">
            <li><a href="#">Home</a> <span class="divider">/</span></li>
            <li><a href="#">Master</a> <span class="divider">/</span></li>
            <li class="active">List Employee</li>
        </ul>
       
        <div class="container">
            <h4>List Employee</h4>

             {
                (this.state.alertData.status == 1) ? <Alert color ="success"> {this.state.alertData.message} </Alert>:''
            }
            {
                (this.state.alertData.status == 2) ? <Alert color ="danger"> {this.state.alertData.message} </Alert>: ''
            }

            <div className= "container">
                <button type="button" class="btn btn-primary float-right"
                onClick ={this.showHandler}> Add </button>
                <CreateEmployee
                show = {this.state.showCreateEmployee}
                closeHandler={this.closeHandler} />
                <ViewEmployee
                view = {this.state.ViewEmployee}
                closeModalHandler = {this.closeModalHandler} 
                employee = {this.state.currentEmployee}
                />
                <DeleteEmployee
                delete = {this.state.DeleteEmployee}
                employee = {this.state.currentEmployee}
                closeModalHandler = {this.closeModalHandler}
                modalStatus = {this.modalStatus}
                 />
                <EditEmployee
                edit = {this.state.EditEmployee}
                closeModalHandler = {this.closeModalHandler}
                employee = {this.state.currentEmployee} 
                modalStatus = {this.modalStatus}
                />
                </div>
                <br/> <br/>
                <form class="form-inline">
                <div class ="container">
                <input type="text" placeholder="Employee Number ID" class="col-sm-3 padding=5px" id="text"/>
                
                <button type="button" class="btn btn-warning float-right " 
                onClick ={this.searchHandler}> Search </button>
                </div>
                </form>
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Employee ID Number</th> 
                        <th>Employee Name</th>   
                        <th>Company Name</th>
                        <th>Created Date</th>
                        <th>Created By</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                       {
                           this.state.employee.map((ele, index)=>{
 
                                return <SingleSouvRow 
                                 no = {index+1}
                                employee_number ={ele.employee_number}
                                name={ele.first_name+ ' '+ele.last_name}
                                company = {ele.company}
                                _id={ele._id}
                                created_date= {ele.created_date}
                                created_by= {ele.created_by}
                                viewModalHandler={this.viewModalHandler}
                                editModalHandler={this.editModalHandler}
                                deleteModalHandler={this.deleteModalHandler}
                                /> 
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

export default ListEmployee