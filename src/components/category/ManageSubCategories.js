import React, { useState,useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UpdateSubServideModal from "../modal/UpdateSubServiceModal";

import AddSubServiceModal from "../modal/AddSubServiceModal";

import { imagepath ,per_page_item} from "@component/functions/commonfunction";
import apiurl from "@component/api/apiconfig";
import axiosInstance from "@component/api/axiosinstance";
import Icon from "../icon";

const ManageSubCategories = () =>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [showadd, setAddShow] = useState(false);
    const handleCloseAdd = () => setAddShow(false);
    const [SubCategoryDetails, setSubCategoryDetails] = useState([]);

  
    const imageLocation=imagepath();
    const [image_path, setImagepath] = useState([]);
    const item_per_page=per_page_item();
    const page_number=1;
    const [SubcategoriesList, setData] = useState([]);

    const GetSubCategoryDetails = (id,cat_name) =>{
        setSubCategoryDetails({'id':id,'sub_category_name':cat_name});
         setShow(true);
    }
    const OpenAddModel = () =>{
        setAddShow(true);
    }
    
    

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(apiurl+'sub-category/list?page='+page_number+'&limit='+item_per_page);
        setData(response.data); 
        setImagepath(response.image_path);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the function to fetch the data
  }, []);

  const DeleteSubCategory = (id) =>{
    axiosInstance.delete(apiurl+'sub-category/delete/'+id)
            .then((response) => {
                console.log(response);
                if (response.status ===1) {
                  swal("success", response.message, "success");
                  //fetchData();

                }
                else if(response.status === 2){
                    swal("Error", 'Error in data deletion', "error");
                }
            })
            .catch((error) => {
                //console.log('Error', error);
                swal("Error", 'Error in data deletion', "error");
        });
    }
    console.log(image_path);

        const actionFormator = (cell, row) => {
            return   (<div><span className="update-item" onClick={() => GetSubCategoryDetails(row.id,row.sub_category_name)}><Icon icon="fa-pencil" size="1x" color="#3A67BB" /></span> <span className="trash-item" onClick={() => DeleteSubCategory(row.id)}><Icon icon="fa-trash" size="1x" color="#3A67BB" /></span></div>); 
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

    return(
        <>
            <section className="delivery-boy-panel">
            <h3>Manage Sub Categories</h3>
                <div className="common-table">
                
                    <div className="table-header">
                    <button className="btn btn-secondry" onClick={() => OpenAddModel()}><Icon icon="fa-plus" size="1x" color="#3A67BB" /> Add New</button>
                        <div className="table-search">
                            <form className="form-inline">

                                <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                                <img src={imageLocation+'search.png'} alt="sort-img" />
                            </form>
                        </div>
                    </div>
                    <BootstrapTable
                        keyField='id'
                        data={SubcategoriesList}
                        columns={columns}
                        wrapperClasses="table-responsive"
                    />
                </div>
            </section>
            <UpdateSubServideModal show={show} onHide={handleClose} SubCategoryDetails={SubCategoryDetails} /> 

            <AddSubServiceModal show={showadd} onHide={handleCloseAdd}/> 
        </>
    )
}

export default ManageSubCategories;