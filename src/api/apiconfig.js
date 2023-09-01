import React from "react";
const sandbox= 'https://emerge2.indusnettechnologies.com/api/v1/admin/';
const live= 'https://emerge2.indusnettechnologies.com/api/v1/admin/';
const apimode='sandbox';
let apilink='';
if (apimode=='sandbox'){
    apilink=sandbox;
}
 else{
    apilink=live;
}

const apiurl = apilink
export default apiurl;