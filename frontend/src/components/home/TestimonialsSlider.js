import styled  from 'styled-components'
import {useEffect,useState} from 'react'
import useDinamicDotSlider from '../../hooks/useDinamicDotSlider'
import quoteIcone from '../../img/left-quote.svg'
import { SliderContainer,IndicatorWrapper,IndicatorDot,SliderContent,Slide} from './HeroSlider'

const StyledTestimonialSlider = styled.div`
width:100%;
min-height:360px;

position:relative;

`;
const ThisSlide= styled(Slide)`
background:${props => props.theme.black};

`
const ThisSlideContent= styled(SliderContent)`
justify-content:center;
padding: 50px 0;
`;

const ThisIndicatorDot = styled(IndicatorDot)`
border:2px solid ${props => props.theme.darckYellow};
background: ${(props)=>(( props.slide === parseInt(props.index )) ? "#fcba1c" : "transparent")} ;
`;
const Comment = styled.p`
color: #fff;
text-align:center;

`;
const Name = styled.h4`
line-height: 25px;
font-size:25px;
color: #fcba1c;
text-align:center;
text-shadow: ${props => props.theme.darckTextShadow};
    height: 30px;
`;
const EmailContact = styled.small`
color:${props => props.theme.darckYellow};
text-align:center;
margin-top:30px;
padding-bottom: 50px;
`;
const QuoteIcon = styled.img`
width:60px;
height: auto;
margin:0 auto;
margin-bottom:10px;
`;
export default function Testimonials(){
const [testimonials, setTestimonials] = useState([])

useEffect( ()=> {

  async function fetchData(){
    try{

const res = await fetch('https://jsonplaceholder.typicode.com/comments');
  const data = await res.json()
  
  data.length = 5

  setTestimonials(data)

    }catch(err){
      console.log(err)
    }

  };
fetchData()

},[])

  const {slide ,moveToSlide} = useDinamicDotSlider(testimonials)


return(
  <StyledTestimonialSlider>
  <SliderContainer>
{testimonials.map( (testimonial,index)=>
     <ThisSlide key={index} slide={slide} index={index}>
       <ThisSlideContent>
<Name>{testimonial.name}</Name> 
<QuoteIcon src={quoteIcone} alt="happy-clients"></QuoteIcon>
<Comment>{testimonial.body}</Comment>
<EmailContact>{testimonial.email}</EmailContact>
       </ThisSlideContent>
 
      </ThisSlide>
 
  )}
   


<IndicatorWrapper>
  {testimonials.map( (testimonial,index)=>
   < ThisIndicatorDot key={index} slide={slide}  index={index} onClick={ () => moveToSlide(index)}/>
  )}

  </IndicatorWrapper>

    </SliderContainer>
  </StyledTestimonialSlider>
);
}