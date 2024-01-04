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
						message: "",
					}}
					validationSchema={yup.object().shape({
						message: yup.string().required("Message is required"),
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
									name="message"
									render={({
										field /* { name, value, onChange, onBlur } */,
									}) => (
										<textarea
											{...field}
											rows="7"
											className="form-control mb-2"
											placeholder={`Please ${props.NotificationDetail.name} pay service charge {100} to B-Tecno E Com Ventures. Pay at btecnoecomventures.ibz@icici`}
										></textarea>
									)}
								/>
								{/* <Field
									type="textarea"
									name="message"
									className="form-control mb-2"
									id="message"
									placeholder={`Please ${props.NotificationDetail.name}  pay service charge {100} to B-Tecno E Com Ventures. Pay at btecnoecomventures.ibz@icici`}
								/> */}
								{touched.message && errors.message && (
									<div className="form-error">{errors.message}</div>
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
