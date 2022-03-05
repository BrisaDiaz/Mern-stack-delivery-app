import styled from "styled-components";
import TestimonialsSlider from "./TestimonialsSlider";
import eatingPeople from "../../img/People-Eating-And-Drinking-90673271.jpg";

const StyledTestimonials = styled.section`
  width: 100vw;
  margin-bottom: 20px;
`;

const TestimonialsWrapper = styled.div`
  width: 100%;
  min-height: 360px;
  display: flex;
  flex-wrap: wrap;
  & > * {
    width: 100%;
  }
  @media screen and (min-width: 960px) {
    & > * {
      width: 50%;
    }
  }
`;
const TestimonialsImage = styled.div`
  overflow: hidden;
  height: 360px;
`;
const Img = styled.img`
  width: 130%;
  min-height: 100%;
`;
export default function Testimonials() {
  return (
    <StyledTestimonials>
      <TestimonialsWrapper className="flex">
        <TestimonialsImage>
          <Img src={eatingPeople} alt="happy-clients"></Img>
        </TestimonialsImage>
        <TestimonialsSlider />
      </TestimonialsWrapper>
    </StyledTestimonials>
  );
}
