import updateOrderStateAPI from '../API/updateOrderStateAPI'
import {useHistory} from 'react-router-dom'

export default function useAdminOrderStateChart({token,setIsLoading,orderId,makeRefresh,refreshState,states}){

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


return {handleConfirmation,nextStep}
}