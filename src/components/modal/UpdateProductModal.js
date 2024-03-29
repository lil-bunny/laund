import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import apiurl from "@component/api/apiconfig";
import axiosInstanceMultipart from "@component/api/axiosinstancemultipart";
import axiosInstance from "@component/api/axiosinstance";
import swal from "sweetalert";
import { useRouter } from 'next/router';
const UpdateProductModal = (props) => {
    const [categoryList, setcategoryList] = useState([]);
    const [previewfile, setFile] = useState();
    const [SubcategoryList, setSubcategoryList] = useState([]);
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(apiurl + 'category/list');
                setcategoryList(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // fetching cat
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(apiurl + 'sub-category/list');
                setSubcategoryList(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // fetching sub cat
    }, []);
//console.log(apiurl);
    const submitHandler = (values) => {

        axiosInstanceMultipart.post(apiurl + 'product/update', values)
            .then((response) => {
                if (response.status === 1) {
                    props.onHide(true);
                    swal("success", "Product updated successfully", "success");
                    router.push('/manage-products');
                }
                else if (response.status === 2 && response.errors != '') {
                    props.onHide(true);
                    swal("Error", 'Error in product updation', "error");
                    router.push('/manage-products');
                }
            })
            .catch((error) => {
                props.onHide(true);
                //console.log('Error', error);
                swal("Error", 'Error in product updation', "error");

            });
    };
    let initialValues = {
        product_id: '',
        product_name: '',
        category_id: '',
        sub_category_id: '',
        // status: '',
        file: null
    };

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header>
                <Modal.Title>
                   Edit Product
                </Modal.Title>
                <button type="button" className="close" onClick={props.onHide}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <Formik

                    enableReinitialize={true}
                    initialValues={Object.assign(initialValues, {
                        product_id: props.ProductDetail.id ? props.ProductDetail.id : "",
                        product_name: props.ProductDetail.product_name ? props.ProductDetail.product_name : "",
                        category_id: props.ProductDetail.product_category ? props.ProductDetail.product_category : "",
                        sub_category_id: props.ProductDetail.product_sub_category ? props.ProductDetail.product_sub_category : "",
                        // status: props.ProductDetail.status ? props.ProductDetail.status : "",

                    })}
                    validationSchema={yup.object().shape({
                        category_id: yup.string().required("Select a category"),
                        sub_category_id: yup.string().required("Select a sub category"),
                        product_name: yup.string().required("Product name is required"),
                        // status: yup.string().required("Status is required"),

                    })}

                    onSubmit={(values, { resetForm }) => {
                        //console.log(values);
                        submitHandler(values);
                        resetForm({ values: '' });
                    }}
                >
                    {({ errors, touched, setFieldValue }) => (
                        <Form>
                            <div className="form-group product-file cat-image">
                                <div className="cat-image-holder"><img src={previewfile ? previewfile : props.ProductDetail.product_image} alt="product-img" /></div>
                                <input
                                    type="file"
                                    id="file"
                                    name="file"
                                    accept="image/*"
                                    onChange={(event) => {
                                        setFieldValue("file", event.currentTarget.files[0]);
                                        setFile(URL.createObjectURL(event.target.files[0]));
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <Field as="select" name="category_id" id="category_id" className="form-control">
                                    <option value="">Select Category</option>
                                    {categoryList.map((value, kayvalue) => {
                                        return (
                                            <option key={kayvalue} value={value.id}>
                                                {value.category_name}
                                            </option>
                                        );
                                    })}

                                </Field>
                                {touched.category_id && errors.category_id && <div className="form-error">{errors.category_id}</div>}
                            </div>

                            <div className="form-group">
                                <Field as="select" name="sub_category_id" id="sub_category_id" className="form-control">
                                    <option value="">Select Sub Category</option>
                                    {SubcategoryList.map((value, kayvalue) => {
                                        return (
                                            <option key={kayvalue} value={value.id}>
                                                {value.sub_category_name}
                                            </option>
                                        );
                                    })}

                                </Field>
                                {touched.sub_category_id && errors.sub_category_id && <div className="form-error">{errors.sub_category_id}</div>}
                            </div>

                            <div className="form-group">
                                <Field
                                    type="hidden"
                                    name="product_id"
                                    className="form-control mb-2"
                                    id="product_id"
                                />
                                <Field
                                    type="text"
                                    name="product_name"
                                    className="form-control mb-2"
                                    id="product_name"
                                    placeholder="Product Name"
                                />
                                {touched.product_name && errors.product_name && (
                                    <div className="form-error">{errors.product_name}</div>
                                )}
                            </div>
                            <div className="form-group d-none">
                                    <Field as="select" name="status" id="status" className="form-control">
                                        <option value="1">Active</option>
                                        <option value="0">Deleted</option>

                                    </Field>
                                {touched.name && errors.status && <div className="form-error">{errors.status}</div>}
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

export default UpdateProductModal;
