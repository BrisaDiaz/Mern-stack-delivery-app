import styled  from 'styled-components'
import useAdminOrderStateChart from '../../hooks/useAdminOrderStateChart'
import {Process,ProcessInfo} from '../account/UserOrderStateChart'

const ConfirmationButton = styled.button`
    cursor: pointer;
    padding: 4px 5px 5px;
    margin-top: 5px;
    outline: none;
    border: none;
    border-radius: 5px;
    background: #fcba1c;
    color: white;
    font-family: 'Oswald';
    transition: all 0.3s ease;
    opacity: ${(props) =>(props.disabled ? "0.5" : "1")};
    &:hover{
      background:#fcaf01;
    }
}
`

export default  function AdminOrderStateChart({states,orderId,makeRefresh,refreshState}){


const  {handleConfirmation,nextStep} = useAdminOrderStateChart({orderId,makeRefresh,refreshState,states})


  return(

   <Process>
{states?.map( (state,index ) =>

    (state?.confirmed) ?
  
     <ProcessInfo  key ={index}>
           <h4>{state.name}</h4>
           <small>{new Date(state?.date).toLocaleString()?.split(" ")[0]}</small>
            <small>{new Date(state?.date).toLocaleString()?.split(" ")[1]}</small>
         </ProcessInfo>
  :
       <ProcessInfo  key ={index}>
           <h4>{state?.name}</h4>
           <ConfirmationButton disabled={state !== nextStep && true} onClick={(e) =>
             handleConfirmation(e,state?.name)} >Confirmar</ConfirmationButton>
         </ProcessInfo>

  
  )}

   </Process>    
  );
}