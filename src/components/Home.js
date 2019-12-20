import React, { useEffect } from "react";
import { List } from "semantic-ui-react";
import { connect } from "react-redux";
import { loadContactList } from "../store/actions";

import ContactCard from "./ContactCard";

const Home = ({ dispatch, contactList }) => {
  useEffect(() => {
    dispatch(loadContactList());
  }, []);

  return (
    <section id="home">
      <List divided relaxed>
        {contactList.map(contact => (
          <ContactCard key={contact._id} contact={contact} />
        ))}
      </List>
    </section>
  );
};

const mapStateToProps = ({ contactList }) => ({ contactList });

export default connect(mapStateToProps)(Home);
