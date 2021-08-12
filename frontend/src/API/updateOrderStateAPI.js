import { PUT } from "../utils/http";

export default async function updateOrderState({
  token,
  orderId,
  stateName,
  setIsLoading,
}) {
  try {
    setIsLoading(true);
    const info = { state: stateName };

    await PUT(`/api/orders/${orderId}`, info, token);
    setIsLoading(false);
  } catch (err) {
    console.log(err);
  }
}
