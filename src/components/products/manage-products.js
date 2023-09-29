import React, { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UpdateProductModal from "../modal/UpdateProductModal";
import AddProductModal from "../modal/AddProductModal";
import { imagepath, per_page_item } from "@component/functions/commonfunction";
import apiurl from "@component/api/apiconfig";
import axiosInstance from "@component/api/axiosinstance";
import Icon from "../icon";

const ManageProducts = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [showadd, setAddShow] = useState(false);
    const handleCloseAdd = () => setAddShow(false);
    const [ProductDetail, setProductDetails] = useState([]);


    const imageLocation = imagepath();
    const [image_path, setImagepath] = useState([]);

    const [productList, setData] = useState([]);
    const [total_items, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const itemsPerPage = per_page_item();

    const ProductDetails = (id, product_name, product_image, product_category, product_sub_category) => {
        setProductDetails({ 'id': id, 'product_name': product_name, 'product_image': product_image, 'product_category': product_category, 'product_sub_category': product_sub_category});
        setShow(true);
    }
    const OpenAddModel = () => {
        setAddShow(true);
    }




    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(apiurl + 'product/list?page=' + currentPage + '&limit=' + itemsPerPage);
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

    const DeleteProduct = (id) => {
        axiosInstance.delete(apiurl + 'product/delete/' + id)
            .then((response) => {
                console.log(response);
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
        return (<div><span className="update-item" onClick={() => ProductDetails(row.id, row.product_name, image_path + row.new_product_image_name, row.product_category.id, row.product_sub_category.id)}><Icon icon="fa-pencil" size="1x" color="#3A67BB" /></span> <span className="trash-item" onClick={() => DeleteProduct(row.id)}><Icon icon="fa-trash" size="1x" color="#3A67BB" /></span></div>);
    }
    const ImageFormator = (cell, row) => {
        if(row.new_product_image_name!=null){
        return (<div className="category-image"><img src={image_path + row.new_product_image_name} alt="sort-img" /></div>);
        }
        else{
            return (<div></div>); 
        }
    }

    const catFormator = (cell, row) => {
        return (<div><span>{row.product_category.category_name}</span></div>);
    }
    const SubcatFormator = (cell, row) => {
        return (<div><span>{row.product_sub_category.sub_category_name}</span></div>);
    }

    const columns = [
        {
            dataField: 'id',
            text: 'Product ID'
        },
        {
            dataField: 'new_product_image_name',
            text: 'Image',
            formatter: ImageFormator

        },
        {
            dataField: 'product_name',
            text: 'Name',

        },

        {
            dataField: 'product_category',
            text: 'Category',
            formatter: catFormator

        },

        {
            dataField: 'sub_category_name',
            text: 'Sub Category',
            formatter: SubcatFormator

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

    const filteredData = productList.filter((item) =>
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
                <h3>Manage Products</h3>
                <div className="common-table">

                    <div className="table-header">
                        <button className="btn btn-secondry btn-add-new" onClick={() => OpenAddModel()}>Add New</button>
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
            <UpdateProductModal show={show} onHide={handleClose} ProductDetail={ProductDetail} />

            <AddProductModal show={showadd} onHide={handleCloseAdd} />
        </>
    )
}

export default ManageProducts;