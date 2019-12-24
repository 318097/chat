import styled from "styled-components";

const Header = styled.div`
  margin-bottom: 10px;
  padding: 5px 5px;
`;

const Actions = styled.div`
  z-index: 5;
  border-top: 5px solid white;
  padding: 5px;
  background: inherit;
  position: relative;
  display: flex;
  margin-top: 2px;
  & > div {
    flex: 1 1 auto;
    position: relative;
    textarea {
      width: 98%;
      height: 100%;
      outline: none;
      border-radius: 5px;
    }
    .message-types-icon {
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  button {
    margin: 0 2px;
  }
`;

export { Header, Actions };
