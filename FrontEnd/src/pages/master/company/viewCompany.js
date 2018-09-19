import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class ViewCompany extends React.Component {
    render(){
        return(
            <Modal isOpen={this.props.view} className={this.props.className}>
                <ModalHeader> View Unit</ModalHeader>
                <ModalBody >
                <form>
                 <div className="form-row">
                    <div className="form-group col">
                        <label for="text">Company Code</label>
                        <input
                        type="text"
                        class="form-control"
                        placeholder=""
                        readOnly
                        name="code"
                        value={this.props.company.code}
                        onChange={this.changeHandler}
                        />
                    </div>

                    <div className="form-group col">
                        <label for="text">Company Name</label>
                        <input
                        type="text"
                        class="form-control"
                        placeholder="Company Name"
                        readOnly
                        name="name"
                        value={this.props.company.name}
                        onChange={this.changeHandler}
                        required
                        />
                    </div>
            </div>

            <div className="form-row">
              <div className="form-group col">
                <label>Email</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="em@il"
                  readOnly
                  name="email"
                  value={this.props.company.email}
                  onChange={this.changeHandler}
                  required
                />
                <label>phone</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="phone"
                  readOnly
                  name="phone"
                  value={this.props.company.phone}
                  onChange={this.changeHandler}
                  required
                />
              </div>
              <div className="form-group col">
                <label for="text">address</label>
                <textarea
                  rows="4"
                  type="text-area"
                  class="form-control"
                  placeholder="address"
                  readOnly
                  name="address"
                  value={this.props.company.address}
                  onChange={this.changeHandler}
                  required
                />
              </div>
            </div>
          </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.props.closeModalHandler}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default ViewCompany