import {useEffect,useState } from 'react';
import {io} from "socket.io-client"
import {useStorage} from '../context/useStorage'

export default function useApp(){
  
    let [orderActualizationNotification,setOrderActualizationNotification] =useState(0)
    let [orderActualizationMessage ,setOrderActualizationMessage]=('')
   let [newOrdersNotification,setNewOrdersNotification] =useState(0)
   const [socket,setSocket] =useState(null)
 const {currentUser,isLogin}= useStorage()



useEffect(() => {

  if(isLogin) {

  const ENDPOINT = "http://127.0.0.1:7000";
const socket  = io.connect(ENDPOINT);
  socket.auth ={userId: currentUser._id,userRole:currentUser.roles[0].name }

 socket.on("connect", () => {
console.log('user conencted')

setSocket(socket)
});

return () => socket.disconnect();
  }

}, [isLogin])

if(socket){

socket?.on('newOrder', order => {
  setNewOrdersNotification(newOrdersNotification+ 1)


      });

 socket?.on('orderActualization', order => {

const lastUpdateState = order.states.reverse().find(state => state.confirmed === true)

  setOrderActualizationNotification(orderActualizationNotification+1)
setOrderActualizationMessage(`Pedido ${lastUpdateState.name}` )
      });

}



  return {setOrderActualizationNotification,setNewOrdersNotification,newOrdersNotification,orderActualizationNotification,orderActualizationMessage }
}