import React, { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UpdateSubServideModal from "../modal/UpdateSubServiceModal";

import AddSubServiceModal from "../modal/AddSubServiceModal";

import { imagepath, per_page_item } from "@component/functions/commonfunction";
import apiurl from "@component/api/apiconfig";
import axiosInstance from "@component/api/axiosinstance";
import Icon from "../icon";

const ManageSubCategories = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [showadd, setAddShow] = useState(false);
    const handleCloseAdd = () => setAddShow(false);
    const [SubCategoryDetails, setSubCategoryDetails] = useState([]);


    const imageLocation = imagepath();
    const [image_path, setImagepath] = useState([]);
    const [SubcategoriesList, setData] = useState([]);
    const [total_items, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const itemsPerPage = per_page_item();

    const GetSubCategoryDetails = (id, cat_name) => {
        setSubCategoryDetails({ 'id': id, 'sub_category_name': cat_name });
        setShow(true);
    }
    const OpenAddModel = () => {
        setAddShow(true);
    }




    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(apiurl + 'sub-category/list?page=' + currentPage + '&limit=' + itemsPerPage);
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

    const DeleteSubCategory = (id) => {
        axiosInstance.delete(apiurl + 'sub-category/delete/' + id)
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
    // console.log(image_path);

    const actionFormator = (cell, row) => {
        return (<div><span className="update-item" onClick={() => GetSubCategoryDetails(row.id, row.sub_category_name)}><Icon icon="fa-pencil" size="1x" color="#3A67BB" /></span> <span className="trash-item" onClick={() => DeleteSubCategory(row.id)}><Icon icon="fa-trash" size="1x" color="#3A67BB" /></span></div>);
    }
    const columns = [
        {
            dataField: 'id',
            text: 'Service Id'
        },

        {
            dataField: 'sub_category_name',
            text: 'Name',

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

    const filteredData = SubcategoriesList.filter((item) =>
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
            <section className="delivery-boy-panel">
                <h3>Manage Sub Categories</h3>
                <div className="common-table">

                    <div className="table-header">
                        <button className="btn btn-secondry" onClick={() => OpenAddModel()}><Icon icon="fa-plus" size="1x" color="#3A67BB" /> Add New</button>
                        <div className="table-search">
                            <form className="form-inline">

                                <input className="form-control" type="search" placeholder="Search" aria-label="Search" value={searchText} onChange={handleSearch} />
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
            <UpdateSubServideModal show={show} onHide={handleClose} SubCategoryDetails={SubCategoryDetails} />

            <AddSubServiceModal show={showadd} onHide={handleCloseAdd} />
        </>
    )
}

export default ManageSubCategories;