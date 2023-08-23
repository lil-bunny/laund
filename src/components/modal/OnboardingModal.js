import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import apiurl from "@component/api/apiconfig";
import swal from "sweetalert";
import axiosInstance from "@component/api/axiosinstance";


const OnboardingModal = (props) => {
   
    const OnboardingVarify = (id,bording_status) =>{
        

        let data = { 
                   'id':''+id+'',
                    'status':''+bording_status+''
                };
        //console.log(data);
        axiosInstance.post(apiurl+'onboarding-verify', data)
                .then((response) => {
                    if (response.status === 1) {
                        if(bording_status==1){
                      swal("success", "Varified Successfully", "success");
                        }
                        else{
                            swal("success", "Rejected Successfully", "success"); 
                        }
                     //props.onHide
                      //setShow(false);
    
                    }
                    else if(response.status === 2){
                        swal("Error", 'Something went wrong. Please try again later', "error");
                    }
                })
                .catch((error) => {
                    //console.log('Error', error);
                    swal("Error", 'Something went wrong. Please try again later', "error");
            });
        }
    
    return (
        <Modal show={props.show} onHide={props.onHide} onboardingdata={props.onboardingdata}>
            <Modal.Header>
                <Modal.Title>
                    Laundry Onboarding Request
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <h5>Laundry Name</h5>
                        <p>Swatch Laundry Services</p>
                    </div>
                    <div className="form-group">
                        <h5>Laundry Address</h5>
                        <p>Shop No 301, A Wing, Blosom Society, Ujwal Colony, Gajraj Chouk, Swargate, Pune 411068</p>
                    </div>
                    <div className="form-group">
                        <h5>Helper/DB Name</h5>
                        <p>Arun Chaterjee</p>
                    </div>
                    <div className="form-group">
                        <h5>LS Enrollment Fees (per month)</h5>
                        <p>250.00</p>
                    </div>
                </form>
            </Modal.Body>

            <div style={{textAlign:"Right"}} className="onboarding-modal-footer">
                <Button onClick={() => 
                    OnboardingVarify(props.onboardingdata,'0')
                    
                    }>
                    Reject
                </Button>
                <Button onClick={() => 
                    OnboardingVarify(props.onboardingdata,'1')
                    
                    } >
                    Accept
                </Button>
            </div>
        </Modal>
    )
}

export default OnboardingModal;