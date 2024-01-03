import React, { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import apiurl from "@component/api/apiconfig";

import axiosInstance from "@component/api/axiosinstance";
import { imagepath,per_page_item } from "@component/functions/commonfunction";
import swal from "sweetalert";
import { useRouter } from 'next/router';
const AddSubServiceModal = (props) => {
  const router = useRouter();
    const submitHandler = (values) => {
   
      axiosInstance.post(apiurl+'sub-category/create', values)
            .then((response) => {
                if (response.status === 1) {
                    props.onHide(true);   
                 swal("success", "Sub Category added successfully", "success");
                 router.push('/manage-manage-sub-categories');
                }
                else if(response.status === 2 && response.errors!=''){
                    props.onHide(true);
                    swal("Error", 'Error in sub category addition',"error");
                    router.push('/manage-manage-sub-categories');
                }
            })
            .catch((error) => {
                //console.log('Error', error);
                swal("Error", 'Error in sub category addition', "error");
                props.onHide(true);
        });
    };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header>
        <Modal.Title>
          Add New sub Category
        </Modal.Title>
        <button type="button" className="close" onClick={props.onHide}>
                    <span aria-hidden="true">&times;</span>
                </button>
      </Modal.Header>
      <Modal.Body>
        <Formik
        
          initialValues={{
            sub_category_name: ''
        }}
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
                <Button variant="primary" type="submit">Submit</Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddSubServiceModal;
