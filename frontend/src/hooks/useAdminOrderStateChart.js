import updateOrderStateAPI from "../API/updateOrderStateAPI";
import { useHistory } from "react-router-dom";
import { useStorage } from "../context/useStorage";

export default function useAdminOrderStateChart({
  orderId,
  makeRefresh,
  refreshState,
  states,
}) {
  const { token, setIsLoading } = useStorage();

  const history = useHistory();

  let nextStep = states?.find((state) => state?.confirmed === false);

  const handleConfirmation = async (e, stateName) => {
    if (!e.target.disabled) {
      await updateOrderStateAPI({
        token,
        orderId,
        stateName,
        setIsLoading,
        history,
      });
      makeRefresh(!refreshState);
    }
    return;
  };

  return { handleConfirmation, nextStep };
}
