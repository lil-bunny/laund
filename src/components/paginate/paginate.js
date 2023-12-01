import React, { useState, useEffect } from 'react';
import axiosInstance from '@component/api/axiosinstance';
import apiurl from '@component/api/apiconfig';

const Paginate = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page

  useEffect(() => {
    fetchData();
  }, [currentPage]);
    
  

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(apiurl+'onboarding/onboarding-list?page='+currentPage+'&limit='+itemsPerPage);
      setData(response.data); 
      setImagepath(response.image_path);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };
    //console.log(data);
  return (
    <div>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.primary_phone_no}  {item.firstName}</li>
          
        ))}
      </ul>

      <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous Page</button>
      <button onClick={handleNextPage}>Next Page</button>
    </div>
  );
};

export default Paginate;