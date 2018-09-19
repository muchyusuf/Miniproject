import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class ViewCompany extends React.Component {
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
                <ModalHeader> View Role</ModalHeader>
                <ModalBody >
                <form>
                    <div className="form-row">
                        <div className="form-group col">
                            <label for="text"> *Role Code </label>
                            <input type="text" class="form-control" readOnly
                            name="code" 
                            value={this.props.role.code} 
                            onChange={this.changeHandler} />
                        </div>
                        <div className="form-group col">
                            <label for="text"> *Role Name </label>
                            <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                            name="name" 
                            value={this.props.role.name} 
                            onChange={this.changeHandler} />
                        </div>
                        {/* <div className="form-group col">
                            <label for="text">  Description </label>
                            <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                            name="name" 
                            value={this.props.role.description} 
                            onChange={this.changeHandler} />
                        </div> */}
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <label for="text">  Description </label>
                            <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                            name="name" 
                            value={this.props.role.description} 
                            onChange={this.changeHandler} />
                        </div>
                    </div>
                
                </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.closeView}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default ViewCompany