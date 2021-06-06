import styled  from 'styled-components'
import {Process,ProcessInfo} from '../account/OrderDetails'
import AppContext from '../../context/app-context'
import {   useContext} from 'react'
import updateOrderStateAPI from '../../API/updateOrderStateAPI'
import {useHistory} from 'react-router-dom'

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

 const {token,setIsLoading} = useContext(AppContext)

 const history = useHistory()
  let nextStep = states?.find(state => state?.confirmed === false)

const handleConfirmation = async (e,stateName) =>{

if(!e.target.disabled) {
  try{
 await updateOrderStateAPI({token,orderId,stateName,setIsLoading,history})
makeRefresh(!refreshState)


  }catch(err){
    console.log(err)
  }

} 

return
}

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