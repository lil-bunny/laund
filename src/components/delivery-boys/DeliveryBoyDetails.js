import React, { useState,useRef,useEffect } from "react";
import Overlay from 'react-bootstrap/Overlay';
import BootstrapTable from 'react-bootstrap-table-next';
import AddModal from "../modal/AddModal";
import dateFormat from "dateformat";
import { useRouter } from "next/router";
import apiurl from "@component/api/apiconfig";
import { imagepath,NoDataText } from "@component/functions/commonfunction";
import axiosInstance from "@component/api/axiosinstance";
import Icon from "../icon";

const DeliveryBoyDetails = () => {
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const router = useRouter();
    const {id} = router.query;
    const [data, setData] = useState([]);
    const [rates, setRates] = useState([]);
    const[emptyDataMessage,SetNodataText]=useState('');
    let ItemNotFound=NoDataText();
       useEffect(() => {
        // Function to perform the GET request
        const fetchData = async () => {
          try {
            const response = await axiosInstance.post(apiurl+'delivery-boy/laundry-associate-details',{id});
            if(response.status===1){
            setData(response.data); // Assuming the response contains the data you need
            if(response.data.product_prices.count!=0){
                setRates(response.data.product_prices);
            }
            else{
                SetNodataText(ItemNotFound); 
            }
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData(); // Call the function to fetch the data
      }, []);
      const idFormater = (cell, row) => {
        return `${row.product.id}`
      }
      const product_nameFormate = (cell, row) => {
        return `${row.product.product_name}`
      }
      const statusFormator = (cell, row) => {
       if(row.status==1){
        return 'Active';

       }
       else{
        return 'In Active';
       }
      }

      const columns = [
       
        {
            dataField: 'id',
            text: 'Product ID',
            formatter: idFormater,
        },
        {
            dataField: 'product_name',
            text: 'Product Name',
            formatter: product_nameFormate,
        },
        {
            dataField: 'rate',
            text: 'Rate'
           
        },
        {
            dataField: 'status',
            text: 'Status',
            formatter: statusFormator
        },
    ];
    return (
        <>
            <section className="db-details-panel">
                <h1>Delivery Boy Details</h1>
                <div className="customer-details">
                <div className="db-details-content">
                    <div className="db-details-content-heading">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="db-id">
                                    <h2>DB{data.id}</h2>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="db-helper">

                                    <img ref={target} onClick={() => setShow(!show)} src={imagepath()+'menu-vertical.png'} alt="menu-img" />
                                    <Overlay target={target.current} show={show} placement="left">
                                        {({
                                            placement: _placement,
                                            arrowProps: _arrowProps,
                                            show: _show,
                                            popper: _popper,
                                            hasDoneInitialMeasure: _hasDoneInitialMeasure,
                                            ...props
                                        }) => (
                                            <div className="tooltip"
                                                {...props}
                                                style={{
                                                    position: 'absolute',
                                                    fontWeight: '600',
                                                    fontSize: '14px',
                                                    ...props.style,
                                                }}
                                            >

                                                Enrolled On
                                                <span>{dateFormat(`${data.enrollmentDate}`, "dS mmmm, yyyy")}</span>
                                            </div>
                                        )}
                                    </Overlay>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="db-details-contents">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="db-details-profile">
                                            <span className="profile-image">
                                                <img src={ data.new_profile_image_name ? data.new_profile_image_name : imagepath()+'dummy.png'} alt="prof-img" />
                                            </span>
                                            <div className="right-prof-panel">
                                                <h2>{data.firstName} {data.lastName}</h2>
                                                <p>Delivery Boy</p>
                                                <span className="db-contact">
                                                    Contact No: <span>{data.primary_phone_no}</span>
                                                </span>
                                                <span className="db-prof-address">
                                                {data.address}, {data.cityName} {data.pincode}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span className="profile-footer-border"></span>
                            </div>
                        </div>
                        <div className="row content-row">
                            <div className="col-md-12">
                                <h4>Other Details</h4>
                                
                                <div className="row enrollment-row">
                                    <div className="col-md-3 mt-2">
                                        <h5>Email Addess</h5>
                                    </div>
                                    <div className="col-md-9 mt-2">
                                        <input readOnly className="form-control" type="text" defaultValue={data.email} />
                                    </div>

                                    <div className="col-md-3 mt-2">
                                        <h5>Date Of Birth</h5>
                                    </div>
                                    <div className="col-md-9 mt-2">
                                        <input readOnly className="form-control" type="text" defaultValue={data.dob} />
                                    </div>
                                    <div className="col-md-3 mt-2">
                                        <h5>Phone Number</h5>
                                    </div>
                                    <div className="col-md-9 mt-2">
                                        <input readOnly className="form-control" type="text" defaultValue={data.primary_phone_no} />
                                    </div>
                                    <div className="col-md-3 mt-2">
                                        <h5>City</h5>
                                    </div>
                                    <div className="col-md-9 mt-2">
                                        <input readOnly className="form-control" type="text" defaultValue={data.cityName} />
                                    </div>
                                    <div className="col-md-3 mt-2">
                                        <h5>Pin Code</h5>
                                    </div>
                                    <div className="col-md-9 mt-2">
                                        <input readOnly className="form-control" type="text" defaultValue={data.pincode} />
                                    </div>
                                </div>
                            </div>
                            
                                
                            <h2>Rates</h2>
                                <BootstrapTable
                                    keyField='id'
                                    data={rates}
                                    columns={columns}
                                    wrapperClasses="table-responsive"
                            />
                            <span className="profile-footer-border"></span>
                            <div className="footer-button">
                                <a className="btn btn-primary btn-back" href={'/delivery-boy/'}>BACK</a>
                            </div>
                        </div>
                    </div>
                </div >
                </div>
            </section >
        </>
    )
}

export default DeliveryBoyDetails;