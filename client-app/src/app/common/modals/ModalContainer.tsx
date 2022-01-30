import { observer } from "mobx-react-lite";
import React from "react";
import { Modal } from "semantic-ui-react";
import { useStore } from "../../stores/Store";

export default observer( function ModalConatiner() {
    const { modalStore } = useStore()
    
    return (
        <Modal
            open={modalStore.modal.open}
            onClose={modalStore.closeModal}
            size='small'
        >
            <Modal.Content>
                {modalStore.modal.body}
            </Modal.Content>

        </Modal>
    )
})