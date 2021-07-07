import styled from 'styled-components';

const StyledButton = styled.button`
  background: #fff;
  ${'' /* background: red; */}
  color: red;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
  &:focus {
    outline: none;
  }
`;

export default function Square(props) {
  return (
    <StyledButton style={props.style} onClick={props.onClick}>
      {props.value}
    </StyledButton>
  );
}
