import React from 'react'

const AuthLayout = (props) => {
  return (
    <>
      <div className="auth-panel">
        {props.children}
      </div>
    </>
  )
}

export default AuthLayout