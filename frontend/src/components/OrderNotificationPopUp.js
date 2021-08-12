import styled  from 'styled-components'

 const Notification = styled.h4`
display:${props => props.notifications !== 0 ? 'fixed': 'none' };
position:absolute;
top:58px;
right:0;
    background: #9ecdff;
    border-radius: 5px;
padding: 5px 20px 10px;
    text-shadow: -1px 1px #ffffff;
    box-shadow:${props => props.theme.lightBoxShadow};
    z-index:1000;

`
export default function OrderNotificationPopUp({notification,message}){
  return(
        <Notification notifications={notification}>{message}</Notification>
  );
}