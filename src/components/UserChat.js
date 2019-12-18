import React, { useState, useEffect } from "react";
import { TextArea, Button, Icon } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Message from "./Message";

const Header = styled.div`
  margin-bottom: 10px;
  background: lightgrey;
  padding: 10px 5px;
`;

const Actions = styled.div`
  z-index: 5;
  background: inherit;
  position: relative;
  display: flex;
  margin-top: 15px;
  textarea,
  button {
    margin: 0 2px;
  }
  textarea {
    flex: 1 1 auto;
  }
`;

const UserChat = ({ history, match }) => {
  const [chat, setChat] = useState([
    { message: "hi", date: "2019-1-1", _id: "32" },
    { message: "hi dsfs sdf sd sdf", date: "2019-1-1", _id: "323232" },
    {
      message: "hi sdfjlk jsdof jsdof jdsofkdsfkl ",
      date: "2019-1-1",
      _id: "3232",
      user: "me"
    },
    { message: "hi", date: "2019-1-1", _id: "32df" }
  ]);

  useEffect(() => {
    const { id: userId } = match.params;
    const fetchUserChat = async () => {
      const {
        data: { chat: messages }
      } = await axios.get(`/chat/user-chat/${userId}`);
      setChat(messages);
    };

    fetchUserChat();
  }, [match]);

  return (
    <section id="chat">
      <Header>
        <span onClick={() => history.push("/home")}>
          <Icon name="angle double left" />
        </span>
        <span> Username </span>
      </Header>
      <div className="chat-container">
        {chat.map(item => (
          <div
            key={item._id}
            style={{
              display: "flex",
              justifyContent: item.user === "me" ? "flex-end" : "flex-start"
            }}
          >
            <Message data={item} />
          </div>
        ))}
      </div>
      <Actions>
        <TextArea rows="1" placeholder="Message.." />
        <Button>Send</Button>
      </Actions>
    </section>
  );
};

export default withRouter(UserChat);
