import styled from 'styled-components'
import background from '../../img/about-background.png'

const StyledAbout = styled.section`
width:100vw;
margin-bottom:40px;


`;
const Title=styled.h2`
padding-bottom: 20px;
    text-align: center;
    text-transform: uppercase;
    color: #fcba1c;
margin: 0 auto;
    text-shadow: -2px -1px 0 #000;
`
const AboutWrapper= styled.article`
max-width:1250px;
justify-content:center;
min-height: 300px;
width:100vw;
display:flex;
flex-flow: row;
flex-wrap: wrap;
margin: 0 auto;
  & > *{
    flex:1 0 1;
 margin-top:-50px;
    @media  screen and (min-width:950px){
      width:50%;
         margin-top:0;
    }
  }
`; 
const ImgSection = styled.div`
display:flex;
justify-content:center;

`;
const Image = styled.img`
max-width:400px;
margin: 0 auto;
@media  screen and (min-width:950px){
    margin-top:-45px;
    }
`;
const HistoriSection = styled.div`
text-align:center;
padding:  50px 25px;
margin-left:-6px;
display:flex;
justify-content:flex-start;
flex-flow: column;
align-items:center;
line-heigth:35px;
@media  screen and (min-width:950px){
  max-width:600px;
    margin-right: -100px;
    align-items:flex-start;
}


    
`;
export default function About(){
return(
<StyledAbout>



  <AboutWrapper cassName="flex">

  <HistoriSection>
      <Title>Sobre Nosotros</Title>

   <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem temporibus quod itaque mollitia quidem. Eos nemo nam corrupti ipsam iusto facilis sit blanditiis, placeat omnis amet voluptatem. Dolor, recusandae atque?.
     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt voluptates quasi corporis nihil pariatur repudiandae debitis! Sed sit, quaerat laudantium consectetur quibusdam ab aut laboriosam veniam ducimus. Odit, sed aperiam!
      </p>
  </HistoriSection>
<ImgSection>
<Image src={background} alt="burger"></Image>
</ImgSection>

  </AboutWrapper>


</StyledAbout>
);
}