import React, { useContext,useState,useEffect} from "react";
import { useRouter } from 'next/router'
import Link from 'next/link';
import Dropdown from 'react-bootstrap/Dropdown';
import apiurl from "@component/api/apiconfig";
import axiosInstance from "@component/api/axiosinstance";
import { imagepath,backButtonClass} from "@component/functions/commonfunction";
import { useRoutePath } from 'next/router';
const Header = (props) => {
    let initialToken;
    const router = useRouter();
    const [data, setData] = useState([]);
    let imageLocation=imagepath();
    let backButtonclass=backButtonClass(router.pathname);
    useEffect(() => {
        // Function to perform the GET request
        const fetchData = async () => {
          try {
            const response = await axiosInstance.get(apiurl+'auth/admin-details');
          
            setData(response.data); // Assuming the response contains the data you need
            
          } catch (error) {
            if(error=='AxiosError: Request failed with status code 401'){
                localStorage.removeItem('token');
                router.push('/login');
            }
          
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData(); // Call the function to fetch the data
      }, []);
   
  
    const logoutHandler = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }
    const SettingHandler = () => {
      //  localStorage.removeItem('token');
        router.push('/settings');
    }
    const notoficationHandler = () => {
        //  localStorage.removeItem('token');
          router.push('/notification');
      }
    // if(data.length==0){
    //     localStorage.removeItem('token');
    //      router.push('/login');
    // }

    console.log(router.pathname);
    

    
    return (
        <>
            <nav className="main-header navbar navbar-expand">
                <a className={backButtonclass+' back-button align-items-center mx-2'} href="javascript:void(0)" onClick={() => router.back()}><img src={imageLocation+'backarrow.png'}/><span>Back</span></a>
                <ul className="navbar-nav ml-auto ms-auto">
                    <li className="nav-item">
                        <Dropdown>
                            <Dropdown.Toggle className="nav-link">
                                <img src={imageLocation+'doorbell.png'} alt="doorbell" onClick={notoficationHandler} />
                                <span className="badge badge-danger navbar-badge">{data.firstName}</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item><a href="/settings" onClick={SettingHandler} className="setting-menu">Settings</a></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                    <li className="nav-item profile-dropdown">
                        <Dropdown>
                            <Dropdown.Toggle className="nav-link">
                                <img className="p-image" src={ data.new_profile_image_name ? data.new_profile_image_name : imageLocation+'dummy.png'} alt="doorbell" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu menu-logged-in">
                                <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Header;
