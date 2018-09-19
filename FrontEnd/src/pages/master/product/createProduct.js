import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import axios from "axios";
import apiconfig from "../../../configs/api.config.json";

class CreateProduct extends React.Component {
  constructor(props) {
    super(props);
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    this.state = {
      formdata: {
        code: "",
        name: "",
        description: "",
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
  }
  submitHandler() {
    let token = localStorage.getItem(apiconfig.LS.TOKEN);
    console.log(this.state);
    //debugger
    let option = {
      url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.PRODUCT,
      method: "post",
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      },
      data: this.state.formdata
    };
    console.log(option);
    //debugger
    axios(option)
      .then(response => {
        console.log(response);
        debugger;
        if (response.data.code === 200) {
          window.location.reload(alert("Success"));
          this.props.history.push("/dashboard");
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {});
  }
  render() {
    return (
      <Modal isOpen={this.props.show} className={this.props.className}>
        <ModalHeader> Add Product</ModalHeader>
        <ModalBody>
          <form>
            <div className="form-row">
              <div className="form-group col">
                <div class="input-group mb-3 input-group-sm">
                  <label for="text">Product Code : </label>
                 
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Auto Code Generator"
                    readOnly
                    name="code"
                    value={this.state.formdata.code}
                    onChange={this.changeHandler}
                  />
                </div>
              </div>
            </div>
         
            <div className="form-row">
              <div className="form-group col">
                <div class="input-group mb-3 input-group-sm">
                  <label for="text">Product Name : </label>
                  
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Product Name"
                    name="name"
                    value={this.state.formdata.name}
                    onChange={this.changeHandler}
                    required
                  />
                </div>
              </div>
            </div>
          
            <div className="form-row">
              <div className="form-group col">
                <div class="input-group mb-3 input-group-sm">
                  <label>Description : </label>
                  
                  <textarea
                    type="text"
                    class="form-control"
                    placeholder="Description"
                    name="description"
                    value={this.state.formdata.description}
                    onChange={this.changeHandler}
                    required
                  />
                </div>
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
export default CreateProduct;
