import React, { Fragment } from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";

const Wrapper = styled.div`
  background: ${({ userId, sender }) =>
    userId === sender ? "#8aa27d" : "#ef424c"};
  padding: 2px 7px;
  display: inline-block;
  max-width: 60%;
  border-radius: 10px;
  margin: 2px 5px;
  cursor: ${({ messageType }) =>
    messageType === "CONFESS" ? "pointer" : "normal"};
  position: relative;
  &:before {
    content: "";
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    top: calc(50% - 2px);
    right: ${({ sender, userId }) => sender === userId && "-5px"};
    left: ${({ sender, userId }) => sender !== userId && "-5px"};
    background: black;
    display: ${({ messageType }) =>
      messageType === "NORMAL" ? "none" : "block"};
  }
  & > div {
    padding: 0;
    display: flex;
    flex-direction: column;
    .date {
      font-size: 60%;
      font-style: italic;
    }
  }
  .selected-message {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .selected-message.left {
    left: -20px;
  }
  .selected-message.right {
    right: -25px;
  }
  .info {
    font-style: italic;
    font-size: 0.8em;
    color: white;
  }
`;

const findReceiverId = (userId, metaInfo) =>
  Object.keys(metaInfo).find(id => id !== userId);

const ConfessBox = ({ userId, metaInfo = {} }) => {
  const userResponse = metaInfo[userId];
  const receiverId = findReceiverId(userId, metaInfo);
  const receiverResponse = metaInfo[receiverId];

  return (
    <Fragment>
      {userResponse && <div>You: {userResponse}</div>}
      {!userResponse && receiverResponse ? (
        <div className="info">Received 1response.</div>
      ) : userResponse && receiverResponse ? (
        <div>Other: {receiverResponse}</div>
      ) : (
        <div className="info">No response.</div>
      )}
    </Fragment>
  );
};

const Message = ({
  userId,
  data: {
    message,
    createdAt,
    sender,
    messageType = "NORMAL",
    metaInfo = {},
    _id,
    tempId
  },
  selectedMessage,
  setSelectedMessage
}) => {
  const handleClick = () => {
    if (messageType === "CONFESS") {
      if (
        selectedMessage &&
        (selectedMessage._id === _id || selectedMessage.tempId === tempId)
      )
        return setSelectedMessage(null);
      setSelectedMessage({
        metaInfo,
        messageType,
        _id,
        tempId
      });
    }
  };

  return (
    <Wrapper
      onClick={handleClick}
      messageType={messageType}
      userId={userId}
      sender={sender}
      _id={_id}
    >
      <div>
        <div className="message">
          <div>{message}</div>
          {messageType === "CONFESS" && (
            <ConfessBox metaInfo={metaInfo} userId={userId} />
          )}
        </div>
        {/* <span className="date">{new Date(createdAt)}</span> */}
      </div>
      {messageType === "CONFESS" &&
        selectedMessage &&
        (selectedMessage.tempId === tempId || selectedMessage._id === _id) && (
          <Icon
            className={`selected-message ${
              sender === userId ? "left" : "right"
            }`}
            disabled
            name="reply"
          />
        )}
    </Wrapper>
  );
};

export default Message;
