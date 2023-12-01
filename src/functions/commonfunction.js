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
      "14":"Delivered"
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
      "10":"handover-to-ls",
      "11":"collected",
      "12":"handover-to-cs",
      "13":"payment-pending",
      "14":"delivered"
   }

    return OrderStatusJson[order_status];
  }

  export function paymentStatus(order_status){
    let paymentStatusJson={
      "0":"Cancel",
      "1":"-",
      "2":"-",
      "3":"-",
      "4":"-",
      "5":"-",
      "6":"-",
      "7":"Not Paid",
      "8":"Not Paid",
      "9":"Not Paid",
      "10":"Not Paid",
      "11":"Not Paid",
      "12":"Not Paid",
      "13":"Not Paid",
      "14":"Paid"
   }

    return paymentStatusJson[order_status];
  }

  export function paymentStatusCLass(order_status){
    let paymentStatusJson={
      "0":"cancel",
      "1":"none",
      "2":"none",
      "3":"none",
      "4":"none",
      "5":"none",
      "6":"none",
      "7":"not-paid",
      "8":"not-paid",
      "9":"not-paid",
      "10":"not-paid",
      "11":"not-paid",
      "12":"not-paid",
      "13":"not-paid",
      "14":"paid"
   }

    return paymentStatusJson[order_status];
  }



  export function pickedUpStatus(order_status){
    let pickedUpStatusJson={
      "0":"Cancel",
      "1":"Pickup Request",
      "2":"DB Request Accepted",
      "3":"DB Request Rejected",
      "4":"Helper Request Accepted",
      "5":"Helper Request Rejected",
      "6":"Not Yet",
      "7":"Picked Up",
      "8":"Not Yet",
      "9":"Not Yet",
      "10":"Not Yet",
      "11":"Not Yet",
      "12":"Not Yet",
      "13":"Not Yet",
      "14":"Order Completed"
   }

    return pickedUpStatusJson[order_status];
  }


  export function pickedUpStatusCLass(order_status){
    let pickedUpStatusJson={
      "0":"order-cancel",
      "1":"pickup-request",
      "2":"accepted-by-db",
      "3":"rejected-by-db",
      "4":"accepted-by-helper",
      "5":"rejected-by-helper",
      "6":"not-yet",
      "7":"picked-up",
      "8":"not-yet",
      "9":"not-yet",
      "10":"not-yet",
      "11":"not-yet",
      "12":"not-yet",
      "13":"not-yet",
      "14":"delivered"
   }

    return pickedUpStatusJson[order_status];
  }


  export function getSelfServedCount(orderDetails){
    let servercount=0;
    orderDetails?.map((valueDetails, keyOrder) => {
      if(valueDetails.db_id===valueDetails.ls_id){

        valueDetails.order_products?.map((values, key) => {
          servercount+=values.product_quantity;
        });

      }

    });
    return servercount;
  }

  export function lsServedCount(orderDetails){
    let servercount=0;
    orderDetails?.map((valueDetails, keyOrder) => {
      if(valueDetails.db_id!==valueDetails.ls_id){

        valueDetails.order_products?.map((values, key) => {
          servercount+=values.product_quantity;
        });

      }

    });
    return servercount;
  }


  export function backButtonClass(rout_path){
    let rought_location_Json={
      "/dashboard":"d-none",
      "/order":"d-none",
      "/order-details/[id]":"d-flex",
      "/delivery-boy":"d-none",
      "/update-delivery-boy/[id]":"d-flex",
      "/new-delivery-boy":"d-flex",
      "/delivery-boy-details/[id]":"d-flex",
      "/helper":"d-none",
      "/helper-details/[id]":"d-flex",
      "/laundry":"d-none",
      "/laundry-details/[id]":"d-flex",
      "/customer":"d-none",
      "/customer-details/[id]":"d-flex",
      "/onboarding-request":"d-none",
      "/payment":"d-none",
      "/manage-categories":"d-none",
      "/manage-sub-categories":"d-none",
      "/manage-products":"d-none",
      "/location":"d-none",
      "/settings":"d-none",
      "/notification":"d-none"
     
   }

    return rought_location_Json[rout_path];

  }


  export function dbNotificationText(notification_parameter){
    let notoficationJson={
      "payment":"Payment",
      "order_picked_up":"Order picked up",
      "order_accept":"Order accept",
      "order_pickup_request":"Order picked up request",
      "rating":"Ratings",
      "order_delivered":"Order Delivered",
      "order_handover_to_ls":"Order hand over to LS",
      "order_ready":"Order ready",
      "order_picked_up_from_ls":"Order picked up from LS",
      "order_picked_up_by_db_or_helper":"Order picked up by DB/Helper",
      "order_issue_raised":"Order issue raised" 
     
   }
    return notoficationJson[notification_parameter];
  }

  export function lsNotificationText(notification_parameter){
    let notoficationJson={
      "payment":"Payment",
      "order_picked_up":"Order picked up",
      "order_accept":"Order accept",
      "order_pickup_request":"Order picked up request",
      "rating":"Ratings",
      "order_handover_to_ls":"Order hand over to LS",
      "order_ready":"Order ready",
      "order_picked_up_from_ls":"Order picked up from LS",
      "order_picked_up_by_db_or_helper":"Order picked up by DB/Helper",
      "order_issue_raised":"Order issue raised" ,
      "order_delivered":"Order Delivered",
     
   }
    return notoficationJson[notification_parameter];
  }

  export function custNotificationText(notification_parameter){
    let notoficationJson={
      "payment":"Payment",
      "order_picked_up":"Order picked up",
      "order_accept":"Order accept",
      "order_pickup_request":"Order picked up request",
      "rating":"Ratings",
      "order_handover_to_ls":"Order hand over to LS",
      "order_ready":"Order ready",
      "order_picked_up_from_ls":"Order picked up from LS",
      "order_picked_up_by_db_or_helper":"Order picked up by DB/Helper",
      "order_issue_raised":"Order issue raised" ,
      "order_delivered":"Order Delivered",
     
   }
    return notoficationJson[notification_parameter];
  }

  export function paiichartBackroundColor(paichartslug){
    let paichartslugJson={
      "wash-iron":"#E5E62B",
      "dry-clean":"#21D4C9",
      "steam-iron":"#EB5427",
      "iron-and-wash":"#791F06"
   }
    return paichartslugJson[paichartslug];
  }

