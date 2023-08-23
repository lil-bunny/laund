import React from "react";
import Modal from 'react-bootstrap/Modal';

const CSAddRequestModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header>
                <Modal.Title>
                    New CS add request
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <h5>CS Name</h5>
                        <p>Swatch Laundry Services</p>
                    </div>
                    <div className="form-group">
                        <h5>CS Contact No</h5>
                        <p>9876543210</p>
                    </div>
                    <div className="form-group">
                        <h5>CS Address</h5>
                        <p>Shop No 301, A Wing, Blosom Society, Ujwal Colony, Gajraj Chouk, Swargate, Pune 411068</p>
                    </div>
                    <span className="border-bottom"></span>
                    <div className="form-group">
                        <h5>DB/Helper Name</h5>
                        <p>Arun Chatterjee</p>
                    </div>
                    <div className="form-group">
                        <h5>DB/Helper Contact No</h5>
                        <p>9876543210</p>
                    </div>
                    <span className="border-bottom"></span>
                </form>
            </Modal.Body>

            <div style={{textAlign:"left"}} className="onboarding-modal-footer">
                <button className="cs-request-button" onClick={props.onHide}>
                    OK
                </button>
            </div>
        </Modal>
    )
}

export default CSAddRequestModal;