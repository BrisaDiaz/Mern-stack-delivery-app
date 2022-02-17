import styled from "styled-components";
import facebook from "../img/facebook-f-brands.svg";
import instagram from "../img/instagram-brands.svg";
import twitter from "../img/twitter-brands.svg";
const StyledSocialsMenu = styled.address`
  display: flex;
  padding: 20px 0;
  justify-content: center;
`;
const SocialLink = styled.a`
  display: grid;
  width: 30px;
  height: 30px;
  background-color: #fcba1c;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    background-color: ${(props) => (props.primary ? "#F0F0F0" : "#F0F0F0")};
  }
`;
const SocialIcon = styled.img`
  width: 20px;
  height: 20px;
  place-self: center;
`;

export default function SocialsMenu(props) {
  return (
    <StyledSocialsMenu>
      <SocialLink href="#!" target="_blank">
        <SocialIcon src={facebook} alt="facebook"></SocialIcon>
      </SocialLink>
      <SocialLink href="#!" target="_blank">
        <SocialIcon src={instagram} alt="instagram"></SocialIcon>
      </SocialLink>
      <SocialLink href="#!" target="_blank">
        <SocialIcon src={twitter} alt="twitter"></SocialIcon>
      </SocialLink>
    </StyledSocialsMenu>
  );
}
