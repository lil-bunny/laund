import React from "react";
import dateFormat from "dateformat";

export function imagepath() {
    return '/assets/images/';
  }
  export function per_page_item() {
    return 10;
  }

  export function NoDataText() {
    return 'No Result Found';
  }


  export function DateBeforeEighteen() {
    let eighteenYearsBefore = new Date();
    let newdate= eighteenYearsBefore.setFullYear(eighteenYearsBefore.getFullYear() - 18);
    let formated_date=   dateFormat(newdate, "yyyy-m-dd");
    return formated_date;
  }

  export function OrderStatus(order_status){
    let OrderStatusJson={
      "0":"Cancel",
      "1":"Pickup request",
      "2":"Accepted by DB",
      "3":"Rejected by DB",
      "4":"Accepted by helper",
      "5":"Rejected by helper",
      "6":"Acknowledgement pending",
      "7":"Picked up",
      "8":"Issue rejected by CS",
      "9":"Partial order pickup",
      "10":"Handover to LS",
      "11":"Collected",
      "12":"Handover to CS",
      "13":"Payment pending",
      "14":"Payment recived"
   }

    return OrderStatusJson[order_status];
  }

  export function OrderStatusClass(order_status){
    let OrderStatusJson={
      "0":"order-cancel",
      "1":"pickup-request",
      "2":"accepted-by-db",
      "3":"rejected-by-db",
      "4":"accepted-by-helper",
      "5":"rejected-by-helper",
      "6":"acknowledgement-pending",
      "7":"picked-up",
      "8":"issue-rejected-by-cs",
      "9":"partial-order-pickup",
      "10":"Handover-to-ls",
      "11":"Collected",
      "12":"Handover-to-cs",
      "13":"payment-pending",
      "14":"payment-recived"
   }

    return OrderStatusJson[order_status];
  }



