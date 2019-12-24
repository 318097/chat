import React from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import { setSession } from "../../store/actions";
import { getAppLoading } from "../../store/selectors";

const Header = ({ appLoading, session, dispatch, history }) => (
  <header>
    <h3>Chat {appLoading && <Icon loading name="spinner" />}</h3>
    {session && session.loggedIn && (
      <span>
        <span className="username">
          <Icon name="user outline" />
          {session.name || ""}
        </span>
        <Icon
          onClick={() => {
            localStorage.clear();
            sessionStorage.clear();
            history.push("/login");
            dispatch(setSession({ loggedIn: false, info: "" }));
          }}
          name="log out"
        />
      </span>
    )}
  </header>
);

const mapStateToProps = state => ({
  appLoading: getAppLoading(state),
  session: state.session
});

export default connect(mapStateToProps)(withRouter(Header));
