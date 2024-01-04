import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axiosInstanceMultipart from "@component/api/axiosinstancemultipart";
import apiurl from "@component/api/apiconfig";
import swal from "sweetalert";
import * as yup from "yup";
import { imagepath } from "@component/functions/commonfunction";
import { useRouter } from 'next/router'
const UpdateServideModal = (props) => {
  let initialValues = {
    category_id: '',
    category_name: "",
    file: null,
  };
  const router = useRouter();
  const submitHandler = (values) => {

    axiosInstanceMultipart.post(apiurl+'category/update', values)
        .then((response) => {
            if (response.status === 1) {
                props.onHide(true);   
             swal("success", "Category updated successfully", "success");
             router.push('/manage-categories');
            }
            else if(response.status === 2 && response.errors!=''){
                props.onHide(true);

                swal("Error", 'Error in category addition',"error");
                router.push('/manage-categories');
            }
        })
        .catch((error) => {
            swal("Error", 'Error in category addition', "error");
            props.onHide(true);
            router.push('/manage-categories');
    });
};

const imageUploadHandler = (events) => {
  const [file] = events.target.files;
  if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = events => {
          current.src = events.target.result;
          setSelectedFile(current.src)
      };
      reader.readAsDataURL(file);
  }
}
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header>
        <Modal.Title>
          Update Service <strong>{props.CategoryDetails.category_name}</strong>
        </Modal.Title>
        <button type="button" className="close" onClick={props.onHide}>
                    <span aria-hidden="true">&times;</span>
                </button>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize={true}
          initialValues={Object.assign(initialValues, {
            category_id: props.CategoryDetails.id?props.CategoryDetails.id : "",
            category_name: props.CategoryDetails.category_name?props.CategoryDetails.category_name : "",})}
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
                  type="hidden"
                  name="category_id"
                  className="form-control mb-2"
                  id="category_id"
                />
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
              <div className="form-group cat-image">
              <div className="cat-image-holder"><img src={ props.CategoryDetails.category_image ? props.CategoryDetails.category_image : imagepath()+'dummy.png'} alt="category-img" /></div>
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
                <Button variant="primary" type="submit">Update</Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateServideModal;
