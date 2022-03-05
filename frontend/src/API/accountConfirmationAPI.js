import { POST } from "../utils/http";

const accountConfirmationAPI = async ({
  setIsSuccessfullySend,
  setIsRequestLoading,
  history,
}) => {
  setIsRequestLoading(true);

  const info = { id: localStorage.getItem("toConfirmUser") };

  try {
    const { response } = await POST("/api/auth/confirmation", { email: info });

    setIsRequestLoading(false);

    if (response.status === 200) {
      setIsSuccessfullySend(true);
      localStorage.removeItem("toConfirmUser");
      setTimeout(() => {
        setIsSuccessfullySend(false);
        history.push("/menu");
      }, 3000);
    }
  } catch (err) {
    console.log(err);
  }
};

export default accountConfirmationAPI;
