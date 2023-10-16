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



