import React from 'react'
import API from '../../../helpers/API';
import apiconfig from '../../../configs/api.config.json'
import axios from 'axios';
import { Link } from 'react-router-dom'
import EditUser from './editUser';
import CreateUser from './createUser';
import { Alert } from 'reactstrap'
import DeleteUser from './deleteUser'
import ViewUser from './viewUser'


const SingleSouvRow=(props)=>{
    
    // console.log(this.state.user.length)
    // for(n<this.state.user.length;n++)
     return(
        <tr>
            <td>{props.no}</td>
            <td>{props.employee}</td>
            <td>{props.role}</td>
            <td>{props.company}</td>
            <td>{props.username}</td>
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

class ListUser extends React.Component {
    constructor(props){
        var angka =1;
        super(props)
        this.state={
            // formdata:{
            //     no:1,
            //     code:'',
            //     name:'',
            // },
            showCreateUser:false,
            user:[],
            currentUser: {},
            alertData: {
                status: 0,
                message: ''
            }
            // unit:[]
        }
        this.showHandler=this.showHandler.bind(this)
        this.closeModalHandler = this.closeModalHandler.bind(this)
        this.closeHandler=this.closeHandler.bind(this)
        this.deleteModalHandler = this.deleteModalHandler.bind(this)
        this.viewModalHandler = this.viewModalHandler.bind(this)
        this.editModalHandler = this.editModalHandler.bind(this)
        this.modalStatus = this.modalStatus.bind(this)
    }

    deleteModalHandler(userid) {
        let tmp = {}
        this.state.user.map((ele) => {
            if (userid == ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentUser : tmp,
            deleteUser : true
        })
    }


    viewModalHandler(userid) {
        let tmp = {}
        this.state.user.map((ele) => {
            if (userid == ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentUser : tmp,
            viewUser : true
        })
        debugger
    }

    editModalHandler(userid) {
        let tmp = {}
        this.state.user.map((ele) => {
            if (userid == ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentUser : tmp,
            editUser : true
        })
        debugger
    }

    closeModalHandler(value) {
        this.setState({
            viewUser : value,
            editUser : value,
            deleteUser : value    
        })
    }

    showHandler(){
        this.setState({showCreateUser:true})
    }

    closeHandler(value){
        this.setState({showCreateUser:value})
    }
    getListUser() {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.USER,
            method: "get",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response)=>{
            this.setState({
                user: response.data.message
                
            })
            debugger
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    componentDidMount(){
        this.getListUser()
    }

    modalStatus(status, message) {
        this.setState({
            alertData : {
                status : status,
                message : message
            },
            viewUser : false,
            editUser : false,
            deleteUser : false    
        })
        this.getListUnit()
    }

    render(){
    return (
        <div>
        <ul class="breadcrumb">
            <li><a href="#">Home</a> <span class="divider">/</span></li>
            <li><a href="#">Master</a> <span class="divider">/</span></li>
            <li class="active">List User</li>
        </ul>
       
        <div class="container">
            <h4>List User</h4>

             {
                (this.state.alertData.status == 1) ? <Alert color ="success"> {this.state.alertData.message} </Alert>:''
            }
            {
                (this.state.alertData.status == 2) ? <Alert color ="danger"> {this.state.alertData.message} </Alert>: ''
            }


                <button type="button" class="btn btn-primary float-right"
                onClick ={this.showHandler}> Add </button>
                <CreateUser
                show = {this.state.showCreateUser}
                closeHandler={this.closeHandler} />
                <ViewUser
                view = {this.state.viewUser}
                closeModalHandler = {this.closeModalHandler} 
                user = {this.state.currentUser}
                />
                <DeleteUser
                delete = {this.state.deleteUser}
                user = {this.state.currentUser}
                closeModalHandler = {this.closeModalHandler}
                modalStatus = {this.modalStatus}
                 />
                <EditUser
                edit = {this.state.editUser}
                closeModalHandler = {this.closeModalHandler}
                user = {this.state.currentUser} 
                modalStatus = {this.modalStatus}
                />
                <br/> <br/>
                <form class="form-inline">
                <div class ="container">
                <input type="text" placeholder="User Code" class="col-sm-3 padding=5px" id="text"/>
                <input type="text" placeholder="User Name" class="col-sm-3 padding=5px" id="text"/>
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
                        <th>Employee</th>    
                        <th>Role</th>    
                        <th>Company</th>
                        <th>Username</th>
                        <th>Created Date</th>
                        <th>Created By</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                       {
                        //   let tmp =1; 
                           this.state.user.map((ele,number)=>{
                            //let tmp=1
                             
                            //let number=this.state.user.length
                            console.log(number)
                            // // tmp+=1
                            //   while(tmp<=number)
                            //   {
                            //       tmp+1
                            //   }
                                return <SingleSouvRow 
                                no = {number+1}
                                employee={ele.firstname+" "+ele.lastname}
                                role={ele.role}
                                company={ele.company}
                                username={ele.username}
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

export default ListUser