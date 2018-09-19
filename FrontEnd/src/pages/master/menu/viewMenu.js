import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import axios from "axios";
import apiconfig from "../../../configs/api.config.json";

class ViewMenu extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.view} className={this.props.className}>
        <ModalHeader> View Unit</ModalHeader>
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
                  value={this.props.menu.code}
                />
              </div>
            </div>

            <div className="form-group row">
              <label for="text" className="col-sm-3 col-form-label">
                Menu Name
              </label>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type Menu Name"
                  readOnly
                  name="name"
                  value={this.props.menu.name}
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
                  readOnly
                  name="controller"
                  value={this.props.menu.controller}
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
                  value={this.props.menu.parent_id}
                  disabled
                >
                  <option> - Select Menu Name - </option>
                  <option>One</option>
                  <option>Two</option>
                </select>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.props.closeModalHandler}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
export default ViewMenu;
