import React from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";

import { getAppLoading } from "../../store/selectors";

const Header = ({ appLoading, session }) => (
  <header>
    <h3>Chat {appLoading && <Icon loading name="spinner" />}</h3>
    {session && session.loggedIn && (
      <span>
        <span className="username">
          <Icon name="user outline" />
          {session.name || ""}
        </span>
        <Icon name="log out" />
      </span>
    )}
  </header>
);

const mapStateToProps = state => ({
  appLoading: getAppLoading(state),
  session: state.session
});

export default connect(mapStateToProps)(Header);
