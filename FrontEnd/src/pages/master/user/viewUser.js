import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class ViewUser extends React.Component {
    constructor (props) {
        super(props)
        this.closeView=this.closeView.bind(this)
    }
    
    
    closeView(){
        this.props.closeModalHandler(false)
    }

    render(){
        return(
            <Modal isOpen={this.props.view} className={this.props.className}>
                <ModalHeader> View Unit</ModalHeader>
                <ModalBody >
                <form>
                <div className="form-row">
                    <div className="form-group col">
                        <label for="text">*Role Name</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Type Username"
                            readOnly
                            name="username"
                            value={this.props.user.role}
                            onChange={this.changeHandler}
                            required
                            autoFocus
                        />

                        <label for="text">*Employee Name</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Type Username"
                            readOnly
                            name="username"
                            value={this.props.user.firstname+" "+this.props.user.lastname}
                            onChange={this.changeHandler}
                            required
                            autoFocus
                        />
                    </div>

                    <div className="form-group col">
                        <label for="text">*Username</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Type Username"
                            readOnly
                            name="username"
                            value={this.props.user.username}
                            onChange={this.changeHandler}
                            required
                            autoFocus
                        />
                        
                        <label for="text">*Password</label>
                        <input
                            type="password"
                            class="form-control"
                            placeholder="Type Password"
                            readOnly
                            name="password"
                            value={this.props.user.password}
                            onChange={this.changeHandler}
                            required
                        />

                        <label for="text">*Re-type Password</label>
                        <input
                            type="password"
                            class="form-control"
                            placeholder="Re-type Password"
                            readOnly
                            name="repassword"
                            value={this.props.user.password}
                            onChange={this.confirmPassword}
                            required
                        />
                        
                    </div>
                </div>
                </form>
                {/* <form class="form-inline">
                    <div class ="input-group mb-3 input-group-sm">
                        <label for="text"> *User Code : </label>
                        <input type="text" class="form-control" readOnly
                        name="code" 
                        value={this.props.user.code} 
                        onChange={this.changeHandler} />
                        <label for="text"> *User Name : </label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                        name="name" 
                        value={this.props.user.name} 
                        onChange={this.changeHandler} />
                    </div>
                
                    <div class ="input-group mb-3 input-group-sm"> 
                    <label for="text"> address : </label>
                        <input type="text" class="form-control" placeholder="email" readOnly
                        name="email" 
                        value={this.props.user.email} 
                        onChange={this.changeHandler}/>
                    <label for="text"> address : </label>
                        <input type="text" class="form-control" placeholder="Type address" readOnly
                        name="address" 
                        value={this.props.user.address} 
                        onChange={this.changeHandler}/>
                    </div>
                    
                    <div class ="input-group mb-3 input-group-sm">
                    <label for="text"> phone : </label>
                        <input type="text" class="form-control" placeholder="phone" readOnly
                        name="phone" 
                        value={this.props.user.address} 
                        onChange={this.changeHandler}/>
                   </div>
                </form> */}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.closeView}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default ViewUser