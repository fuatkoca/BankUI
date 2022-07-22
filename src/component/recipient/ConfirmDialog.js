import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const ConfirmDialog = (props) => {

    const deleteHandler = async () => {
        props.delete();
    }
    return (
        <div>
            <Modal isOpen={props.isOpen} centered fullscreen="sm" size="sm">
                <ModalHeader>
                    Delete Recipient Confimation
                </ModalHeader>
                <ModalBody>
                    {`Are you sure to delete the recipient account number:${props.recipient.accountNumber}`}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={deleteHandler}>Yes</Button>
                    <Button color="danger" onClick={() => props.close(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ConfirmDialog