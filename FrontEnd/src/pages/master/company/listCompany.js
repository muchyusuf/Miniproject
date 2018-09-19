import React from 'react'
import API from '../../../helpers/API';
import apiconfig from '../../../configs/api.config.json'
import axios from 'axios';
import { Link } from 'react-router-dom'
import EditCompany from './editCompany';
import CreateCompany from './createCompany';
import { Alert } from 'reactstrap'
import DeleteCompany from './deleteCompany'
import ViewCompany from './viewCompany'
import $ from 'jquery'


const SingleSouvRow=(props)=>{
    
    // console.log(this.state.company.length)
    // for(n<this.state.company.length;n++)
     return(
        <tr table table-hover order-table>
            <td>{props.no}</td>
            <td>{props.code}</td>
            <td>{props.name}</td>
            <td>{props.email}</td>
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

class ListCompany extends React.Component {
    constructor(props){
        super(props)
        this.state={
            
            showCreateCompany:false,
            company:[],
            currentCompany: {},
            alertData: {
                status: 0,
                message: ''
            }
        }
        this.showHandler=this.showHandler.bind(this)
        this.closeModalHandler = this.closeModalHandler.bind(this)
        this.closeHandler=this.closeHandler.bind(this)
        this.deleteModalHandler = this.deleteModalHandler.bind(this)
        this.viewModalHandler = this.viewModalHandler.bind(this)
        this.editModalHandler = this.editModalHandler.bind(this)
        this.modalStatus = this.modalStatus.bind(this)
    }

    deleteModalHandler(companyid) {
        let tmp = {}
        this.state.company.map((ele) => {
            if (companyid == ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentCompany : tmp,
            deleteCompany : true
        })
    }


    viewModalHandler(companyid) {
        let tmp = {}
        this.state.company.map((ele) => {
            if (companyid == ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentCompany : tmp,
            viewCompany : true
        })
    }

    editModalHandler(companyid) {
        let tmp = {}
        this.state.company.map((ele) => {
            if (companyid == ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentCompany : tmp,
            editCompany : true
        })
    }

    closeModalHandler() {
        this.setState({
            viewCompany : false,
            editCompany : false,
            deleteCompany : false    
        })
    }

    showHandler(){
        this.setState({showCreateCompany:true})
    }

    closeHandler(){
        this.setState({showCreateCompany:false})
    }
    getListCompany() {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.COMPANY,
            method: "get",
            headers: {
                "Authorization": token
            }
        }
        debugger
        axios(option)
        .then((response)=>{
            this.setState({
                company: response.data.message
                
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    componentDidMount(){
        this.getListCompany();
        (function(document) {
            'use strict';
        var LightTableFilter = (function(Arr) {
    
        var _input;
    
        function _onInputEvent(e) {
          _input = e.target;
          var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
          Arr.forEach.call(tables, function(table) {
            Arr.forEach.call(table.tBodies, function(tbody) {
              Arr.forEach.call(tbody.rows, _filter);
            });
          });
        }
    
        function _filter(row) {
          var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
          row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
        }
    
        return {
          init: function() {
            var inputs = document.getElementsByClassName('light-table-filter');
            Arr.forEach.call(inputs, function(input) {
              input.oninput = _onInputEvent;
            });
          }
        };
      })(Array.prototype);
    
      document.addEventListener('readystatechange', function() {
        if (document.readyState === 'complete') {
          LightTableFilter.init();
        }
      });
    
    })(document);
        // $(document).ready(function(){
        //     $("#searchCode").on("keyup", function() {
        //       var value = $(this).val().toLowerCase();
        //       $(".punyaku").filter(function() {
        //         $(this).toggle($(this).children()[1].innerText.toLowerCase().indexOf(value) > -1)
        //       })
        //     })
            
        //   })
          
    }
    modalStatus(status, message) {
        this.setState({
            alertData : {
                status : status,
                message : message
            },
            viewCompany : false,
            editCompany : false,
            deleteCompany : false    
        })
        // this.getListCompany()
    }

    render(){
    return (
        <div>
        <ul class="breadcrumb">
            <li><a href="#">Home</a> <span class="divider">/</span></li>
            <li><a href="#">Master</a> <span class="divider">/</span></li>
            <li class="active">List Company</li>
        </ul>
       
        <div class="container">
            <h4>List Company</h4>

             {
                (this.state.alertData.status == 1) ? <Alert color ="success"> {this.state.alertData.message} </Alert>:''
            }
            {
                (this.state.alertData.status == 2) ? <Alert color ="danger"> {this.state.alertData.message} </Alert>: ''
            }


                <button type="button" class="btn btn-primary float-right"
                onClick ={this.showHandler}> Add </button>
                <CreateCompany
                show = {this.state.showCreateCompany}
                closeHandler={this.closeHandler} 
                company = {this.state.company}/>
                <ViewCompany
                view = {this.state.viewCompany}
                closeModalHandler = {this.closeModalHandler} 
                company = {this.state.currentCompany}
                />
                <DeleteCompany
                delete = {this.state.deleteCompany}
                company = {this.state.currentCompany}
                closeModalHandler = {this.closeModalHandler}
                modalStatus = {this.modalStatus}
                 />
                <EditCompany
                edit = {this.state.editCompany}
                closeModalHandler = {this.closeModalHandler}
                company = {this.state.currentCompany} 
                modalStatus = {this.modalStatus}
                />

                <br/> <br/>
                <form class="form-inline">
                <div class ="container">
                <input type="text" data-table="order-table" placeholder="Search" className="col-sm-3 padding=5px light-table-filter" />
                   
                </div>
                </form>

                <table className="table table-hover order-table">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Company Code</th>    
                        <th>Company Name</th>
                        <th>Email</th>
                        <th>Created Date</th>
                        <th>Created By</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                       {
                        //   let tmp =1; 
                           this.state.company.map((ele,number)=>{
                          
                                return <SingleSouvRow 
                                no = {number+1}
                                code={ele.code}
                                name={ele.name}
                                email = {ele.email}
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

export default ListCompany