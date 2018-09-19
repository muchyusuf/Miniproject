import React from 'react'
import API from '../../../helpers/API';
import apiconfig from '../../../configs/api.config.json'
import axios from 'axios';
import { Link } from 'react-router-dom'
import EditRole from './editRole';
import CreateRole from './createRole';
import { Alert } from 'reactstrap'
import DeleteRole from './deleteRole'
import ViewRole from './viewRole'


const SingleSouvRow=(props)=>{
    
    // console.log(this.state.role.length)
    // for(n<this.state.role.length;n++)
     return(
        <tr>
            <td>{props.no}</td>
            <td>{props.code}</td>
            <td>{props.name}</td>
            <td>{props.created_date}</td>
            <td>{props.created_by}</td>
            <td>
                <Link to='#'>
                <span onClick = {() => {props.viewModalHandler(props._id)}} title="Detail Role" className="fa fa-search" style={{fontSize : '18px', paddingRight : '30px'}} />    
                
                <span onClick = {() => {props.editModalHandler(props._id)}} title="Edit Role" class="fa fa-edit" style={{fontSize : '18px', paddingRight : '30px'}} />            
                
                <span onClick = {() => {props.deleteModalHandler(props._id)}} title="Delete Role" class="fa fa-trash" style={{fontSize : '18px'}} />
                    
                </Link>
            </td>
        </tr>
    )
}

class ListRole extends React.Component {
    constructor(props){
        var angka =1;
        super(props)
        this.state={
            // formdata:{
            //     no:1,
            //     code:'',
            //     name:'',
            // },
            showCreateRole:false,
            role:[],
            currentRole: {},
            alertData: {
                status: 0,
                message: ''
            }
            // unit:[]
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

    deleteModalHandler(roleid) {
        let tmp = {}
        this.state.role.map((ele) => {
            if (roleid == ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentRole : tmp,
            deleteRole : true
        })
    }


    viewModalHandler(roleid) {
        let tmp = {}
        this.state.role.map((ele) => {
            if (roleid == ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentRole : tmp,
            viewRole : true
        })
    }

    editModalHandler(roleid) {
        let tmp = {}
        this.state.role.map((ele) => {
            if (roleid == ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentRole : tmp,
            editRole : true
        })
    }

    closeModalHandler(value) {
        this.setState({
            viewRole : value,
            editRole : value,
            deleteRole : value    
        })
    }

    showHandler(){
        this.setState({showCreateRole:true})
    }

    closeHandler(value){
        this.setState({showCreateRole:value})
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
                alert('Success')
                this.props.history.push('/dashboard')
            } else {
                alert(response.data.message)
            }
        })
        .catch((error)=>{
            console.log(error);            
        })
    }
    getListRole() {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.ROLE,
            method: "get",
            headers: {
                "Authorization": token
            }
        }
        //debugger
        axios(option)
        .then((response)=>{
            //debugger
            this.setState({
                role: response.data.message
                
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    componentDidMount(){
        this.getListRole()
    }
    deleteHandler(param){
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.COMPANY+'/'+param,
            method: "delete",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response)=>{
            let currentindex = -1
            this.state.role.map((ele, idx)=>{
                if(ele._id==param){
                    currentindex=idx
                    this.props.history.goBack()
                }
            })
            let tmp=this.state.role
            tmp.splice(currentindex,1)
            this.setState({
                role: tmp
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
            viewRole : false,
            editRole : false,
            deleteRole : false    
        })
        this.getListUnit()
    }

    render(){
    return (
        <div>
        <ul class="breadcrumb">
            <li><a href="#">Home</a> <span class="divider">/</span></li>
            <li><a href="#">Master</a> <span class="divider">/</span></li>
            <li class="active">List Role</li>
        </ul>
       
        <div class="container">
            <h4>List Role</h4>

             {
                (this.state.alertData.status == 1) ? <Alert color ="success"> {this.state.alertData.message} </Alert>:''
            }
            {
                (this.state.alertData.status == 2) ? <Alert color ="danger"> {this.state.alertData.message} </Alert>: ''
            }


                <button type="button" class="btn btn-primary float-right"
                onClick ={this.showHandler}> Add </button>
                <CreateRole
                show = {this.state.showCreateRole}
                closeHandler={this.closeHandler} />
                <ViewRole
                view = {this.state.viewRole}
                closeModalHandler = {this.closeModalHandler} 
                role = {this.state.currentRole}
                />
                <DeleteRole
                delete = {this.state.deleteRole}
                role = {this.state.currentRole}
                closeModalHandler = {this.closeModalHandler}
                modalStatus = {this.modalStatus}
                 />
                <EditRole
                edit = {this.state.editRole}
                closeModalHandler = {this.closeModalHandler}
                role = {this.state.currentRole} 
                modalStatus = {this.modalStatus}
                />
                <br/> <br/>
                <form class="form-inline">
                <div class ="container">
                <input type="text" placeholder="Role Code" class="col-sm-3 padding=5px" id="text"/>
                <input type="text" placeholder="Role Name" class="col-sm-3 padding=5px" id="text"/>
                <input type="date" placeholder="Created date" class="col-sm-3 padding=5px datepicker" id="date"/>
                <input type="text" placeholder="Created By" class="col-sm-2 padding=5px" id="text"/>
                
                <button type="button" class="btn btn-warning float-right " 
                onClick ={this.searchHandler}> Search </button>
                </div>
                </form>
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Role Code</th>    
                        <th>Role Name</th>
                        <th>Created Date</th>
                        <th>Created By</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                       {
                        //   let tmp =1; 
                           this.state.role.map((ele,number)=>{
                            //let tmp=1
                             
                            //let number=this.state.role.length
                            console.log(number)
                            // // tmp+=1
                            //   while(tmp<=number)
                            //   {
                            //       tmp+1
                            //   }
                                return <SingleSouvRow 
                                no = {number+1}
                                code={ele.code}
                                name={ele.name}
                                _id={ele._id}
                                created_date={ele.created_date}
                                created_by={ele.created_by}
                                viewModalHandler={this.viewModalHandler}
                                editModalHandler={this.editModalHandler}
                                deleteModalHandler={this.deleteModalHandler}
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

export default ListRole