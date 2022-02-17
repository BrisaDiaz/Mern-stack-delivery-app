import styled, { keyframes } from "styled-components";
import { StyledLink } from "./Header";
export const bounceLeft = keyframes`
  0% { left:15px;}
  50% { left:20px;}
   100% { left:15px;}
`;
const GoBackLink = styled(StyledLink)`
  position: absolute;
  left: 15px;
  font-size: 12px !important;
  margin: 0;
  font-size: 15px;
  padding: 10px 0;
  z-index: 800;
  animation: ${bounceLeft} 1.2s linear infinite;
  &:before {
    content: "<-- ";
    margin-right: 3px;
  }
`;
export default GoBackLink;
