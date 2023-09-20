import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import apiurl from "@component/api/apiconfig";
import axiosInstanceMultipart from "@component/api/axiosinstancemultipart";
import swal from "sweetalert";
const AddServiceModal = (props) => {

    const submitHandler = (values) => {
   
        axiosInstanceMultipart.post(apiurl+'category/create', values)
            .then((response) => {
                if (response.status === 1) {
                    props.onHide(true);   
                 swal("success", "Category added successfully", "success");
                     // navigate('/');
                }
                else if(response.status === 2 && response.errors!=''){
                    props.onHide(true);
                    swal("Error", 'Error in category addition',"error");
                }
            })
            .catch((error) => {
                //console.log('Error', error);
                swal("Error", 'Error in category addition', "error");
                props.onHide(true);
        });
    };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header>
        <Modal.Title>
          Add New Service
        </Modal.Title>
        <button type="button" className="close" onClick={props.onHide}>
                    <span aria-hidden="true">&times;</span>
                </button>
      </Modal.Header>
      <Modal.Body>
        <Formik
        
          initialValues={{
            category_name: '',
            file: null,
        }}
          validationSchema={yup.object().shape({
            category_name: yup.string().required("Category name is required"),
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
                  type="text"
                  name="category_name"
                  className="form-control mb-2"
                  id="category_name"
                  placeholder="Category Name"
                />
                {touched.category_name && errors.category_name && (
                  <div className="form-error">{errors.category_name}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={(event) => {
                    setFieldValue("file", event.currentTarget.files[0]);
                  }}
                />
              </div>
              <Modal.Footer>
                <Button variant="primary" type="submit">Submit</Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddServiceModal;
