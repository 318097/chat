import styled from "styled-components";

const Header = styled.div`
  margin-bottom: 10px;
  background: #f9f9f9;
  padding: 5px 5px;
`;

const Actions = styled.div`
  z-index: 5;
  background: inherit;
  position: relative;
  display: flex;
  margin-top: 2px;
  & > div {
    flex: 1 1 auto;
    position: relative;
    textarea {
      width: 99%;
      height: 100%;
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
