import styled from "styled-components";
import { withError } from "./../withError";
import EditProductForm from "./EditProductForm";
import GoBackLink from "../GoBackLink";
import { LinksWrapper } from "./DashboardNewProduct";
export const StyledSection = styled.main`
  padding-top: 60px;
  margin: 0;
  min-height: 100vh;
  width: 100vw;
`;
const DashboardEditProduct = () => {
  return (
    <StyledSection>
      <LinksWrapper>
        <GoBackLink to="/dashboard/myProducts">Regresar</GoBackLink>
      </LinksWrapper>
      <EditProductForm />
    </StyledSection>
  );
};

export default withError(DashboardEditProduct);
