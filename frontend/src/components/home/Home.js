import styled  from 'styled-components'
import React, { Suspense, lazy } from 'react';
import HeroSlider from './HeroSlider'
import Testimonials from './Testimonials'
import About from './About'
import ProductsSectionSkeletom from '../ProductsSectionSkeletom'
const NewestProducts = lazy(() => import('./NewestProducts'));
const StyledHome = styled.main`

width:100vw;
padding: 58px 0  0 0;
text-aling:center;
`;
export default function Home() {
  return(
  <StyledHome>
<HeroSlider></HeroSlider>
  <Suspense fallback={ <ProductsSectionSkeletom/>}>
<NewestProducts/>
  </Suspense>
  <Testimonials></Testimonials>
   <About></About>
  </StyledHome>
)
}
