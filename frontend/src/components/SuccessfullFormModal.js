import correctIcone from '../img/check-circle-solid.svg'
import styled  from 'styled-components'
import {useContext} from 'react' 
import AppContext from '../context/app-context'

const Modal = styled.section`
position:fixed;
display:flex;
justify-content:center;
align-items:center;
top:0;
bottom:0;
left:0;
right:0;
z-index:2000;
`;
const CorrectlySendedIcone = styled.div`
    width: 140px;
    height: 140px;
    display: flex;
    background: #fff;
    border-radius: 50%;
    justify-content: center;
`; 
const OkIcone = styled.img`

    box-shadow: 2px 3px 7px 0px #00000082;;
    border-radius: 50%;
`
 function SuccesIconeMessage(){
  return <CorrectlySendedIcone><OkIcone src={correctIcone} alt="uploaded"/></CorrectlySendedIcone>
}

export default function SuccessfullFormModal(){
const {isSuccessfullySend} = useContext(AppContext);

  return(
   isSuccessfullySend ?
   <Modal ><SuccesIconeMessage/></Modal>
 : null

  )
 
}