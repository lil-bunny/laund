import React from "react";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

const PaymentListModal = (props) => {
  console.log(props.paymentList);
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header>
        <Modal.Title>Due Payment List</Modal.Title>
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
              {props.paymentList?.map((value_list, keylist) => {
                return (
                  <tr key={keylist}>
                    <td>
                      {value_list.deliveryBoy_firstName}{" "}
                      {value_list.deliveryBoy_lastName}
                    </td>
                    <td>{value_list.remaining_amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className="pending-amount-total">
            <h2>Total Pending Amount</h2>
            <label>
              Rs.{" "}
              <span>
                {props.reamaining_amount !== null &&
                  typeof props.reamaining_amount !== "undefined" &&
                  props.reamaining_amount.toFixed(2)}
              </span>
            </label>
          </div>
        </div>
      </Modal.Body>

      <div className="payment-panel">
        <button className="btn payment-btn" onClick={props.onHide}>
          OK
        </button>
      </div>
    </Modal>
  );
};

export default PaymentListModal;
