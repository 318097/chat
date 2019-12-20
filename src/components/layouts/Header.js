import React from "react";
import { connect } from "react-redux";

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

const mapStateToProps = ({ appLoading }) => ({ appLoading });

export default connect(mapStateToProps)(Header);
