import React from 'react'
import AppHeader from '@component/components/layout/Header';
import AppSidebar from '@component/components/layout/Sidebar'

const MainLayout = (props) => {
    return (
        <>
            <AppHeader />
            <AppSidebar />
            <div className="content-wrapper">
                {props.children}
            </div>
        </>
    )
}

export default MainLayout