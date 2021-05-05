import {  useState , useEffect} from 'react'

export default function useStaticInfoSlider(){
  const [slide, setslide] = useState(1);

const moveToSlide = (index) =>{
    setslide(index)
} 
const nextSlide = ( ) => {
setslide(slide +1)
if( slide === 3){
  setslide(1)
}
}
const prevSlide = ( ) =>{
  setslide(slide -1)
  if( slide === 1){
  setslide(3)
}

}
 useEffect(() => {
   const intervalId = setInterval(nextSlide , 4000);
   return () => clearInterval(intervalId);
 });
return { prevSlide, nextSlide,moveToSlide,slide}
}
