import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class DeleteUser extends React.Component {
    constructor(props) {
        super(props)
        this.deleteHandler = this.deleteHandler.bind(this)
        this.closeDelete = this.closeDelete.bind(this)
    }
    closeDelete(){
        this.props.closeModalHandler(false)
    }
    

    deleteHandler(){
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.USER+'/'+this.props.user._id,
            method: "delete",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response) => {
            if (response.data.code == 200) {
                this.props.modalStatus(1, 'Success')
            } else {
                this.props.modalStatus(2, 'Failed')
            }
        })
        .catch((error) => { 
            console.log(error)
        })
    }

    render(){
        return(
            <Modal isOpen={this.props.delete} className={this.props.className}>
                <ModalHeader> Delete User </ModalHeader>
                <ModalBody >
                    <p> Delete Data </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.deleteHandler}>Yes</Button>
                    <Button color="danger" onClick={this.closeDelete}>No</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default DeleteUser