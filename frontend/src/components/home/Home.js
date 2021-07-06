import styled  from 'styled-components'
import {withError} from './../withError'
import HeroSlider from './HeroSlider'
import Testimonials from './Testimonials'
import About from './About'
import CarruselSection from './CarruselSection'

const StyledHome = styled.main`

width:100vw;
padding: 58px 0  0 0;
text-aling:center;
`;
function Home() {
  return(
  <StyledHome>
<HeroSlider/>

  <CarruselSection/>
  <Testimonials/>
   <About/>
  </StyledHome>
)
}

export default withError(Home)