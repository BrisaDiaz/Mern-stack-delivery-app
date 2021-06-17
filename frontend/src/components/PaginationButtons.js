
import styled from 'styled-components'

export const ButtonsWrapper = styled.div`
display:flex;
justify-content:center;
width:100%;
gap:15px;
&> button{
  padding: 5px 10px 6px;
  cursor:pointer;
  background:${props => props.theme.black};
    color:${props => props.theme.darckYellow};
box-shadow:${props => props.theme.lightBoxShadow};
    border:transparent;
    outline:transparent;
    fornt-size:20px;
    font-family:oswald;
    lettter-spacing: 1px;
    border-radius: 10px;
}
@media screen and (min-width:500px){
  &> button{
    transform:scale(1.1);
  }
}
`;
export default function PaginationButtons({page,maxPage,setPage}){
  return(
    <ButtonsWrapper>
          {
            (page > 1) ? <button onClick={(e) => setPage(page - 1)} >
           {'<< '}Prev</button> : null
          }
          {
            (page < maxPage) ? <button onClick={(e) => setPage(page + 1)} >
              Next{' >>'}</button> : null
          }
        </ButtonsWrapper>
  );
}