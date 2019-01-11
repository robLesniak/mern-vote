import React from 'react';
import { Redirect } from 'react-router-dom';
import Auth from '../Components/Auth';
import ErrorMessage from '../Components/ErrorMessage';

const AuthPage = (props) => {
  
  if(props.isAuthenticated) return <Redirect to="/" />

  return (
    <div>
      <ErrorMessage />
      <Auth authtype={props.authType} />
    </div>
  )
}

export default AuthPage;