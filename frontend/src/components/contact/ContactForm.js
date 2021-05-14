import styled  from 'styled-components'
import useContactForm from '../../hooks/useContactForm'
import SocilasMenu from '../SocialsMenu'
import {ErrorMessage} from '../auth/SingupForm'
import {ButtonPrimary} from '../Buttons'
import phoneIcone from '../../img/phone-alt-solid.svg'
import emailcone from '../../img/envelope-regular.svg'

import {Link, Icone,ListItem,List} from  '../Footer'


 const StyledContact = styled.article`
box-sizing:border-box:
max-width:100%;
padding:20px 0;
display:flex;
flex-wrap:wrap;
& > * {
padding:10px  25px;
height:100%;
}
`;
const FormSection = styled.div`

width:100%;
  flex: 1 1 450px;
  @media screen and (min-width: 550px){
    padding:10px  32px ;
  
  }
`;
const Form = styled.form`
width:100%;
height:100%;
display:flex;
flex-flow:column;
& > small {
      margin: -10px auto 4px 0;
}
`;

const InfoSection = styled.div`
display:flex;
flex-flow:column;
justify-content:space-evenly;
  flex: 1 0 1;
  min-height:460px;
 width: 40%;
 @media screen and (max-width:750px){
    width: 100%;
     padding:0  25px;
       min-height:350px;
 }
`;
export const NameInput= styled.input.attrs(props => ({
  type: 'text',
  required:true

}))`

padding: 12px 10px 12px 20px;
  &::placeholder {
   font-weight: 500;
   font-size: 17px;

   letter-spacing: 1px;


  }

border:none;
  border-radius:5px;
  outline:none;
    border: 2px solid #171717;
    margin-bottom:15px;
  width:100%;
padding: 12px 10px 12px 20px;
`;
const SubjectInput =styled( NameInput).attrs(props => ({
type:"text",
  placeholder:'Asunto...'

}))``
export const EmailInput= styled(NameInput).attrs(props => ({
type:"email",
  placeholder:'Tu Email...'

}))`
  border: 2px solid #171717;
`
;
const Textarea= styled.textarea.attrs(props => ({
 rows: 50,
 columns: 5,
resize: 'none',
  placeholder:'Tu Mensaje...',
  required:true
}))`
  &::placeholder {
   font-weight: 500;
   font-size: 17px;

   letter-spacing: 1px;


  }
    &::resizer {
  display: none;
}
  border: 2px solid #171717;
  border-radius:5px;
  min-height:250px; 
  max-height:250px; 
  outline:none;
    margin-bottom:25px;
  min-width:100%;
    max-width:100%;
  padding: 12px 10px 12px 20px;

`;
const ContactTitle = styled.h2`

 @media screen and (min-width:750px){
    margin-top: -40px;
 }
`;
const ContactLink = styled(Link)`
color:#000;
`;

export default  function ContactForm() {

    const {register,handleSubmit,errors,onSubmit}= useContactForm()
  
  return(
    <StyledContact>
      <FormSection>
        <Form onSubmit={handleSubmit(onSubmit)}>
     
           {errors.userName && <ErrorMessage>{errors.userName.message}</ErrorMessage>}
          <  NameInput 
          placeholder='Tu Nombre Completo...'
          name="userName"
          ref={register({
             required: "*El campo es requrido",

              pattern:{
                   value: /^[A-Za-zñÑáÁéÉíÍóÓúÚÜü\s\w]+$/,
                    message:'*Nombre no valido'
                      }
            
          })}
                 style={{ borderColor: errors.userName && "#bf0000" }}
          />
                                {errors.userEmail && <ErrorMessage>{errors.userEmail.message}</ErrorMessage>}
          <EmailInput 
          name="userEmail"
          ref={register({
                                required: "*El campo es requrido",
                
                      pattern:{
                        value:/^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/,
                       meassage:'*Email no valido'
                      }
          })}
           style={{ borderColor: errors.userEmail && "#bf0000" }}
          />
               {errors.subject && <ErrorMessage>{errors.subject.message}</ErrorMessage>}


           <  SubjectInput 
          placeholder='Asunto...'
          name="subject"
          ref={register({
             required: "*El campo es requrido",
            
          })}
                 style={{ borderColor: errors.subject && "#bf0000" }}
          />     
            {errors.userMessage && <ErrorMessage>{errors.userMessage.message}</ErrorMessage>}
          <Textarea 
          name="userMessage"
          ref={register({
          required: '*El campo es requerido',
           maxLength:{
                        value:255,
                         message:'*Tu mensaje no debe exceder los 255 carácteres'
                      }
          })}
                 style={{ borderColor: errors.userMessage && "#bf0000" }}
          />
      <ButtonPrimary as="input" type="submit" value="Enviar mensaje"/>
        </Form>
      </FormSection>
      <InfoSection>
   
        <ContactTitle>Contactenos</ContactTitle>
         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit nulla accumsan metus.
           Ipsum dolor sit amet, consectetur adipiscing elit nulla accumsan.
         </p>
          <List>
<ListItem><Icone><img src={phoneIcone} alt="phone"></img></Icone> <ContactLink>+66 396 847 2637</ContactLink></ListItem>
<ListItem><Icone><img src={emailcone} alt="email"></img></Icone> <ContactLink>Hello@Burger.Com</ContactLink></ListItem>
  </List>
  <SocilasMenu/>
      </InfoSection>
    </StyledContact>
  );
}