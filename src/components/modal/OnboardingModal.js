import React, { useState,useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import apiurl from "@component/api/apiconfig";
import swal from "sweetalert";
import axiosInstance from "@component/api/axiosinstance";


const OnboardingModal = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const OnboardingVarify = (id,bording_status) =>{
        let data = { 
                   'id':''+id+'',
                    'status':''+bording_status+''
                };
        //console.log(data);
        axiosInstance.post(apiurl+'onboarding/onboarding-verify', data)
                .then((response) => {
                    if (response.status === 1) {
                        if(bording_status==1){
                            props.onHide(true);
                      swal("success", "Varified Successfully", "success");
                        }
                        else{
                            props.onHide(true);
                            swal("success", "Rejected Successfully", "success"); 
                        }
                     //props.onHide
                      //setShow(false);
    
                    }
                    else if(response.status === 2){
                        props.onHide(true);
                        swal("Error", 'Something went wrong. Please try again later', "error");
                    }
                })
                .catch((error) => {
                    props.onHide(true);
                    //console.log(modalShow);
                    swal("Error", 'Something went wrong. Please try again later', "error");
                    
            });
        }
     
    return (
        <Modal show={props.show}  onHide={() => setModalShow(false)}>
            <Modal.Header>
                <Modal.Title>
                    Laundry Onboarding Request
                </Modal.Title>
                <button type="button" className="close" onClick={props.onHide}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <h5>Laundry Name</h5>
                        <p>{props.onboardingdata.fullname} Laundry Services</p>
                    </div>
                    <div className="form-group">
                        <h5>Laundry Address</h5>
                        <p>{props.onboardingdata.address}</p>
                    </div>
                    <div className="form-group">
                        <h5>Helper/DB Name</h5>
                        <p>{props.onboardingdata.fullname}</p>
                    </div>
                </form>
            </Modal.Body>

            <div style={{textAlign:"Right"}} className="onboarding-modal-footer">
                <Button onClick={() => 
                    OnboardingVarify(props.onboardingdata.id,'0')
                    
                    }>
                    Reject
                </Button>
                <Button onClick={() => 
                    OnboardingVarify(props.onboardingdata.id,'1')
                    
                    } 
                    >
                    Accept
                </Button>
            </div>
        </Modal>
    )
}

export default OnboardingModal;