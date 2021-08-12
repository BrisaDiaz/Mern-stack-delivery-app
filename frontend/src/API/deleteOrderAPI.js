import { DELETE } from "../utils/http";
async function deleteOrderAPI({ token, id }) {
  try {
    await DELETE(`/api/orders/${id}`, token);
  } catch (err) {
    console.log(err);
  }
}

export default deleteOrderAPI;
