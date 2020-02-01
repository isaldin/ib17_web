import styled from 'styled-components';

const Button = styled.button`
  width: 20px;
  height: 20px;
  border: 0;
  background-color: transparent;
  font-size: 16px;
  cursor: pointer;
  color: goldenrod;
  margin-left: 5px;

  :hover {
    color: green;
  }

  :focus {
    outline: 0;
  }
`;

export { Button };
