import styled from 'styled-components'

const Page = styled.section`
padding: 15px;
padding-top:58px;
display:flex;
position:relative;
flex-direction:column;
justify-content:center;
align-items:center;
min-height:100vh;
background: linear-gradient(
123deg
, #ffa500, #fcba1c8f);
& > div {
     max-width: 900px;
    position: absolute;
    background: rgba(225,225,225,0.1);
    top: 50%;
    border: 1px solid rgb(255 255 255 / 10%);
    border-radius: 10px;
    box-shadow: 0 25px 45px rgb(0 0 0 / 10%);
    padding: 20px 10px;
    transform: translate(0,-50%);
    text-align:center;
}





    

`;
const ErrorTitle = styled.h2`
font-size:30px;
text-align:center;
margin-bottom:20px;
@media screen and (min-width:600px){
      font-size:40px;

    }
`;
export default function ErrornNotificationPage(){

return(
  <Page>
    <div>
      <ErrorTitle>error title</ErrorTitle>
    <h4>error description message.</h4>
    </div>

  </Page>
);
}