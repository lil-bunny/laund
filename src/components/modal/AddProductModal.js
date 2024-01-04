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
const AddProductModal = (props) => {
    const [categoryList, setcategoryList] = useState([]);
    const router = useRouter();
    const [SubcategoryList, setSubcategoryList] = useState([]);

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

    const submitHandler = (values) => {

        axiosInstanceMultipart.post(apiurl + 'product/create', values)
            .then((response) => {
                if (response.status === 1) {
                    props.onHide(true);
                    swal("success", "Product added successfully", "success");
                    router.push('/manage-products');
                }
                else if (response.status === 2 && response.errors != '') {
                    props.onHide(true);
                    swal("Error", 'Error in product addition', "error");
                    router.push('/manage-products');
                }
            })
            .catch((error) => {
                props.onHide(true);
                //console.log('Error', error);
                swal("Error", 'Error in product addition', "error");
                router.push('/manage-products');

            });
    };

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header>
                <Modal.Title>
                    Add New Product
                </Modal.Title>
                <button type="button" className="close" onClick={props.onHide}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <Formik

                    initialValues={{
                        product_name: '',
                        category_id: '',
                        sub_category_id: '',
                        file: null,
                    }}
                    validationSchema={yup.object().shape({
                        category_id: yup.string().required("Select a category"),
                        sub_category_id: yup.string().required("Select a sub category"),
                        product_name: yup.string().required("Product name is required"),
                        file: yup.mixed().required("Please select a product image"),
                    })}
                    onSubmit={(values, { resetForm }) => {
                        submitHandler(values);
                        resetForm({ values: '' });
                    }}
                >
                    {({ errors, touched, setFieldValue }) => (
                        <Form>
                            <div className="form-group product-file">
                                <input
                                    type="file"
                                    id="file"
                                    name="file"
                                    accept="image/*"
                                    onChange={(event) => {
                                        setFieldValue("file", event.currentTarget.files[0]);
                                    }}
                                />
                                {touched.file && errors.file && <div className="form-error text-center">{errors.file}</div>}
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

export default AddProductModal;
