import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class ReasonEvent extends React.Component {
    constructor(props) {
        super(props)
        this.reasonHandler = this.reasonHandler.bind(this)
        // this.closeModalHandler=this.closeModalHandler.bind(this)
    }
    

    reasonHandler(){
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.EVENT,
            method: "post",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response) => {
            if (response.data.code == 200) {
                this.props.modalStatus(1,'Data '+''+this.props.event.code+'has been deleted')
                
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
            <Modal isOpen={this.props.reason} className={this.props.className}>
                <ModalHeader> Reject reason </ModalHeader>
                <ModalBody >
                    <form>
                        <div>
                        <label for="date">Reason</label>
                        <textarea type="text-area" class="form-control" placeholder="Input reject reason"/>                        
                        </div>
                        </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.reasonHandler}>Reject</Button>
                    <Button color="warning" onClick={this.props.closeModalHandler}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default ReasonEvent 