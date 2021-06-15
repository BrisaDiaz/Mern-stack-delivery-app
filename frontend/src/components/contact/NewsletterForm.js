import styled  from 'styled-components'
import {ErrorMessage} from './ContactForm'
import useNewsletterForm from '../../hooks/useNewsletterForm'
import {Button} from '../Buttons'

const StyledNewsletter = styled.article`
box-sizing:border-box:
max-width:100%;
background: ${props => props.theme.orange};

`;
const Wrapper = styled.div`
width:100%;
display:flex;
padding : 75px 25px;
flex-wrap:wrap;
& > * {
padding: 10px 15px;
  flex:1;
  flex-basis:450px;
  min-height:100px;
}
`;
const NewsletterTitle= styled.h2`
text-transform: uppercase;
font-size:30px;
@media screen and (min-width: 550px){
  font-size:42px;
}
@media screen and (min-width: 950px){
  font-size:47px;
}
`;

const NewsletterText= styled.div`
color:#fff;
`;
const StyledNewsletterForm= styled.form`
line-height: 0.8em;
display:flex;
flex-flow:column;
align-items:center;
justify-content:center;
& > ${ErrorMessage}{
  color:#fff;
}
`;

const NewsletterFormWrapper= styled.div`
width:100%;
display:flex;
flex-wrap:wrap;
align-items:center;
& > *{
  flex:1;
  min-width:200px;
  margin: 10px 5px
}

`;
const NewsletterInput= styled.input.attrs(props => ({
  type: 'text',
  placeholder: 'Ingrese su email',

}))`
padding: 17px 10px 17px 20px;
  &::placeholder {
  font-weight: 500;
   font-size: 17px;
   letter-spacing: 1px;
  padding: 5px 0;
    
  }
  border:none;
  border-radius:5px;
  outline:none;
  min-height;50px;
`;

export default function NewsletterForm(){

const {register,handleSubmit,errors,onSubmit} =useNewsletterForm()


  return(
<StyledNewsletter>
  <Wrapper>
    <NewsletterText>
      <NewsletterTitle>subscribete  a nuestro newsletter</NewsletterTitle>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
    </NewsletterText>
    <StyledNewsletterForm onSubmit={handleSubmit(onSubmit)}>
                 {errors.userEmail && <ErrorMessage>{errors.userEmail.message}</ErrorMessage>}
      <NewsletterFormWrapper>
        <NewsletterInput 
          name="userEmail"

          ref={register({
                     required: true,
                    
                      pattern:{
                      value:/^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/,
                      message: "*Email no valido"
                      }
          })}
           style={{ borderColor: errors.userEmail && "#000" }}
        ></NewsletterInput>
      
<Button as="input" type="submit" value="Subscribirme"/>

      </NewsletterFormWrapper>
    </StyledNewsletterForm>
  </Wrapper>
</StyledNewsletter>
  );
}