import React from "react";
import { connect } from "react-redux";

import { getAppLoading } from "../../store/selectors";

const Header = ({ appLoading }) => (
  <header>
    <h3>
      Chat{" "}
      {appLoading && (
        <div className="ui active dimmer">
          <div className="ui loader"></div>
        </div>
      )}
    </h3>
  </header>
);

const mapStateToProps = state => ({ appLoading: getAppLoading(state) });

export default connect(mapStateToProps)(Header);
