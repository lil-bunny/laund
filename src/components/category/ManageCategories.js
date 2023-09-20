import React, { useState,useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UpdateServideModal from "../modal/UpdateServiceModal";

import AddServiceModal from "../modal/AddServiceModal";

import { imagepath ,per_page_item} from "@component/functions/commonfunction";
import apiurl from "@component/api/apiconfig";
import axiosInstance from "@component/api/axiosinstance";
import Icon from "../icon";

const ManageCategories = () =>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [showadd, setAddShow] = useState(false);
    const handleCloseAdd = () => setAddShow(false);
    const [CategoryDetails, setCategoryDetails] = useState([]);

  
    const imageLocation=imagepath();
    const [image_path, setImagepath] = useState([]);
    const item_per_page=per_page_item();
    const page_number=1;
    const [categoriesList, setData] = useState([]);

    const GetCategoryDetails = (id,cat_name,cat_image) =>{
        setCategoryDetails({'id':id,'category_name':cat_name,'category_image':cat_image});
         setShow(true);
    }
    const OpenAddModel = () =>{
        setAddShow(true);
    }
    
    

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(apiurl+'category/list?page='+page_number+'&limit='+item_per_page);
        setData(response.data); 
        setImagepath(response.image_path);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the function to fetch the data
  }, []);

  const DeleteCategory = (id) =>{
    let data = { 'category_id':''+id+''};
    axiosInstance.delete(apiurl+'category/delete/2', {data})
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
            return   (<div><span className="update-item" onClick={() => GetCategoryDetails(row.id,row.category_name,image_path+row.new_category_image_name)}><Icon icon="fa-pencil" size="1x" color="#3A67BB" /></span> <span className="trash-item" onClick={() => DeleteCategory(row.id)}><Icon icon="fa-trash" size="1x" color="#3A67BB" /></span></div>); 
        }
        const ImageFormator=(cell, row) => {
            return   (<div className="category-image"><img src={image_path+row.new_category_image_name} alt="sort-img" /></div>); 
        }
        const status_formator = (cell, row) => {
            if(row.status===0){
                return 'Deleted';
            }
            else if(row.status===1){
                return 'Active';
            }
            else{
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

    return(
        <>
            <section className="delivery-boy-panel">
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
                        data={categoriesList}
                        columns={columns}
                        wrapperClasses="table-responsive"
                    />
                </div>
            </section>
            <UpdateServideModal show={show} onHide={handleClose} CategoryDetails={CategoryDetails} /> 

            <AddServiceModal show={showadd} onHide={handleCloseAdd}/> 
        </>
    )
}

export default ManageCategories;