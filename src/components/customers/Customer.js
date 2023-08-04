import React, { useContext,useState,useEffect} from "react";
import dateFormat from 'dateformat';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";
import AddModal from "../modal/AddModal";
import AuthContext from "../../store/auth-context";
import axiosInstance from "../../api/axiosinstance";
import apiurl from "../../api/apiconfig";


const Customer = () => {

    const [customers, setData] = useState([]);
  
         useEffect(() => {
            // Function to perform the GET request
            const fetchData = async () => {
              try {
                const response = await axiosInstance.get(apiurl+'customer-list');
                if(response.status==1){
                setData(response.data); // Assuming the response contains the data you need
                }
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            };
        
            fetchData(); // Call the function to fetch the data
          }, []);

          console.log(customers);
          const nameFormatter = (cell, row) => {
            return `${row.firstName} ${row.lastName}`
           }
           
    
    const columns = [
        
        {
            dataField: 'id',
            text: 'CS ID'
        },
        {
            dataField: 'cs_name',
            text: 'CS Name',
            formatter: nameFormatter
        },
        {
            dataField: 'primary_phone_no',
            text: 'Contact'
        },
        {
            dataField: 'last_order',
            text: 'Last Order'
        },
        {
            dataField: 'unpaid_amount',
            text: 'Unpaid Amount'
        },
        {
            dataField: 'active_orders',
            text: 'Active Orders'
        },
        {
            dataField: 'address',
            text: 'Address'
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
        console.log(event.target.value);
        setSearchText(event.target.value);
      };
    
      // Filter the data based on the search text
      const filteredData = customers.filter((item) =>
        Object.values(item).some((field) =>
          String(field).toLowerCase().includes(searchText.toLowerCase())
        )
      );
    return (
        <>
            <section className="customer-panel">
                <div className="common-table">
                    <div className="table-header">
                        <div className="table-search">
                            <form className="form-inline">
                                
                                <input className="form-control" type="text" placeholder="Search" aria-label="Search" value={searchText}
          onChange={handleSearch} />
                                <img src="./assets/images/search.png" alt="sort-img" />
                            </form>
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
        </>
    )
}

export default Customer;