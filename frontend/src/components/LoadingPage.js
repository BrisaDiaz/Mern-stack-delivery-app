import styled  from 'styled-components'
import AppContext from './../context/app-context'
import {   useContext } from 'react'

const Page = styled.main`
position:fixed;
display:flex;
justify-content:center;
align-items:center;
top:0;
bottom:0;
left:0;
right:0;
z-index:2000;
background: #fff;
`;
export default function LoadingPage(){
      const {isLoading}  = useContext(AppContext);
  return(

   isLoading ?
   <Page ><h2>Loading...</h2></Page>
 : null

  )
}