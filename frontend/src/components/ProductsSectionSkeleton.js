import styled from 'styled-components'

const Container = styled.section`
 width: 100%;
    gap: 30px;
    display: grid;
    padding: 10px 15px 30px;
    grid-template-columns: repeat( auto-fit,minmax(250px,300px) );
    max-width: 1000px;
    margin: 0 auto;
justify-content: center;
`

export const Item = styled.figure `
display:flex;
box-sizing:border-box;
border-radius:5px;
position:relative;
min-width: 250px;
height:350px;
flex-flow:column;
over-flow:hidden;
padding:20px;
border: 1px solid #00000026;
box-shadow: 1px 1px 5px #00000057;
background:#f3f3f3;
`
const ImgContainer = styled.div`
height:150px;
width:100%;
positon:relative;
display:flex;
background:#fff;
margin-bottom:10px;
border-radius:5px;
box-shadow: 0 1px 3px #ccc;

`;
const TextLine = styled.div`
height:20px;
width:100%;
background:#fff;
margin: 10px auto;
box-shadow: 0 1px 3px #ccc;
`
export function SkeletonItem(){
  return(
  <Item>
    <ImgContainer/>
    <TextLine/>
     <TextLine/>
  </Item>
  )
}
export default function ProductsSectionSkeletom() {

  return(
<Container data-testid='products-skeketom'>


    <SkeletonItem/>
    <SkeletonItem/>
    <SkeletonItem/>
    <SkeletonItem/>
    <SkeletonItem/>
    <SkeletonItem/>

</Container>

  )
}