import React, { useContext,useState,useEffect} from "react";
import { NavLink } from 'react-router-dom';
import AuthContext from "../../store/auth-context";
import axiosInstance from "../../api/axiosinstance";
import apiurl from "../../api/apiconfig";

const Header = (props) => {
    const authCtx = useContext(AuthContext);
    const token=authCtx.token;
    const logoutHandler = () =>{
        authCtx.logout();
         }
   
    const [data, setData] = useState([]);
  
         useEffect(() => {
            // Function to perform the GET request
            const fetchData = async () => {
              try {
                const response = await axiosInstance.get(apiurl+'admin-details');
                setData(response.data); // Assuming the response contains the data you need
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            };
        
            fetchData(); // Call the function to fetch the data
          }, []);
          //console.log(apiurl);
    return (
        <>
        
            <nav className="main-header navbar navbar-expand">
                <ul className="navbar-nav ml-auto ms-auto">
                    <li className="nav-item dropdown">
                        <NavLink to='#' className="nav-link" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="/assets/images/Doorbell.png" alt="doorbell" />
                            <span className="badge badge-danger navbar-badge">{data.firstName}</span>
                        </NavLink>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            Dropdown Content
                        </div>
                    </li>

                    <li className="nav-item dropdown profile-dropdown">
                        <NavLink to='#' className="nav-link" data-bs-toggle="dropdown" aria-expanded="false">
                            <img className="p-image" src={data.new_profile_image_name} alt="doorbell" />
                        </NavLink>
                        <div  className="dropdown-menu menu-logged-in">
                            <ul className="menu-after-login">
                             <li onClick={logoutHandler}>Logout</li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Header;
