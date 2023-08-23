import React from 'react';
import NotificationPage from '@component/components/notifications/Notification';

const notification = () => {
    return <NotificationPage />
}

export async function getServerSideProps(context) {
    return {
        props: {
            layout: 'MainLayout'
        },
    }
}

export default notification;