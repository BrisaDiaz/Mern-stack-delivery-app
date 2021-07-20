import styled from "styled-components";
import NewestProductsCarrusel from "./NewestProductsCarrusel";
import { SectionTitle } from "../menu/Menu";
const Container = styled.section`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 0 15px;
`;
export default function CarrucelSection() {
  return (
    <>
      <SectionTitle>Últimas Novedades</SectionTitle>
      <Container>
        <NewestProductsCarrusel />
      </Container>
    </>
  );
}
