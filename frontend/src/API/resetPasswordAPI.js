import { POST } from "../utils/http";
async function resetPasswordAPI({
  setIsFormLoading,
  setServerError,
  info,
  token,
  history,
}) {
  try {
    setIsFormLoading(true);

    const { response, json } = await POST(
      `/api/auth/resetPassword/${token}`,
      info
    );

    setIsFormLoading(false);

    if (response.status >= 400) {
      setServerError(json.message);
      return;
    } else {
      return history.push("/authentication/login");
    }
  } catch (err) {
    console.log(err);
  }
}

export default resetPasswordAPI;
