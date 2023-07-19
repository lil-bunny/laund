import React from 'react';

const AuthLayout = (props) => {
    return (
        <React.Fragment>
            <div className="auth-panel">
                {props.children}
            </div>
        </React.Fragment>
    );
};

export default AuthLayout;
