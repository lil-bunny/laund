import React from "react";
const sandbox= 'http://143.110.242.57:8093/api/admin/';
const live= 'http://143.110.242.57:8093/api/adminss/';
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