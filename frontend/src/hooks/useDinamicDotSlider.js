import { useEffect, useState } from "react";

export default function useDinamicDotSlider(testimonials) {
  const [slide, setslide] = useState(0);

  const moveToSlide = (index) => {
    setslide(index);
  };
  const nextSlide = () => {
    setslide(slide + 1);
    if (slide === testimonials.length - 1) {
      setslide(0);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 4000);
    return () => clearInterval(intervalId);
  });

  return { slide, moveToSlide, testimonials };
}
