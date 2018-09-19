import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class ViewProduct extends React.Component {
    render(){
        return(
            <Modal isOpen={this.props.view} className={this.props.className}>
                <ModalHeader> View Unit</ModalHeader>
                <ModalBody >
                <form class="form-inline">
                    <div class ="input-group mb-3 input-group-sm">
                        <label for="text"> *Product Code : </label>
                        <input type="text" class="form-control" readOnly
                        name="code" 
                        value={this.props.product.code} 
                        onChange={this.changeHandler} />
                    </div>
                </form>
                <form class="form-inline">
                    <div class="input0group mb-3 input-group sm">
                        <label for="text"> *product Name : </label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                        name="name" 
                        value={this.props.product.name} 
                        onChange={this.changeHandler} />
                    </div>
                </form>

                <form class="form-inline">
                    <div class ="input-group mb-3 input-group-sm"> 
                    <label for="text"> Description : </label>
                        <textarea type="text" class="form-control" placeholder="description" readOnly
                        name="description" 
                        value={this.props.product.description}
                        onChange={this.changeHandler}/>
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
export default ViewProduct