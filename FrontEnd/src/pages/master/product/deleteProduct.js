import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class DeleteProduct extends React.Component {
    constructor(props) {
        super(props)
        this.deleteHandler = this.deleteHandler.bind(this)
    }
    

    deleteHandler(){
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.PRODUCT+'/'+this.props.product._id,
            method: "delete",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response) => {
            if (response.data.code == 200) {
                window.location.reload(alert('Data Deleted! Data Unit with code' + ' '+ this.props.product.code +' ' + 'has been deleted'))
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
                <ModalHeader> Delete Unit </ModalHeader>
                <ModalBody >
                    <p>
                        Delete data with <br/> Unit Code : <font color = "blue">{this.props.product.code}</font>
                                                <br/>
                                                 Unit Name : <font color= "blue">{this.props.product.name}</font>
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
export default DeleteProduct