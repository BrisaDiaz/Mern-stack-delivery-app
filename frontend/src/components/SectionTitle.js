import styled from "styled-components";
const SectionTitle = styled.h2`
  text-align: center;
  text-transform: uppercase;
  margin: 1em auto;
  color: ${(props) => (props.light ? "#fff" : "#fcba1c")};
  text-shadow: ${(props) => props.theme.darkTextShadow};
`;
export default SectionTitle;
