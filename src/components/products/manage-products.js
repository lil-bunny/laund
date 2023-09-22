import React, { useState,useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UpdateProductModal from "../modal/UpdateProductModal";
import AddProductModal from "../modal/AddProductModal";
import { imagepath ,per_page_item} from "@component/functions/commonfunction";
import apiurl from "@component/api/apiconfig";
import axiosInstance from "@component/api/axiosinstance";
import Icon from "../icon";

const ManageProducts = () =>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [showadd, setAddShow] = useState(false);
    const handleCloseAdd = () => setAddShow(false);
    const [ProductDetail, setProductDetails] = useState([]);

  
    const imageLocation=imagepath();
    const [image_path, setImagepath] = useState([]);
    const item_per_page=per_page_item();
    const page_number=1;
    const [productList, setData] = useState([]);

    const ProductDetails = (id,product_name,product_image,product_category,product_sub_category,rate) =>{
        setProductDetails({'id':id,'product_name':product_name,'product_image':product_image,'product_category':product_category,'product_sub_category':product_sub_category,'rate':rate});
         setShow(true);
    }
    const OpenAddModel = () =>{
        setAddShow(true);
    }
    
    

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(apiurl+'product/list?page='+page_number+'&limit='+item_per_page);
        setData(response.data); 
        setImagepath(response.image_path);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the function to fetch the data
  }, []);

  const DeleteProduct = (id) =>{
    axiosInstance.delete(apiurl+'product/delete/'+id)
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
        
        const actionFormator = (cell, row) => {
            return   (<div><span className="update-item" onClick={() => ProductDetails(row.id,row.product_name,image_path+row.new_product_image_name,row.product_category.id,row.product_sub_category.id,10)}><Icon icon="fa-pencil" size="1x" color="#3A67BB" /></span> <span className="trash-item" onClick={() => DeleteProduct(row.id)}><Icon icon="fa-trash" size="1x" color="#3A67BB" /></span></div>); 
        }
        const ImageFormator=(cell, row) => {
            return   (<div className="category-image"><img src={image_path+row.new_product_image_name} alt="sort-img" /></div>); 
        }

        const catFormator=(cell,row)=>{
            return (<div><span>{row.product_category.category_name}</span></div>);
        }
        const SubcatFormator=(cell,row)=>{
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

    return(
        <>
            <section className="delivery-boy-panel body-panel">
            <h3>Manage Products</h3>
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
                        data={productList}
                        columns={columns}
                        wrapperClasses="table-responsive"
                    />
                </div>
            </section>
            <UpdateProductModal show={show} onHide={handleClose} ProductDetail={ProductDetail}/> 

            <AddProductModal show={showadd} onHide={handleCloseAdd}/> 
        </>
    )
}

export default ManageProducts;