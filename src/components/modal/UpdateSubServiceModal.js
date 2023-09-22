import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axiosInstance from "@component/api/axiosinstance";
import apiurl from "@component/api/apiconfig";
import swal from "sweetalert";
import * as yup from "yup";
import { imagepath } from "@component/functions/commonfunction";

const UpdateSubServideModal = (props) => {
  let initialValues = {
    sub_category_id: '',
    sub_category_name: ""
  };

  const submitHandler = (values) => {
   
    axiosInstance.post(apiurl+'sub-category/update', values)
        .then((response) => {
            if (response.status === 1) {
                props.onHide(true);   
             swal("success", "Sub Category updated successfully", "success");
            }
            else if(response.status === 2 && response.errors!=''){
                props.onHide(true);
                swal("Error", 'Error in category addition',"error");
            }
        })
        .catch((error) => {
            swal("Error", 'Error in category addition', "error");
            props.onHide(true);
    });
};

console.log(props.SubCategoryDetails);

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header>
        <Modal.Title>
          Update Sub Category 
        </Modal.Title>
        <button type="button" className="close" onClick={props.onHide}>
                    <span aria-hidden="true">&times;</span>
                </button>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize={true}
          initialValues={Object.assign(initialValues, {
            sub_category_id: props.SubCategoryDetails.id?props.SubCategoryDetails.id : "",
            sub_category_name: props.SubCategoryDetails.sub_category_name?props.SubCategoryDetails.sub_category_name : "",})}
          validationSchema={yup.object().shape({
            sub_category_name: yup.string().required("Sub Category name is required"),
          })}
          onSubmit={(values, { resetForm }) => {
            submitHandler(values);
             resetForm({ values: '' });
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form>
              <div className="form-group">
              <Field
                  type="hidden"
                  name="sub_category_id"
                  className="form-control mb-2"
                  id="sub_category_id"
                />
                <Field
                  type="text"
                  name="sub_category_name"
                  className="form-control mb-2"
                  id="sub_category_name"
                  placeholder="Sub Category Name"
                />
                {touched.sub_category_name && errors.sub_category_name && (
                  <div className="form-error">{errors.sub_category_name}</div>
                )}
              </div>
              <Modal.Footer>
                <Button variant="primary" type="submit">Update</Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateSubServideModal;
