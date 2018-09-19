import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import axios from "axios";
import apiconfig from "../../../configs/api.config.json";

class CreateMenu extends React.Component {
  constructor(props) {
    super(props);
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    this.state = {
      formdata: {
        code: "",
        name: "",
        controller: "",
        parent_id: "",
        created_by: userdata.username
      }      
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  changeHandler(e) {
    let tmp = this.state.formdata;
    tmp[e.target.name] = e.target.value;
    this.setState({
      formdata: tmp
    });
    debugger
  }
  submitHandler() {
    // debugger   
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
    // debugger

    axios(option)
      .then(response => {
        if (response.data.code == 200) {
          alert("Success create");
          this.props.modalStatus(1, 'Success create data !')
          debugger
        } else {
          alert(response.data.message);
          this.props.modalStatus(2, 'Failed create data')
          
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <Modal isOpen={this.props.show} className={this.props.className}>
        <ModalHeader> Add Menu</ModalHeader>
        <ModalBody>
          <form>
            <div className="form-group row">
              <label for="text" className="col-sm-3 col-form-label">
                Menu Code
              </label>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Auto Generated"
                  readOnly
                  name="code"
                  value={this.state.formdata.code}
                  onChange={this.changeHandler}
                />
              </div>
            </div>

            <div className="form-group row">
              <label for="validname" className="col-sm-3 col-form-label">
                Menu Name
              </label>
              <div className="col">
                <input
                  id="validname"
                  type="text"
                  className="form-control"
                  placeholder="Type Menu Name"
                  name="name"
                  value={this.state.formdata.name}
                  onChange={this.changeHandler}
                />
              </div>
            </div>

            <div className="form-group row">
              <label for="text" className="col-sm-3 col-form-label">
                Controller Name
              </label>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type Controller"
                  name="controller"
                  value={this.state.formdata.controller}
                  onChange={this.changeHandler}
                />
              </div>
            </div>

            <div className="form-group row">
              <label for="text" className="col-sm-3 col-form-label">
                Parent
              </label>
              <div className="col">
                <select
                  className="custom-select mr-sm"
                  name="parent_id"
                  value={this.state.formdata.parent_id}
                  onChange={this.changeHandler}
                >
                  <option selected> - Select Menu Name - </option>
                  <option>One</option>
                  <option>Two</option>
                </select>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.submitHandler}>
            Save
          </Button>
          <Button color="warning" onClick={this.props.closeHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
export default CreateMenu;
