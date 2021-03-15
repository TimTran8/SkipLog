import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { isLogin }p from '../utils';

const PrivateRoute = ({ component: Component, ...rest }) => {
  
  // const isLogin = () => {
  //   if(this.props.isAuth) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  return (
    
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route {...rest} render={props => (
      this.props.isAuthenthicated ?
        <Component {...props} />
        : <Redirect to="/signin" />
    )} />
  );
};

export default PrivateRoute;