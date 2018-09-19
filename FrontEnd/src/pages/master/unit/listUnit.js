import React from 'react'
import API from '../../../helpers/API';
import apiconfig from '../../../configs/api.config.json'
import axios from 'axios';
import { Link } from 'react-router-dom'
import EditUnit from './editUnit';
import CreateUnit from './createUnit';
import { Alert } from 'reactstrap'
import DeleteUnit from './deleteUnit'
import ViewUnit from './viewUnit'


const SingleSouvRow=(props)=>{
    
    // console.log(this.state.unit.length)
    // for(n<this.state.unit.length;n++)
     return(
        <tr>
            <td>{props.no}</td>
            <td>{props.code}</td>
            <td>{props.name}</td>
            <td>{props.description}</td>
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

class ListUnit extends React.Component {
    constructor(props){
        var angka =1;
        super(props)
        this.state={
         
            showCreateUnit:false,
            unit:[],
            currentUnit: {},
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

    deleteModalHandler(unitid) {
        let tmp = {}
        this.state.unit.map((ele) => {
            if (unitid == ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentUnit : tmp,
            deleteUnit : true
        })
    }


    viewModalHandler(unitid) {
        let tmp = {}
        this.state.unit.map((ele) => {
            if (unitid == ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentUnit : tmp,
            viewUnit : true
        })
    }

    editModalHandler(unitid) {
        let tmp = {}
        this.state.unit.map((ele) => {
            if (unitid == ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentUnit : tmp,
            editUnit : true
        })
    }

    closeModalHandler() {
        this.setState({
            viewUnit : false,
            editUnit : false,
            deleteUnit : false    
        })
    }

    showHandler(){
        this.setState({showCreateUnit:true})
    }

    closeHandler(){
        this.setState({showCreateUnit:false})
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
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.UNIT,
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
    getListUnit() {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.UNIT,
            method: "get",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response)=>{
            this.setState({
                unit: response.data.message
                
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    componentDidMount(){
        this.getListUnit()
    }
    deleteHandler(param){
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.UNIT+'/'+param,
            method: "delete",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response)=>{
            let currentindex = -1
            this.state.unit.map((ele, idx)=>{
                if(ele._id==param){
                    currentindex=idx
                    this.props.history.goBack()
                }
            })
            let tmp=this.state.unit
            tmp.splice(currentindex,1)
            this.setState({
                unit: tmp
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
            viewUnit : false,
            editUnit : false,
            deleteUnit : false    
        })
        this.getListUnit()
    }

    myFunction(){
        // Declare variables 
  var input, filter, table, tr, th, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    th = tr[i].getElementsByTagName("th")[0];
    if (th) {
      if (th.innerHTML.toUpperCase().indexOf(table) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }


       
    }

    render(){
    return (
        <div>
        <ul class="breadcrumb">
            <li><a href="#">Home</a> <span class="divider">/</span></li>
            <li><a href="#">Master</a> <span class="divider">/</span></li>
            <li class="active">List Unit</li>
        </ul>
       
        <div class="container">
            <h4>List Unit</h4>

             {
                (this.state.alertData.status == 1) ? <Alert color ="success"> {this.state.alertData.message} </Alert>:''
            }
            {
                (this.state.alertData.status == 2) ? <Alert color ="danger"> {this.state.alertData.message} </Alert>: ''
            }


                <button type="button" class="btn btn-primary float-right"
                onClick ={this.showHandler}> Add </button>
                <CreateUnit
                show = {this.state.showCreateUnit}
                closeHandler={this.closeHandler} />
                <ViewUnit
                view = {this.state.viewUnit}
                closeModalHandler = {this.closeModalHandler} 
                unit = {this.state.currentUnit}
                />
                <DeleteUnit
                delete = {this.state.deleteUnit}
                unit = {this.state.currentUnit}
                closeModalHandler = {this.closeModalHandler}
                modalStatus = {this.modalStatus}
                 />
                <EditUnit
                edit = {this.state.editUnit}
                closeModalHandler = {this.closeModalHandler}
                unit = {this.state.currentUnit} 
                modalStatus = {this.modalStatus}
                />
                <br/> <br/>
                <form class="form-inline">
                <div class ="container">
                <input type = "text" id= "myInput" onkeyup = "myFunction()" placeholder="Search.." class="col-sm-3 padding=5px"/>  
                {/* <button type="button" class="btn btn-warning" 
                onClick ={this.searchHandler}> Search </button> */}
                </div>
                </form>
                <table id = "myTable" class="table table-hover">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Unit Code</th>    
                        <th>Unit Name</th>
                        <th>Description</th>
                        <th>Created Date</th>
                        <th>Created By</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                       {
                        //   let tmp =1; 
                           this.state.unit.map((ele, yoi)=>{
                            let tmp=1
                             
                            let number=this.state.unit.length
                            console.log(number)
                            // // tmp+=1
                            //   while(tmp<=number)
                            //   {
                            //       tmp+1
                            //   }
                                return <SingleSouvRow 
                                no = {yoi+1}
                                code={ele.code}
                                name={ele.name}
                                description={ele.description}
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

export default ListUnit