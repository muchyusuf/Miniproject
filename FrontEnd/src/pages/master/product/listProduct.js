import React, {Component} from 'react'
import API from '../../../helpers/API';
import apiconfig from '../../../configs/api.config.json'
import axios from 'axios';
import { Link } from 'react-router-dom'
import EditProduct from './editProduct';
import CreateProduct from './createProduct';
import { Alert } from 'reactstrap'
import DeleteProduct from './deleteProduct'
import ViewProduct from './viewProduct'
import $ from 'jquery'

const SingleSouvRow=(props)=>{
    
    // console.log(this.state.product.length)
    // for(n<this.state.product.length;n++)
     return(
        <tr className="myTable">
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

class ListProduct extends React.Component {
    constructor(props){
        var angka =1;
        super(props)
        this.state={
            showCreateProduct:false,
            product:[],
            currentProduct: {},
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
        // this.myFunction = this.myFunction.bind(this)
    }

    deleteModalHandler(productid) {
        let tmp = {}
        this.state.product.map((ele) => {
            if (productid == ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentProduct : tmp,
            deleteProduct : true
        })
    }


    viewModalHandler(productid) {
        let tmp = {}
        this.state.product.map((ele) => {
            if (productid == ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentProduct : tmp,
            viewProduct : true
        })
    }

    editModalHandler(productid) {
        let tmp = {}
        this.state.product.map((ele) => {
            if (productid == ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentProduct : tmp,
            editProduct : true
        })
    }

    closeModalHandler() {
        this.setState({
            viewProduct : false,
            editProduct : false,
            deleteProduct : false    
        })
    }

    // searchHandler(){
    //     $(document).ready(function() {
    //         var oTable = $('#myTable').DataTable();
    //         $('#searchButton').click(function () {
    //             oTable.search($("#searchNameField").val()).draw();
    //         });
        
    //         // EDIT: Capture enter press as well
    //         $("#searchNameField").keypress(function(e) {
    //             // You can use $(this) here, since this once again refers to your text input            
    //             if(e.which === 13) {
    //                 e.preventDefault(); // Prevent form submit
    //                 oTable.search($(this).val()).draw();
    //             }
    //         });
    //     });
    // }

    showHandler(){
        this.setState({showCreateProduct:true})
    }

    closeHandler(){
        this.setState({showCreateProduct:false})
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
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.PRODUCT,
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
                this.props.history.push('/dashboard')
            } else {
                alert(response.data.message)
            }
        })
        .catch((error)=>{
            console.log(error);            
        })
    }
    getListProduct() {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.PRODUCT,
            method: "get",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response)=>{
            this.setState({
                product: response.data.message
                
            })
        })
        .catch((error)=>{
        })
    }

    componentDidMount(){
        this.getListProduct()
    }
    deleteHandler(param){
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.PRODUCT+'/'+param,
            method: "delete",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response)=>{
            let currentindex = -1
            this.state.product.map((ele, idx)=>{
                if(ele._id==param){
                    currentindex=idx
                    this.props.history.goBack()
                }
            })
            let tmp=this.state.product
            tmp.splice(currentindex,1)
            this.setState({
                product: tmp
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
            viewProduct : false,
            editProduct : false,
            deleteProduct : false    
        })
        this.getListUnit()
    }


    componentDidMount(){
        this.getListProduct()
        $(document).ready(function(){
            $("#searchCode").on("keyup", function() {
              var value = $(this).val().toLowerCase();
              $(".myTable").filter(function() {
                $(this).toggle($(this).children()[1].innerText.toLowerCase().indexOf(value) > -1)            
            
              });
            });
            
          });
    }

//    myFunction() {
//         var input, filter, table, tr, td, i;
//         input = document.getElementById("myInput");
//         filter = input.value.toUpperCase();
//         table = document.getElementById("myTable");
//         tr = table.getElementsByTagName("tr");
//         for (i = 0; i < tr.length; i++) {
//           td = tr[i].getElementsByTagName("td")[0];
//           if (td) {
//             if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
//               tr[i].style.display = "";
//             } else {
//               tr[i].style.display = "none";
//             }
//           }       
//         }
//       }

    render(){
    return (
        <div>
        <ul class="breadcrumb">
            <li><a href="#">Home</a> <span class="divider">/</span></li>
            <li><a href="#">Master</a> <span class="divider">/</span></li>
            <li class="active">List Product</li>
        </ul>
       
        <div class="container">
            <h4>List Product</h4>

             {
                (this.state.alertData.status == 1) ? <Alert color ="success"> {this.state.alertData.message} </Alert>:''
            }
            {
                (this.state.alertData.status == 2) ? <Alert color ="danger"> {this.state.alertData.message} </Alert>: ''
            }

            <div class="container">
                <button type="button" class="btn btn-primary float-right" onClick ={this.showHandler}> Add </button>
                <CreateProduct
                show = {this.state.showCreateProduct}
                closeHandler={this.closeHandler} />
                <ViewProduct
                view = {this.state.viewProduct}
                closeModalHandler = {this.closeModalHandler} 
                product = {this.state.currentProduct}
                />
                <DeleteProduct
                delete = {this.state.deleteProduct}
                product = {this.state.currentProduct}
                closeModalHandler = {this.closeModalHandler}
                modalStatus = {this.modalStatus}
                 />
                <EditProduct
                edit = {this.state.editProduct}
                closeModalHandler = {this.closeModalHandler}
                product = {this.state.currentProduct} 
                modalStatus = {this.modalStatus}
                />
            </div>
                <br/> <br/>

            
                <form class="form-inline">
                <div class ="container"> 
                <input type="text" placeholder="Searching. . ." class="col-sm-3 padding=5px" id="searchNameField" />
                {/* <input type="text" placeholder="Searching . . ." onkeyup={this.myFunction} class="col-sm-3 padding=5px" id="searchCode"/> */}
                <button type="button" class="btn btn-warning float-right " id="searchButton" onClick ={this.searchHandler}> Search </button>
                </div>
                </form>
                

                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Product Code</th>    
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Created Date</th>
                        <th>Created By</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                       {
                           this.state.product.map((ele,index)=>{
                            
                            
                            //let number=this.state.product.length
                                return <SingleSouvRow 
                                no = {index+1}
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

export default ListProduct