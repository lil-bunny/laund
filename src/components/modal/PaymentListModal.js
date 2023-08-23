import React from "react";
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

const PaymentListModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header>
                <Modal.Title>
                    Due Payment List
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="payment-modal">
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Delivery Boy</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Vishal Venkatasan</td>
                                <td>Rs. 1200</td>
                            </tr>
                            <tr>
                                <td>Gopal Pandey</td>
                                <td>Rs. 1060</td>
                            </tr>
                            <tr>
                                <td>Parakram Patil</td>
                                <td>Rs. 550</td>
                            </tr>
                            <tr>
                                <td>Amit Chouhan</td>
                                <td>Rs. 340</td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className="pending-amount-total">
                        <h2>Total Pending Amount</h2>
                        <label>Rs. <span>3150.00</span></label>
                    </div>
                </div>
            </Modal.Body>

            <div className="payment-panel">
                <button className="btn payment-btn" onClick={props.onHide}>
                    OK
                </button>
            </div>

        </Modal>
    )
}

export default PaymentListModal;