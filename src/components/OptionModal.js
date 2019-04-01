import React from 'react'
import Modal from 'react-modal'

const OptionModal = (props) => (
    <Modal
        appElement={document.getElementById('app')}
        className="modal"
        closeTimeoutMS={200}
        contentLabel="Selected Option"
        isOpen={props.isOpen}
        onRequestClose={props.close}
    >
        <h3 className="modal__title">Selected Option</h3>
        {props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
        <button
            className="button"
            onClick={props.close}
        >
            Okay
        </button>
    </Modal>
)

export default OptionModal