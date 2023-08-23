import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    loginData: (data) => {},
    login: (token) => {},
    logout: () => {},
});

export const AuthContextProvider = (props) =>{
    const [initialToken, setInitialToken] = useState(null);

    useEffect(()=>{
        if (typeof window !== 'undefined' && window.localStorage) {
            let token = localStorage.getItem('token');
            console.log(token)
            setInitialToken(token);
        }
    },[])
    
    // const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    // const loginDataHandler = (data) =>{
    //     localStorage.setItem('loginData', JSON.stringify(data))
    // }
    
    const loginHandler = (token) =>{
        setToken(token);
        console.log(token)
        localStorage.setItem('token', token);
    }
    
    const logoutHandler = () =>{
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('loginData');
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        // loginData: loginDataHandler,
        login: loginHandler,
        logout: logoutHandler,
    };
    
    return( 
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;