import useDashboardOrderDetails from "../../hooks/useDashboardOrderDetails";
import AdminOrderStateChart from "./AdminOrderStateChart";
import { Fragment } from "react";
import GoBackLink from "../GoBackLink";
import {
  Page,
  OrderId,
  DetailTable,
  ClientInfo,
} from "../account/UserOrderDetailsPage";

export default function OrderDetails() {
  const { thisOrder, isRefreshing, isLoading, setIsRefreshing } =
    useDashboardOrderDetails();

  return (
    <Page>
      {isLoading ? null : (
        <Fragment>
          <GoBackLink to="/dashboard/orders">Regresar</GoBackLink>

          <OrderId>
            Nº ID:<span>{thisOrder?.orderID}</span>
          </OrderId>

          <AdminOrderStateChart
            states={thisOrder?.states}
            orderId={thisOrder?._id}
            makeRefresh={setIsRefreshing}
            refreshState={isRefreshing}
          />

          <h3>Detalles de envio</h3>

          <ClientInfo>
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
                <tr key={productInf?._id}>
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
        </Fragment>
      )}
    </Page>
  );
}
