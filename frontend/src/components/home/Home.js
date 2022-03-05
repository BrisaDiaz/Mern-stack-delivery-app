import styled from "styled-components";
import { withError } from "./../withError";
import HeroSlider from "./HeroSlider";
import Testimonials from "./Testimonials";
import About from "./About";
import CarrouselSection from "./CarrouselSection";

const StyledHome = styled.main`
  width: 100vw;
  padding: 58px 0 0 0;
  text-aling: center;
`;
function Home() {
  return (
    <StyledHome>
      <HeroSlider />

      <CarrouselSection />
      <Testimonials />
      <About />
    </StyledHome>
  );
}

export default withError(Home);
