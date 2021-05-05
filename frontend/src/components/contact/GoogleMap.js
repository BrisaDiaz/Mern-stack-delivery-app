
import styled  from 'styled-components'

const StyledGoogleMap= styled.iframe.attrs(props =>({
  src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217954.2534022472!2d-64.33442911558893!3d-31.399377044309926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432985f478f5b69%3A0xb0a24f9a5366b092!2zQ8OzcmRvYmE!5e0!3m2!1ses-419!2sar!4v1617248194061!5m2!1ses-419!2sar" ,
  loading:"lazy"

}))`

height:100vh;
width:100vw;

`;
export default function GoogleMap(){
  return(
<StyledGoogleMap/>
  )
}