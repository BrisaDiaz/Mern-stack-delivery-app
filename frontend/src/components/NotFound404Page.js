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

  & > h2 {
      width: max-content;
    margin: 0 auto;
  }

 position: absolute;
    top: 50%;
    transform: translate(0, -50%);

    @media screen and (min-width:600px){
      font-size:50px;

    }
}





    

`;
const ErrorCode = styled.h2`
font-size:60px;
@media screen and (min-width:600px){
      font-size:100px;

    }
`;
export default function NotFound404Page(){

return(
  <Page>
    <div>
      <ErrorCode>🧂</ErrorCode>
    <ErrorCode>Error 404</ErrorCode>
    <h2>Page Not Found</h2>
    </div>

  </Page>
);
}