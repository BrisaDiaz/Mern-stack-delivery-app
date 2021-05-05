import styled from 'styled-components'
import {SectionTitle} from '../menu/Menu'
import background from '../../img/about-background.png'

const StyledAbout = styled.section`
width:100vw;
margin-bottom:40px;


`;
const Title=styled(SectionTitle)`
padding-bottom: 20px;
`
const AboutWrapper= styled.article`

width:100vw;
display:flex;
flex-flow: row;
flex-wrap: wrap;

  & > *{
    width:100%;
    flex:1 0 1;
 min-height: 300px;
 margin-top:-50px;
    @media  screen and (min-width:950px){
      width:50%;
         margin-top:0;
    }
  }
`; 
const ImgSection = styled.div`
background:url(${background}) no-repeat center center;
background-size: auto 100%;

 @media  screen and (min-width:950px){
     background:url(${background}) no-repeat 30% center;
   background-size: auto 100%;
    margin-top:0;

    }
`;
const HistoriSection = styled.div`
text-align:center;
padding:25px;
display:flex;
justify-content:center;
align-items:center;
line-heigth:35px;
@media  screen and (min-width:950px){
    padding:50px;
    }
`;
export default function About(){
return(
<StyledAbout>

  <Title>Sobre Nosotros</Title>

  <AboutWrapper cassName="flex">

  <HistoriSection>
   <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem temporibus quod itaque mollitia quidem. Eos nemo nam corrupti ipsam iusto facilis sit blanditiis, placeat omnis amet voluptatem. Dolor, recusandae atque?.
     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt voluptates quasi corporis nihil pariatur repudiandae debitis! Sed sit, quaerat laudantium consectetur quibusdam ab aut laboriosam veniam ducimus. Odit, sed aperiam!
      </p>
  </HistoriSection>
<ImgSection>

</ImgSection>

  </AboutWrapper>


</StyledAbout>
);
}