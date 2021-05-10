import styled, { keyframes }  from 'styled-components'
const spin = keyframes `

  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }

`

export  const LoaderSpinner = styled.div`
 border: ${(props) => (props.small ? "12px" : "16px" )}  solid #f3f3f3; 
  border-top: ${(props) => (props.small ? "12px" : "16px" )} solid #fcba1c;
  border-radius: 50%;
  width: ${(props) => (props.small ? "60px" : "120px" )};
  height: ${(props) => (props.small ? "60px" : "120px" )};
  animation: ${spin} 2s linear infinite;
`

