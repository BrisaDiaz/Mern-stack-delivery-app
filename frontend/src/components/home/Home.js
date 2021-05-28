import styled  from 'styled-components'
import HeroSlider from './HeroSlider'
import NewestProducts from './NewestProducts'
import Testimonials from './Testimonials'
import About from './About'
const StyledHome = styled.main`

width:100vw;
padding: 58px 0  0 0;

text-aling:center;
    margin-left: -6px;
`;
export default function Home() {
  return(
  <StyledHome>
<HeroSlider></HeroSlider>
<NewestProducts/>
  <Testimonials></Testimonials>
   <About></About>
  </StyledHome>
)
}
