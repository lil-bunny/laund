import React, { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UpdateServideModal from "../modal/UpdateServiceModal";

import AddServiceModal from "../modal/AddServiceModal";

import { imagepath, per_page_item } from "@component/functions/commonfunction";
import apiurl from "@component/api/apiconfig";
import axiosInstance from "@component/api/axiosinstance";
import Icon from "../icon";

const ManageCategories = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [showadd, setAddShow] = useState(false);
    const handleCloseAdd = () => setAddShow(false);
    const [CategoryDetails, setCategoryDetails] = useState([]);


    const imageLocation = imagepath();
    const [image_path, setImagepath] = useState([]);
    const [categoriesList, setData] = useState([]);
    const [total_items, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const itemsPerPage = per_page_item();

    const GetCategoryDetails = (id, cat_name, cat_image) => {
        setCategoryDetails({ 'id': id, 'category_name': cat_name, 'category_image': cat_image });
        setShow(true);
    }
    const OpenAddModel = () => {
        setAddShow(true);
    }




    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(apiurl + 'category/list?page=' + currentPage + '&limit=' + itemsPerPage);
            setData(response.data);
            setImagepath(response.image_path);
            setTotalItems(response.count);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData(); // Call the function to fetch the data
    }, [currentPage]);

    const DeleteCategory = (id) => {
        axiosInstance.delete(apiurl + 'category/delete/' + id)
            .then((response) => {
                if (response.status === 1) {
                    swal("success", response.message, "success");
                    //fetchData();

                }
                else if (response.status === 2) {
                    swal("Error", 'Error in data deletion', "error");
                }
            })
            .catch((error) => {
                //console.log('Error', error);
                swal("Error", 'Error in data deletion', "error");
            });
    }


    const actionFormator = (cell, row) => {
        return (<div><span className="update-item" onClick={() => GetCategoryDetails(row.id, row.category_name, image_path + row.new_category_image_name)}><Icon icon="fa-pencil" size="1x" color="#3A67BB" /></span> <span className="trash-item" onClick={() => DeleteCategory(row.id)}><Icon icon="fa-trash" size="1x" color="#3A67BB" /></span></div>);
    }
    const ImageFormator = (cell, row) => {
        return (<div className="category-image"><img src={image_path + row.new_category_image_name} alt="sort-img" /></div>);
    }
    const status_formator = (cell, row) => {
        if (row.status === 0) {
            return 'Deleted';
        }
        else if (row.status === 1) {
            return 'Active';
        }
        else {
            return 'Active';
        }
    }
    const columns = [
        {
            dataField: 'id',
            text: 'Service Id'
        },
        {
            dataField: 'category_image',
            text: 'Image',
            formatter: ImageFormator

        },
        {
            dataField: 'category_name',
            text: 'Name',

        },

        {
            dataField: 'status',
            text: 'status',
            formatter: status_formator
        },

        {
            dataField: 'action',
            text: 'Action',
            formatter: actionFormator
        },


    ];

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const handleSearch = (event) => {
        // console.log(event.target.value);
        setSearchText(event.target.value);
    };

    const filteredData = categoriesList.filter((item) =>
        Object.values(item).some((field) =>
            String(field).toLowerCase().includes(searchText.toLowerCase())
        )
    );
    const renderItems = () => {
        return Array.from({ length: Math.ceil(total_items / itemsPerPage) }, (_, index) => (
            <button key={index} onClick={() => handlePageChange(index + 1)} className={currentPage === index + 1 ? "active" : ""}>{index + 1}</button>
        ));
    };

    const PaginationHtml = () => {
        if (Math.ceil(total_items / itemsPerPage) > 1) {
            return <div className="custom-pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <Icon icon="fa-arrow-left" />
                </button>
                {renderItems()}
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(total_items / itemsPerPage)}><Icon icon="fa-arrow-right" />
                </button>
            </div>
        }
    };

    return (
        <>
            <section className="delivery-boy-panel body-panel">
                <h3>Manage Categories</h3>
                <div className="common-table">

                    <div className="table-header">
                        <button className="btn btn-secondry" onClick={() => OpenAddModel()}><Icon icon="fa-plus" size="1x" color="#3A67BB" /> Add New</button>
                        <div className="table-search">
                            <form className="form-inline">

                                <input className="form-control" type="search" placeholder="Search" aria-label="Search" value={searchText}
                                    onChange={handleSearch} />
                                <img src={imageLocation + 'search.png'} alt="sort-img" />
                            </form>
                        </div>
                    </div>
                    <BootstrapTable
                        keyField='id'
                        data={filteredData}
                        columns={columns}
                        wrapperClasses="table-responsive"
                    />
                    {PaginationHtml()}
                </div>
            </section>
            <UpdateServideModal show={show} onHide={handleClose} CategoryDetails={CategoryDetails} />

            <AddServiceModal show={showadd} onHide={handleCloseAdd} />
        </>
    )
}

export default ManageCategories;