import styled  from 'styled-components'
import usePaginationComponent from '../hooks/usePaginationComponent'
const PageNumbersContainer = styled.ul`
  list-style: none;
  display: flex;
`; 
const ComponentCell = styled.li`
   padding: 10px;
  border: 1px solid white;
  cursor: pointer;
   background-color: ${(props) => (props.isActive ? "orange" : "#fff")};
  color: ${(props) => (props.isActive ? "#fff" : "orange")};
`; 
const PageNumberButton = styled.button`
background-color: #fff;
  border: none;
    outline: none;
  color: orange;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover{
  background-color: orange;
  color: #fff;
  }
`;
function Pagination()  {

let  {
  currentPage,
  pages,
    handleClick,
    handleNextbtn,
    handlePrevbtn,
  maxPageNumberLimit,
  minPageNumberLimit
  }= usePaginationComponent()
console.log(pages)
  return (
    
            <PageNumbersContainer>
        <ComponentCell>
          <PageNumberButton
            onClick={handlePrevbtn}
            disabled={currentPage === pages[0] ? true : false}
          >
            Prev
          </PageNumberButton>
        </ComponentCell>

        {(minPageNumberLimit >= 1)  ?
 <ComponentCell onClick={handlePrevbtn}> &hellip; </ComponentCell>
 : null
  }

        { pages.map((number) => 

    (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) ?

  <ComponentCell
          key={number}
          id={number}
          onClick={handleClick}
          isActive={currentPage === number ? true : false}
        >
          {number}
        </ComponentCell>

       : null
        )}


   {  ( pages.length > maxPageNumberLimit) ?
   <ComponentCell onClick={handleNextbtn}> &hellip; </ComponentCell> : null}


        <ComponentCell>
          <PageNumberButton
            onClick={handleNextbtn}
            disabled={currentPage === pages[pages.length - 1] ? true : false}
          >
            Next
          </PageNumberButton>
        </ComponentCell>
      </PageNumbersContainer>
 
  )
}

export default Pagination
