import React from 'react';

import Header from './Header';
import Sidebar from './Sidebar';

const Layout = (props) => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        {props.children}
      </div>
    </>
  );
};

export default Layout;
