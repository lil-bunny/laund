import React, { useState,useEffect,useRef  } from "react";
import Overlay from 'react-bootstrap/Overlay';
import apiurl from "@component/api/apiconfig";
import dateFormat from "dateformat";
import { imagepath } from "@component/functions/commonfunction";
import axiosInstance from "@component/api/axiosinstance";
import { useRouter } from "next/router";
const HelperDetails = () => {
    const [show, setShow] = useState(false);
    const target = useRef(null);
    let imageLocation=imagepath();

    const router = useRouter();
    const {id} = router.query;
    const [data, setData] = useState([]);

    useEffect(() => {
        // Function to perform the GET request
        const fetchData = async () => {
          try {
            const response = await axiosInstance.post(apiurl+'helper/helper-details',{id});
            if(response.status===1){
            setData(response.data); // Assuming the response contains the data you need
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData(); // Call the function to fetch the data
      }, []);

    return (
        <>
            <section className="db-details-panel">
                <h1>Helper Details</h1>
                <div className="helper-details db-details-content">
                    <div className="db-details-content-heading">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="db-id">
                                    <h2>DBH{data.id}</h2>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="db-helper d-none">
                                    <img ref={target} onClick={() => setShow(!show)} src={imageLocation+'menu-vertical.png'} alt="menu-img" />
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

                    <div className="helper-details db-details-contents">
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
                                                <p>Helper</p>
                                                <span className="db-contact">
                                                    Contact No: <span>{data.primary_phone_no}, {data.alternate_phone_no}</span>
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
                    
                    </div>
                </div >
            </section >
        </>
    )
}

export default HelperDetails;