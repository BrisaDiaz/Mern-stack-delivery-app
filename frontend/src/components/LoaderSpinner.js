import styled, { keyframes }  from 'styled-components'
export const spin = keyframes `

  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }

`

export  const LoaderSpinner = styled.div`
    margin: 0 auto 20px;
 border: ${(props) => (props.small ? "12px" : "16px" )}  solid #f3f3f3; 
  border-top: ${(props) => (props.small ? "12px" : "16px" )} solid #fcba1c;
  border-radius: 50%;
    box-shadow: inset 0 0 5px 0px #00000080;
  width: ${(props) => (props.small ? "60px" : "120px" )};
  height: ${(props) => (props.small ? "60px" : "120px" )};
  animation: ${spin} 1.2s linear infinite;
`

