import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List } from 'semantic-ui-react';

import ContactCard from './ContactCard';

const Home = () => {
  const [contactList, setContactList] = useState([
    { name: 'mehul', _id: '3434' },
    { name: 'mehul', _id: '343443' },
  ]);

  useEffect(() => {
    const fetchContactList = async () => {
      const { data: { contacts } } = await axios.get(`/chat/contact-list`);
      setContactList(contacts);
    };
    fetchContactList();
  }, []);

  return (
    <section id="home">
      <List divided relaxed>
        {contactList.map(contact => <ContactCard key={contact._id} contact={contact} />)}
      </List>
    </section>
  );
};

export default Home;
