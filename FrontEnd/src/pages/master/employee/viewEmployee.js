import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class ViewEmployee extends React.Component {
    render(){
        return(
            <Modal isOpen={this.props.view} className={this.props.className}>
                <ModalHeader> View Employee</ModalHeader>
                <ModalBody >
                    <form>
                        <div class ="form-row">
                            <div className ="form-group col">
                                <label for="text">Emp ID Number</label>
                                    <input type="text" 
                                    class="form-control" 
                                    placeholder="" readOnly
                                    name="employee_number" 
                                    value={this.props.employee.employee_number} 
                                    onChange={this.changeHandler} />
                                
                                <label>First Name</label>
                                    <input type="text" 
                                        class="form-control" 
                                        placeholder="Type First Name" readOnly
                                        name="first_name" 
                                        value={this.props.employee.first_name} 
                                        onChange={this.changeHandler} 
                                    required />

                                <label>Last Name</label>
                                    <input type="text" class="form-control" 
                                        placeholder="Type Last Name" readOnly
                                        name="last_name" 
                                        value={this.props.employee.last_name}
                                        onChange={this.changeHandler} 
                                    required/>

                            </div>

                            <div className ="form-groupcol">
                            <label>Company Name</label>
                                    <input type="text" class="form-control" readOnly
                                        placeholder="Type Last Name" 
                                        name="last_name" 
                                        value={this.props.employee.company}
                                        onChange={this.changeHandler} 
                                    required/>

                                <label for="text">Email</label>
                                    <input type="email" 
                                        class="form-control" 
                                        placeholder="Type Email" readOnly
                                        name="email" 
                                        value={this.props.employee.email}
                                        onChange={this.changeHandler}
                                        required/>
                                    
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
export default ViewEmployee