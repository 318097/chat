import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background: ${({ user }) => (user === "me" ? "orange" : "skyblue")};
  padding: 2px 7px;
  display: inline-block;
  max-width: 60%;
  border-radius: 10px;
  margin: 2px 5px;
  & > div {
    padding: 0;
    display: flex;
    flex-direction: column;
    .message {
    }
    .date {
      font-size: 60%;
      font-style: italic;
    }
  }
`;

const Message = ({ data: { message, date, user } }) => (
  <Wrapper user={user}>
    <div>
      <span className="message">{message}</span>
      {/* <span className="date">{date}</span> */}
    </div>
  </Wrapper>
);

export default Message;
