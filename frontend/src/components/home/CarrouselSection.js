import styled from "styled-components";
import NewestProductsCarrousel from "./NewestProductsCarrousel";
import SectionTitle from "../SectionTitle";
const Container = styled.section`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 0 15px;
`;
export default function CarrouselSection() {
  return (
    <>
      <SectionTitle>Últimas Novedades</SectionTitle>
      <Container>
        <NewestProductsCarrousel />
      </Container>
    </>
  );
}
