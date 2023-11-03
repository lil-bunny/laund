import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const LsissueModal = (props) => {
    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    console.log(props.orderUniqueID);
    return (

        <Modal show={props.show} className="model-issue">
            <Modal.Header>
                <Modal.Title>

                </Modal.Title>
                <button type="button" className="close" onClick={props.onHide}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <div className="ls-issue-rased">
                    {
                        (() => {
                            if (props.lsIssueRaised == '' || typeof props.lsIssueRaised === 'undefined') {
                                return (

                                    <span>No issue found</span>

                                )
                            }
                        })()
                    }
                    <Slider {...settings}>
                        {

                            props.lsIssueRaised?.map((value, kayvalue) => {
                                return (
                                    <div className="silder-content" key={kayvalue}>
                                        <h6>{props.orderUniqueID}</h6>

                                        <div className="silder-sing">
                                            <span>Issue no {kayvalue + 1}</span>
                                            <p>{value.issue_type.type}</p>
                                        </div>

                                        <div className="silder-sing">
                                            <span>Details</span>
                                            <p>{value.issue_details}</p>
                                        </div>

                                        <span>Photo Proof</span>
                                        <figure className="issue-image">
                                            <img src={props.issueImageUrl + value.new_file_name} alt="" />
                                        </figure>
                                    </div>
                                );
                            })
                        }

                    </Slider>
                </div>
            </Modal.Body>
        </Modal>


    )
}

export default LsissueModal;