import styled from "styled-components";

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 15px;
  & > button {
    padding: 5px 10px 6px;
    cursor: pointer;
    background: transparent;
    text-decoration: underline;
    text-underline-offset: 3px;

    border: transparent;
    outline: transparent;

    font-family: oswald;
  }
  @media screen and (min-width: 500px) {
    & > button {
      transform: scale(1.1);
    }
  }
`;
export default function PaginationButtons({ page, maxPage, setPage }) {
  return (
    <ButtonsWrapper>
      {page > 1 ? (
        <button onClick={(e) => setPage(page - 1)}>{"<< "}Prev</button>
      ) : null}
      {page < maxPage ? (
        <button onClick={(e) => setPage(page + 1)}>Next{" >>"}</button>
      ) : null}
    </ButtonsWrapper>
  );
}
