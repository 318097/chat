import React from 'react';
import { List } from 'semantic-ui-react';

import { withRouter } from 'react-router-dom';

const ContactCard = ({ contact: { name, _id }, history }) => {

  const handleClick = () => history.push(`/user/${_id}`);

  return (
    <List.Item onClick={handleClick}>
      {/* <List.Icon name='github' size='large' verticalAlign='middle' /> */}
      <List.Content>
        <List.Header as='a'>{name}</List.Header>
        {/* <List.Description as='a'>Updated 10 mins ago</List.Description> */}
      </List.Content>
    </List.Item>
  );
};

export default withRouter(ContactCard);
