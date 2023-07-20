import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const OnboardingModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header>
                <Modal.Title>
                    Laundry Onboarding Request
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <h5>Laundry Name</h5>
                        <p>Swatch Laundry Services</p>
                    </div>
                    <div className="form-group">
                        <h5>Laundry Address</h5>
                        <p>Shop No 301, A Wing, Blosom Society, Ujwal Colony, Gajraj Chouk, Swargate, Pune 411068</p>
                    </div>
                    <div className="form-group">
                        <h5>Helper/DB Name</h5>
                        <p>Arun Chaterjee</p>
                    </div>
                    <div className="form-group">
                        <h5>LS Enrollment Fees (per month)</h5>
                        <p>250.00</p>
                    </div>
                </form>
            </Modal.Body>

            <div style={{textAlign:"Right"}} className="onboarding-modal-footer">
                <Button onClick={props.onHide}>
                    Reject
                </Button>
                <Button onClick={props.onHide}>
                    Accept
                </Button>
            </div>
        </Modal>
    )
}

export default OnboardingModal;