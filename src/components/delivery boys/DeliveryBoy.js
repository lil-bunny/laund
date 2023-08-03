import React, { useContext,useState,useEffect} from "react";
import dateFormat from 'dateformat';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";
import AddModal from "../modal/AddModal";
import AuthContext from "../../store/auth-context";
import axiosInstance from "../../api/axiosinstance";
import apiurl from "../../api/apiconfig";



const DeliveryBoy = () =>{

    const authCtx = useContext(AuthContext);
    const token=authCtx.token;
    const logoutHandler = () =>{
        authCtx.logout();
         }
   
    const [deliveryBoys, setData] = useState([]);
  
         useEffect(() => {
            // Function to perform the GET request
            const fetchData = async () => {
              try {
                const response = await axiosInstance.get(apiurl+'laundry-associate-list');
                setData(response.data); // Assuming the response contains the data you need
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            };
        
            fetchData(); // Call the function to fetch the data
          }, []);
    const [show, setShow] = useState(false);
    const [modeldata,setModeldata]=useState([]);
    const handleClose = () => setShow(false);

    const indexNum = (cell, row, index) => {
        return (<div>{index+1}</div>) 
    }

    const actionFormator = (cell, row) => {
      return (<a href={"delivery-boy/"+ row.id}>View Details</a>) ; 
    }

    const idFormator = (cell, row) => {
        return (<span className="d-boy">{row.id}</span>) ; 
      }

   const nameFormatter = (cell, row) => {
     return `${row.firstName} ${row.lastName}`
    }

    const dob_formate = (cell, row) => {
        return dateFormat(`${row.dob}`, "mmmm dS, yyyy");
       }
    const enroll_status_formate = (cell, row) => {
    return 'Yes';
    }

    

    const columns = [
       
        {
            dataField: 'id',
            text: 'DB ID.',
            formatter: idFormator,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    setModeldata(row);
                  setShow(true);
                }
            }
        },
        {
            dataField: 'db_name',
            text: 'DB Name',
            formatter: nameFormatter

        },
        
        {
            dataField: 'dob',
            text: 'DOB',
            formatter: dob_formate
        },
        {
            dataField: 'address',
            text: 'Contact'
        },
        {
            dataField: 'enrollment_status',
            text: 'Enrollment Status',
            formatter: enroll_status_formate
        },
        {
            dataField: 'enrollment_end_date',
            text: 'Enrollment End Date'
        },
        {
            dataField: 'enrollment_fee',
            text: 'Enrollment Fee'
        },
        {
            dataField: 'transaction_fee',
            text: 'Transaction Fee'
        },
        {
            dataField: 'action',
            text: 'Action',
            formatter: actionFormator
        },
    ];
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    // Define pagination options
    const paginationOptions = {
        sizePerPage: 10,
        hideSizePerPage: true,
        hidePageListOnlyOnePage: true,
        onPageChange: (page, sizePerPage) => setCurrentPage(page),
      };
      // Function to handle search input change
    const handleSearch = (event) => {
       // console.log(event.target.value);
        setSearchText(event.target.value);
      };
    
      // Filter the data based on the search text
      const filteredData = deliveryBoys.filter((item) =>
        Object.values(item).some((field) =>
          String(field).toLowerCase().includes(searchText.toLowerCase())
        )
      );
      //console.log(deliveryBoys);
    return(
        <>
            <section className="delivery-boy-panel">
                <div className="common-table">
                    <div className="table-header">
                        <div className="table-search">
                            <form className="form-inline">
                                <input className="form-control" type="search" placeholder="Search" aria-label="Search"  value={searchText}
          onChange={handleSearch} />
                                <img src="./assets/images/search.png" alt="sort-img" />
                            </form>
                        </div>
                        <div className="select-dropdown table-select">
                            <img src="./assets/images/sort-down-small.png" alt="sort-img" />
                            <select className="select">
                                <option value="">Status</option>
                                <option value="1">Status 1</option>
                                <option value="2">Status 2</option>
                                <option value="3">Status 3</option>
                            </select>
                        </div>
                    </div>
                    <BootstrapTable
                        keyField='cs_id'
                        data={filteredData}
                        columns={columns}
                        pagination={paginationFactory(paginationOptions)}
                        wrapperClasses="table-responsive"
                    />
                </div>
            </section>
            <AddModal show={show} modeldata={modeldata} onHide={handleClose}  />
        </>
    )
}

export default DeliveryBoy;