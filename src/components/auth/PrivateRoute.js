import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { isLoggedIn } from "../../authService";

const PrivateRoute = ({ component: Component, dispatch, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn() ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default connect()(PrivateRoute);
