import styled  from 'styled-components'
import {useStorage} from '../context/useStorage'
import {LoaderSpinner} from './LoaderSpinner'

const Page = styled.main`
position:fixed;
flex-direction:column;
display: flex ;
justify-content:center;
align-items:center;
top:0;
bottom:0;
left:0;
right:0;
z-index:2000;
background: #fff;

`;
export default function LoadingPage(props){
      let {isLoading}  = useStorage()
  return(

   (isLoading || props.isLoading) ?
   <Page  ><LoaderSpinner data-testid='loadingSpinner' /></Page>
 : null

  )
}