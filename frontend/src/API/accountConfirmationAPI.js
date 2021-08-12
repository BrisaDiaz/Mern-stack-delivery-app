import { POST } from "../utils/http";

const accountConfirmationAPI = async ({
  setIsSuccessfullySend,
  setIsRequesLoading,
  history,
}) => {
  setIsRequesLoading(true);

  const info = { id: localStorage.getItem("toConfirmUser") };

  try {
    const { response } = await POST("/api/auth/confirmation", info);

    setIsRequesLoading(false);

    if (response.status === 200) {
      setIsSuccessfullySend(true);
      localStorage.removeItem("toConfirmUser");
      setTimeout(() => {
        setIsSuccessfullySend(false);
        history.push("/menu");
      }, 3000);
    }
    if (response.status === 500)
      alert("Error en el servidor, vuelva a interntar");
  } catch (err) {
    console.log(err);
  }
};

export default accountConfirmationAPI;
