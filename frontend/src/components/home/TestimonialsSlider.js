import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import useDinamicDotSlider from "../../hooks/useDinamicDotSlider";
import quoteIcon from "../../img/left-quote.svg";
import {
  SliderContainer,
  IndicatorWrapper,
  IndicatorDot,
  SliderContent,
  Slide,
} from "./HeroSlider";
import FailToFectch from "../../img/Error-503-backend-fetch-failed.png";

const StyledTestimonialSlider = styled.div`
  min-height: 360px;
  position: relative;

  background: ${(props) =>
    props.error === true
      ? `url(${FailToFectch}) no-repeat center center`
      : "none"};
  background-size: contain;
`;
const ThisSlide = styled(Slide)`
  background: ${(props) => props.theme.black};
`;
const ThisSlideContent = styled(SliderContent)`
  justify-content: center;
  padding: 50px 0;
`;

const ThisIndicatorDot = styled(IndicatorDot)`
  border: 2px solid ${(props) => props.theme.darkYellow};
  background: ${(props) =>
    props.slide === parseInt(props.index) ? "#fcba1c" : "transparent"};
`;
const Comment = styled.q`
  color: #fff;
  text-align: center;
`;
const Name = styled.h4`
  line-height: 25px;
  font-size: 20px;
  color: #fcba1c;
  text-align: center;
  text-shadow: ${(props) => props.theme.darkTextShadow};
  height: 30px;
`;
const EmailContact = styled.small`
  color: ${(props) => props.theme.darkYellow};
  text-align: center;
  margin-top: 30px;
  padding-bottom: 50px;
`;
const QuoteIcon = styled.img`
  width: 60px;
  height: auto;
  margin: 0 auto;
  margin-bottom: 10px;
`;

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState(false);
  const ref = useRef(0);

  useEffect(() => {
    async function fetchData() {
      setError(false);
      try {
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/comments"
        );
        const data = await res.json();

        data.length = 5;

        setTestimonials(data);
      } catch (err) {
        let counter = ref.current;
        console.log(err);

        if (counter < 6) {
          fetchData();
          ref.current += 1;
        }

        setError(true);
      }
    }
    fetchData();
  }, []);

  const { slide, moveToSlide } = useDinamicDotSlider(testimonials);

  return (
    <StyledTestimonialSlider error={error}>
      <SliderContainer>
        {testimonials.map((testimonial, index) => (
          <ThisSlide key={index} slide={slide} index={index}>
            <ThisSlideContent>
              <Name>{testimonial.name}</Name>
              <QuoteIcon src={quoteIcon} alt="happy-clients"></QuoteIcon>
              <Comment>{testimonial.body}</Comment>
              <EmailContact>{testimonial.email}</EmailContact>
            </ThisSlideContent>
          </ThisSlide>
        ))}

        <IndicatorWrapper>
          {testimonials.map((testimonial, index) => (
            <ThisIndicatorDot
              key={index}
              slide={slide}
              index={index}
              onClick={() => moveToSlide(index)}
            />
          ))}
        </IndicatorWrapper>
      </SliderContainer>
    </StyledTestimonialSlider>
  );
}
