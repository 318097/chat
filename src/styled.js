import styled from "styled-components";

const Header = styled.div`
  margin-bottom: 10px;
  background: #f1f1f1;
  padding: 5px 5px;
`;

const Actions = styled.div`
  z-index: 5;
  background: inherit;
  position: relative;
  display: flex;
  margin-top: 5px;
  textarea,
  button {
    margin: 0 2px;
  }
  textarea {
    flex: 1 1 auto;
  }
`;

export { Header, Actions };
