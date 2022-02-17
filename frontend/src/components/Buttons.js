import styled from "styled-components";

export const Button = styled.a`
     box-shadow: ${(props) => props.theme.lightBoxShadow};
padding: 15px 40px;
color:#fff;
width:max-content;
  background:${(props) => props.theme.darkYellow};
  text-transform: uppercase;
  text-align:center;
  font-size: 16px;
  font-family: "Oswald", sans-serif;
  font-weight:600px;
 line-height:23.5px;
  cursor:pointer;
  letter-spacing:2px;
  border-radius:4px;
    text-decoration: none;

    transform:'${(props) => (props.small ? "scale(0.7)" : "scale(1)")}';
  transition:all 0.5s ease;
  &:hover{
    background-color:${(props) => props.theme.black};
  }
  & > * {
    cursor:pointer;
  }
    @media screen and (max-width: 550px){
   transform:scale(0.8);
`;
export const ButtonPrimary = styled(Button)`
  background: ${(props) => props.theme.orange};
`;
