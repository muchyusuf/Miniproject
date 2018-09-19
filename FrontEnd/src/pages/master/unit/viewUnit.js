import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class ViewUnit extends React.Component {
    render(){
        return(
            <Modal isOpen={this.props.view} className={this.props.className}>
                <ModalHeader> View Unit</ModalHeader>
                <ModalBody >
                <form class="form-inline">
                <div class ="input-group mb-3 input-group-sm">
                    <table>
                    <div>

                    <tr>
                        <td><label for="text">*Role Code</label></td>
                        <td>
                            <input type="text" class="form-control"  readOnly
                            name="code" value={this.props.unit.code} onChange={this.changeHandler} />
                        </td>
                    </tr>

                    <tr>
                        <td ><label for="text">*Role Name </label></td>
                        <td>
                            <input type="text" class="form-control" 
                            name="name" value={this.props.unit.name} onChange={this.changeHandler} required readOnly />
                        </td>
                    
                    
                    </tr>
                    
                    <tr>
                        <td><label>Description </label></td>
                        <td>
                            <input type="text" class="form-control"  
                            name="description" value={this.props.unit.description} onChange={this.changeHandler} required readOnly />
                        </td>
                    </tr>


                    </div>
                    </table>
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
export default ViewUnit