import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import apiurl from "@component/api/apiconfig";

import axiosInstance from "@component/api/axiosinstance";
import swal from "sweetalert";
const SendNotificationModal = (props) => {
	const submitHandler = (values) => {
		let url = "";
		if (props.NotificationDetail.type == "service_fee_request_db") {
			url = "delivery-boy/send-notification/" + props.NotificationDetail.id;
		} else if (props.NotificationDetail.type == "service_fee_request_helper") {
			url = "helper/send-notification/" + props.NotificationDetail.id;
		}

		axiosInstance
			.put(apiurl + url, values)
			.then((response) => {
				if (response.status === 1) {
					props.onHide(true);
					swal("success", "Notification has been sent successfully", "success");
					// navigate('/');
				} else if (response.status === 2 && response.errors != "") {
					props.onHide(true);
					swal("Error", "Error in notification", "error");
				}
			})
			.catch((error) => {
				//console.log('Error', error);
				swal("Error", "Error in notification", "error");
				props.onHide(true);
			});
	};

	return (
		<Modal show={props.show} onHide={props.onHide}>
			<Modal.Header>
				<Modal.Title>Send Notification</Modal.Title>
				<button type="button" className="close" onClick={props.onHide}>
					<span aria-hidden="true">&times;</span>
				</button>
			</Modal.Header>
			<Modal.Body>
				<Formik
					initialValues={{
						UPI: "",
						amount: "",
					}}
					validationSchema={yup.object().shape({
						UPI: yup.string().required("UPI is required"),
						amount: yup
							.number()
							.required("Amount is required")
							.test(
								"Is positive?",
								"Amount must be greater than 0!",
								(value) => value > 0
							),
					})}
					onSubmit={(values, { resetForm }) => {
						submitHandler(values);
						resetForm({ values: "" });
					}}
				>
					{({ errors, touched, setFieldValue }) => (
						<Form>
							<div className="form-group">
								<Field
									type="text"
									name="UPI"
									className="form-control mb-2"
									id="UPI"
									placeholder={`Please enter UPI ID`}
								/>
								{touched.UPI && errors.UPI && (
									<div className="form-error">{errors.UPI}</div>
								)}
							</div>

							<div className="form-group">
								<Field
									type="number"
									name="amount"
									className="form-control mb-2"
									id="amount"
									placeholder={`Please enter amount`}
								/>
								{touched.amount && errors.amount && (
									<div className="form-error">{errors.amount}</div>
								)}
							</div>
							<Modal.Footer>
								<Button variant="primary" type="submit">
									Submit
								</Button>
							</Modal.Footer>
						</Form>
					)}
				</Formik>
			</Modal.Body>
		</Modal>
	);
};

export default SendNotificationModal;
