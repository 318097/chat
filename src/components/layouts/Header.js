import React from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";

import { getAppLoading } from "../../store/selectors";

const Header = ({ appLoading, name }) => (
  <header>
    <h3>Chat {appLoading && <Icon loading name="spinner" />}</h3>
    <span>
      <span className="username">
        <Icon name="user outline" />
        {name}
      </span>
      <Icon name="log out" />
    </span>
  </header>
);

const mapStateToProps = state => ({
  appLoading: getAppLoading(state),
  name: state.session ? state.session.name : ""
});

export default connect(mapStateToProps)(Header);
