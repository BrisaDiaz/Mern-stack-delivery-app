import { POST } from "../utils/http";

async function singUpAPI({
  setIsFormLoading,
  setServerError,

  history,
  info,
}) {
  try {
    const { response, json } = await POST("/api/auth/singUp", info);

    setIsFormLoading(false);

    if (response.status === 201 || 302) {
      setServerError("");

      const { redirect, id } = json;

      localStorage.setItem("toConfirmUser", id);

      setTimeout(() => {
        return history.push(redirect);
      }, 1000);
    }

    if (response.status === 400) {
      setServerError(json.message);
      return;
    }
  } catch (err) {
    console.log(err);
  }
}

export default singUpAPI;
