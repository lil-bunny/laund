import React,{ useContext } from "react";
import axios from "axios";
import apiurl from "./apiconfig";

const axiosInstanceMultipart = axios.create({
    baseURL: apiurl,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  

  
  axiosInstanceMultipart.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token != null) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    },
    (error) => {
      Promise.reject(error)
    }
  )
  
  
  axiosInstanceMultipart.interceptors.response.use(
    function (response) {
      return response.data
    },
    function (error) {
      if (error.response.data.status === 401) {}
      // return error;
      return Promise.reject(error)
    }
  )
  
  export default axiosInstanceMultipart