import styled from "styled-components";

export const Process = styled.div`
  margin: 20px auto;
  padding: 15px;
  gap: 15px;
  width: 100%;
  max-width: max-content;
  min-height: 30px;
  background-color: ${(props) => props.theme.black};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 10px;
  @media screen and(max-width:600px) {
    max-width: 280px;
  }
`;
export const ProcessInfo = styled.div`
  color: ${(props) => props.theme.gray};
  display: flex;
  text-align: center;
  & > h4 {
    margin: 0;
    color: ${(props) => props.theme.darkYellow};
  }

  align-items: center;
  flex-direction: column;
`;

export default function UserOrderStateChart({ states }) {
  return (
    <Process>
      {states?.map((state) => (
        <ProcessInfo key={state?.date}>
          <h4>{state?.name}</h4>
          <date>
            <small>
              {new Date(state?.date).toLocaleString()?.split(" ")[0]}
            </small>
            <br></br>
            <small>
              {new Date(state?.date).toLocaleString()?.split(" ")[1]}
            </small>
          </date>
        </ProcessInfo>
      ))}
    </Process>
  );
}
