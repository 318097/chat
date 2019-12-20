import React from "react";
import { connect } from "react-redux";
import { Loader } from "semantic-ui-react";

import { getAppLoading } from "../../store/selectors";

const Header = ({ appLoading, name }) => (
  <header>
    <h3>Chat {appLoading && <Loader active inline />}</h3>
    <span>{name}</span>
  </header>
);

const mapStateToProps = state => ({
  appLoading: getAppLoading(state),
  name: state.session ? state.session.name : ""
});

export default connect(mapStateToProps)(Header);
