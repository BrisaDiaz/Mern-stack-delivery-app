import styled  from 'styled-components'
import {Link} from 'react-router-dom'
import useStaticInfoSlider from '../../hooks/useStaticInfoSlider'
import {ButtonPrimary} from '../Buttons'
import BurgerSlide from '../../img/hamburger-slide.jpg'
import PizzaSlide from '../../img/pizza-slide.jpg'
import EmpanadaSlide from '../../img/empanadas-slide.jpg'

const StyledSlider = styled.section`
position:relative;
width:100vw;
    height: calc(100vh - 58px);
text-aling:center;
margin-bottom:20px;
`;
export const SliderContainer = styled.div`
heigth:100%;
width:100%;
`;
export const ControlsWrapper = styled.div`
position:absolute;
display:flex;
justify-content:space-between;
top:50%;
left:0;
transform:translate(0,-50%);
width:100%;
height:25px;
z-index:55;
padding:0 35px;

`;
export const ControlLeft = styled.div`
height:25px;
width:25px;
border-left: 5px solid rgba(255,255,255,1);
border-bottom: 5px solid rgba(255,255,255,1);
transform: rotate(45deg);
cursor:pointer;

&:hover{
  border-color:rgba(255,255,255,0.8);
}
@media screen and (max-width:750px){
display:none;
}
`;
export const ControlRight = styled(ControlLeft)`
border:none;
border-top: 5px solid rgba(255,255,255,1);
border-right: 5px solid rgba(255,255,255,1);
transform: rotate(45deg);
`;
export const IndicatorWrapper = styled.div`
position:absolute;
display:flex;
align-items:center;
justify-content:center;
bottom:20px;
left:0;
width:100%;
height:25px;
z-index:55;


`;


export const IndicatorDot =styled.div` 
height:15px;
width:15px;
border-radius:50%;
border:2px solid #fff;
background: ${(props)=>(( props.slide === parseInt(props.index )) ? "#fff" : "transparent")} ;
margin:0 5px;
cursor:pointer;
box-shadow:${props => props.theme.lightTextShadow};
`;

 export const SliderContent = styled.div`
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
height:70%;
width:80%;
display:flex;
flex-flow:column;
justify-content: flex-end;
@media screen and (max-width:500px){
& > a{
      margin-left: -15px;
}
}
`;
export const Span = styled.h4`
font-size: 22px;
text-transform: uppercase;
text-align:justify;
color:#fff;
text-shadow: 1px 1px 2px #000;
margin-bottom:40px;
color:#fcba1c;

`
const SliderTitle = styled.h3`
font-size: 30px;
text-transform: uppercase;
color:#fff;
text-shadow: 1px 1px 2px #000;
margin-bottom:40px;
line-height:1.2em;
@media screen and (min-width:500px){
font-size: 45px;
}
@media screen and (min-width:750px){
font-size: 75px;
}
`;
const SliderImage = styled.img`
position:absolute;
top:0;
left:50%;
transform:translate(-50%,0);
width:100%;
height:120%;

@media screen and (max-width:850px){
  width:130%;
  height:100%;
}
@media screen and (max-width:500px){
  width:200%;
}
`;
 export const Slide=styled.div` 
position:absolute;
display:${(props) =>(( props.slide === parseInt(props.index )) ? "block" : "none")};
overflow:hidden;
align-items:center;
top:0;
left:0;
width:100%;
height:100%;
 background-color: 2px solid ${props => props.theme.lightYellow};
transition:all 2s ease;

`

export default function Slider() {

const  { prevSlide, nextSlide ,moveToSlide, slide} = useStaticInfoSlider()

  return(
  <StyledSlider>

    <SliderContainer>

      <Slide   data-testid='slider1'  slide={slide} index={1}>
        <SliderImage  src={BurgerSlide} alt= "burger"></SliderImage>
        <SliderContent>
          <Span>las mejores ofertas</Span>
          <SliderTitle>super descuento <br></br>hamburgesa</SliderTitle>
          <ButtonPrimary as={Link} to="/menu">ordenar</ButtonPrimary></SliderContent>
          </Slide>
         <Slide data-testid='slider2'  slide={slide} index={2}>
           <SliderImage src={PizzaSlide} alt= "pizza"></SliderImage>
           <SliderContent><Span>las mejores ofertas</Span><SliderTitle>super descuento <br></br>Pizza</SliderTitle><ButtonPrimary as={Link} to="/menu">ordenar</ButtonPrimary></SliderContent>
           </Slide>
            <Slide data-testid='slider3'  slide={slide} index={3}>
              <SliderImage src={EmpanadaSlide} alt= "empanadas" >

              </SliderImage>
              <SliderContent><Span>las mejores ofertas</Span>
              <SliderTitle>super descuento <br></br>Empanadas</SliderTitle>
              <ButtonPrimary as={Link} to="/menu">ordenar</ButtonPrimary>
              </SliderContent>
              </Slide>

<ControlsWrapper><ControlLeft data-testid='prevButton' onClick={prevSlide} /><ControlRight  data-testid='nextButton'onClick={nextSlide}/></ControlsWrapper>

<IndicatorWrapper>
  < IndicatorDot data-testid='dot1'  slide={slide}  index={1} onClick={ () => moveToSlide(1)}/>
  <IndicatorDot  data-testid='dot2'  slide={slide} index={2} onClick={ ()=>moveToSlide(2)}/>
  <IndicatorDot data-testid='dot3'   slide={slide}  index={3} onClick={ ()=>moveToSlide(3)}/>
  </IndicatorWrapper>

    </SliderContainer>

  </StyledSlider>
)
}