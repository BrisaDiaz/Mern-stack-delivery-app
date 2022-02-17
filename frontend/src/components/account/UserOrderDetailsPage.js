import styled from "styled-components";
import GoBackLink from "../GoBackLink";
import UserOrderStateChart from "./UserOrderStateChart";
import useUserOrderDetailsPage from "../../hooks/useUserOrderDetailsPage";

export const Page = styled.main`
  padding: 60px 15px;
  min-height: 100vh;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  text-transform: capitalize;
  & > h3 {
    margin-top: 20px;
  }
  @media screen and (max-width: 440px) {
    & > h3 {
      font-size: 20px;
      margin-top: 20px;
    }

    & > h3 span {
      display: block;
    }
  }
`;
export const OrderId = styled.h3`
  margin-top: 40px;
  text-align: center;
`;

export const DetailTable = styled.table`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  border-spacing: 15px;
  border-collapse: collapse;
  border: 2px solid ${(props) => props.theme.black};
  text-transform: capitalize;
  & > thead,
  tfoot {
    background-color: ${(props) => props.theme.black};
    color: ${(props) => props.theme.darkYellow};
  }
  & > tfoot td h4 {
    margin: 10px 0;
    text-align: center;
  }
  & > tfoot td h4 span {
    margin-right: 5px;
    color: #f3f3f3;
  }
  & > thead th {
    padding: 10px 5px;
    font-family: "Oswald", sans-serif;
    font-size: 19px;
  }
  & > tbody tr {
    border-bottom: 1px solid;
  }
  & > tbody tr td {
    padding: 10px;
    text-align: center;
  }
  @media screen and (max-width: 400px) {
    border-spacing: 0;
    width: 100%;
    & > thead th {
      font-size: 16px;
    }
    & > tbody {
      font-size: 12px;
    }
  }
`;
export const ClientInfo = styled.div`
& > h3{
  margin-bottom:5px;
}
@media screen and (max-width: 440px){
  & > h3 {
    font-size: 20px;
align-self: center;
}
}
    background: #f0f0f0;
    padding: 8px 16px;
    border-radius: 12px;

margin: 0 auto;

display: flex;
flex-direction:column;
align-items:start;
gap:5px;
}
`;

const SplitSection = styled.section`
  display: flex;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  gap: 20px;
  flex-wrap: wrap;
  & > * {
    with: 100%;
    flex: 1 1 400px;
  }
`;
export default function OrderDetails() {
  let { thisOrder, isLoading, isPaid } = useUserOrderDetailsPage();

  return isLoading ? null : (
    <Page>
      <GoBackLink to="/myAccount/myOrders">Regresar</GoBackLink>
      <OrderId>
        Nº ID:<span>{thisOrder?.orderID}</span>
      </OrderId>

      <UserOrderStateChart
        states={thisOrder?.states?.filter((state) => state?.confirmed === true)}
      />

      <SplitSection>
        <ClientInfo>
          <h3>Detalles de envio</h3>
          <p>
            <b>Destinatario:</b>
            {thisOrder?.client[0]?.name}
          </p>
          <p>
            <b>Dirrección:</b>
            {thisOrder?.client[0]?.address}
          </p>
          <p>
            <b>Teléfono:</b>
            {thisOrder?.client[0]?.number}
          </p>
        </ClientInfo>
      </SplitSection>

      <br></br>

      <h3>Detalles del pedido</h3>
      <DetailTable>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Unidades</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {thisOrder?.description?.map((productInf) => (
            <tr key={productInf._id}>
              <td>
                <b>{productInf?.product?.name}</b>
              </td>
              <td>${productInf?.product?.price}</td>
              <td>{productInf?.quantity}</td>
              <td>${productInf?.total}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">
              <h4>
                <span>Total:</span>${thisOrder?.total}
              </h4>
            </td>
          </tr>
        </tfoot>
      </DetailTable>
    </Page>
  );
}
