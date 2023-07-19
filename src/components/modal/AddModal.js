import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AddModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header>
                <Modal.Title>
                    DB Join Request
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label>First Name As Per Aadhar<span>*</span></label>
                        <input className="form-control" type="text" defaultValue={'Sarmila'}></input>
                    </div>
                    <div className="form-group">
                        <label>Last Name As Per Aadhar<span>*</span></label>
                        <input className="form-control" type="text" defaultValue={'K'}></input>
                    </div>
                    <div className="form-group">
                        <label>Primary Mobile Number<span>*</span></label>
                        <input className="form-control" type="text" defaultValue={9876543210}></input>
                    </div>
                    <div className="form-group">
                        <label>Pin Code<span>*</span></label>
                        <input className="form-control" type="text" defaultValue={411024}></input>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.onHide}>
                    Send for Subscription Fee
                </Button>
                <Button variant="primary" onClick={props.onHide}>
                    ACCEPT
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddModal;