import styled  from 'styled-components';
import {useState} from 'react' 

const MoreButton = styled.button`
padding: 0 6px;
    outline: none;
    cursor: pointer;
    position: absolute;
    transition: all 0.3s;
    font-weight: 600;
    top: 8px;
    background: #fcba1c;
    border: 1px solid;
    font-size: 18px;
    color: white;
    border-radius: 5px;
    box-shadow: inset 0 0 4px #00000038;
    text-shadow: 0 1px 2px black;
        transform: scale(0.8);
`;
export default function SeeMoreButton({trigger}){
 const [isToggledDetails,setIsoggledDetails] = useState(false)
 const handleClick = () =>{
   trigger()
    setIsoggledDetails(!isToggledDetails)
 }
  return(
 <MoreButton onClick={handleClick}>{isToggledDetails ? "x" :  "+"}
     </MoreButton>

  );
}