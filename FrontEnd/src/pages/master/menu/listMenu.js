import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";


import API from "../../../helpers/API";
import apiconfig from "../../../configs/api.config.json";

import CreateMenu from "./createMenu";
import EditMenu from "./editMenu";
import DeleteMenu from "./deleteMenu";
import ViewMenu from "./viewMenu";

const SingleSouvRow = props => {
  return (
    <tr>
      <td>{props.no}</td>
      <td>{props.code}</td>
      <td>{props.name}</td>
      <td>{props.created_date}</td>
      <td>{props.created_by}</td>
      <td>
        <Link to="#">
          <span
            onClick={() => {
              props.viewModalHandler(props._id);
            }}
            className="fa fa-search"
            style={{ fontSize: "18px", paddingRight: "30px" }}
          />

          <span
            onClick={() => {
              props.editModalHandler(props._id);
            }}
            class="fa fa-edit"
            style={{ fontSize: "18px", paddingRight: "30px" }}
          />

          <span
            onClick={() => {
              props.deleteModalHandler(props._id);
            }}
            class="fa fa-trash"
            style={{ fontSize: "18px" }}
          />
        </Link>
      </td>
    </tr>
  );
};

class ListMenu extends React.Component {
  constructor(props) {
    var angka = 1;
    super(props);
    this.state = {
      showCreateMenu: false,
      menu: [],
      currentMenu: {},
      alertData: {
        status: 0,
        message: ""
      }
    };
    this.showHandler = this.showHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.unitHandler = this.unitHandler.bind(this);
    this.closeModalHandler = this.closeModalHandler.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.deleteModalHandler = this.deleteModalHandler.bind(this);
    this.viewModalHandler = this.viewModalHandler.bind(this);
    this.editModalHandler = this.editModalHandler.bind(this);
    this.modalStatus = this.modalStatus.bind(this);
  }

  deleteModalHandler(menuid) {
    let tmp = {};
    this.state.menu.map(ele => {
      if (menuid == ele._id) {
        tmp = ele;
      }
    });
    this.setState({
      currentMenu: tmp,
      deleteMenu: true
    });
  }

  viewModalHandler(menuid) {
    let tmp = {};
    this.state.menu.map(ele => {
      if (menuid == ele._id) {
        tmp = ele;
      }
    });
    this.setState({
      currentMenu: tmp,
      viewMenu: true
    });
  }

  editModalHandler(menuid) {
    let tmp = {};
    this.state.menu.map(ele => {
      if (menuid == ele._id) {
        tmp = ele;
      }
    });
    this.setState({
      currentMenu: tmp,
      editMenu: true
    });
  }

  closeModalHandler() {
    this.setState({
      viewMenu: false,
      editMenu: false,
      deleteMenu: false
    });
  }

  showHandler() {
    this.setState({ showCreateMenu: true });
  }

  closeHandler() {
    this.setState({ showCreateMenu: false });
  }

  changeHandler(e) {
    let tmp = this.state.formdata;
    tmp[e.target.name] = e.target.value;
    this.setState({
      formdata: tmp
    });
  }
  unitHandler(e) {
    let tmp = this.state.formdata;
    tmp.m_unit_id = e.target.value;
    this.setState({
      formdata: tmp
    });
  }
  submitHandler() {
    let token = localStorage.getItem(apiconfig.LS.TOKEN);
    let option = {
      url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.MENU,
      method: "post",
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      },
      data: this.state.formdata
    };
    axios(option)
      .then(response => {
        if (response.data.code === 200) {
          alert("Success");
          this.props.history.push("/dashboard");
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  getListMenu() {
    let token = localStorage.getItem(apiconfig.LS.TOKEN);
    let option = {
      url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.MENU,
      method: "get",
      headers: {
        Authorization: token
      }
    };
    axios(option)
      .then(response => {
        this.setState({
          menu: response.data.message
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getListMenu();
  }
  deleteHandler(param) {
    let token = localStorage.getItem(apiconfig.LS.TOKEN);
    let option = {
      url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.MENU + "/" + param,
      method: "delete",
      headers: {
        Authorization: token
      }
    };
    axios(option)
      .then(response => {
        let currentindex = -1;
        this.state.menu.map((ele, idx) => {
          if (ele._id == param) {
            currentindex = idx;
            this.props.history.goBack();
          }
        });
        let tmp = this.state.menu;
        tmp.splice(currentindex, 1);
        this.setState({
          menu: tmp
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  modalStatus(status, message) {
    this.setState({
      alertData: {
        status: status,
        message: message
      },
      viewMenu: false,
      editMenu: false,
      deleteMenu: false
    });
    this.getListUnit();
  }

  searchHandler(e){
    // if(e.target.value == this.state.menu.name){
      console.log(e.target.value)
    // }
    console.log(this.state.menu)
  }

  render() {
    return (
      <div>
        <ul class="breadcrumb">
          <li>
            <a href="#">Home</a> <span class="divider">/</span>
          </li>
          <li>
            <a href="#">Master</a> <span class="divider">/</span>
          </li>
          <li class="active">List Menu</li>
        </ul>

        <div class="container">
          <h4>List Menu</h4>
          {this.state.alertData.status == 1 ? (
            <Alert color="success"> {this.state.alertData.message} </Alert>
          ) : (
            ""
          )}
          {this.state.alertData.status == 2 ? (
            <Alert color="danger"> {this.state.alertData.message} </Alert>
          ) : (
            ""
          )}
          <button
            type="button"
            class="btn btn-primary float-right"
            onClick={this.showHandler}
          >Add</button>


          <CreateMenu
            show={this.state.showCreateMenu}
            modalStatus={this.modalStatus}
            closeHandler={this.closeHandler}
          />
          <ViewMenu
            view={this.state.viewMenu}
            closeModalHandler={this.closeModalHandler}
            menu={this.state.currentMenu}
          />
          <DeleteMenu
            delete={this.state.deleteMenu}
            menu={this.state.currentMenu}
            closeModalHandler={this.closeModalHandler}
            modalStatus={this.modalStatus}
          />
          <EditMenu
            edit={this.state.editMenu}
            closeModalHandler={this.closeModalHandler}
            menu={this.state.currentMenu}
            modalStatus={this.modalStatus}
          />
          <br /> <br />
          <input id="mySearch" onKeyUp={this.searchHandler.bind(this)} type="text" placeholder="Search" class="col-sm-3 padding=5px" />
          <table className="table table-hover">
            <thead>
              <tr>
                <th>No</th>
                <th>Menu Code</th>
                <th>Menu Name</th>
                <th>Created Date</th>
                <th>Created By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
              this.state.menu.map((ele,index) => {
                return (
                  <SingleSouvRow
                    no={index+1}
                    code={ele.code}
                    name={ele.name}
                    _id={ele._id}
                    created_date={ele.created_date}
                    created_by={ele.created_by}
                    viewModalHandler={this.viewModalHandler}
                    editModalHandler={this.editModalHandler}
                    deleteModalHandler={this.deleteModalHandler}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListMenu;
