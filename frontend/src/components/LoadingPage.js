import styled  from 'styled-components'
import AppContext from './../context/app-context'
import {   useContext } from 'react'
import {LoaderSpinner} from './LoaderSpinner'
const Page = styled.main`
position:fixed;
flex-direction:column;
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
   <Page ><LoaderSpinner/></Page>
 : null

  )
}