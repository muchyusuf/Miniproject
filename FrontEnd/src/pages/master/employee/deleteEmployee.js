import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'
import { debug } from 'util';

class DeleteEmployee extends React.Component {
    constructor(props) {
        super(props)
        this.deleteHandler = this.deleteHandler.bind(this)
    }
    

    deleteHandler(){
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.EMPLOYEE+'/'+this.props.employee._id,
            method: "delete",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response) => {
            if (response.data.code == 200) {
                window.location.reload(this.props.modalStatus(2,  'Data Deleted !'+'Data employee with Employee ID Number '+this.props.employee.employee_number+' has been deleted'))
            } else {
                window.location.reload(this.props.modalStatus(2, 'Failed'))
            }
        })
        .catch((error) => { 
        })
    }

    render(){
        return(
            <Modal isOpen={this.props.delete} className={this.props.className}>
                <ModalHeader> Delete Employee </ModalHeader>
                <ModalBody >
                    <p> Delete Data ID Employee ?
                        <b>{this.props.employee.employee_number}</b>
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.deleteHandler}>Yes</Button>
                    <Button color="danger" onClick={this.props.closeModalHandler}>No</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default DeleteEmployee