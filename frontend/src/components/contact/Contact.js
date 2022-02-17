import styled from "styled-components";
import { withError } from "./../withError";
import NewsletterForm from "./NewsletterForm";
import ContactForm from "./ContactForm";
import GoogleMap from "./GoogleMap";
import bannerImg from "../../img/hamburger-contact-banner.jpg";
const StyledContactSection = styled.section`
  box-sizing: border-box;
  min-height: 100vh;
  width: 100vw;
  padding-top: 58px;
  text-aling: center;
`;
const BannerTitle = styled.h2`
  text-align: center;
  font-size: 35px;
  text-transform: uppercase;
  color: #fff;
  text-shadow: ${(props) => props.theme.darkTextShadow};
  @media screen and (min-width: 750px) {
    font-size: 45px;
  }
`;

const ContactBanner = styled.div`
  position: relative;
  background-color: 2px solid ${(props) => props.theme.lightYellow};
  background: url(${bannerImg}) no-repeat center center;
  background-size: 100% 100%;
  height: 300px;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: -1;
  }
  @media screen and (min-width: 750px) {
    background-size: 100%;
  }
`;
function Contact() {
  return (
    <StyledContactSection>
      <ContactBanner>
        <BannerTitle>Ponte en Contacto!!</BannerTitle>
      </ContactBanner>
      <ContactForm />
      <NewsletterForm />
      <GoogleMap />
    </StyledContactSection>
  );
}
export default withError(Contact);
