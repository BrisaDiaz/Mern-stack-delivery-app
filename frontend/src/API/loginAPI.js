import usersAPI from "./usersAPI";

import { POST } from "../utils/http";
async function loginAPI({
  info,
  setIsLoading,
  setServerError,
  setIsLogin,
  setToken,
  setIsAdmin,
  history,
  setCurrentUser,
  setAllUsers,
  setIsFormLoading,
  setIsModerator,
}) {
  try {
    setIsFormLoading(true);

    const { json } = await POST("/api/auth/login", info);

    setIsFormLoading(false);

    if (json.user) {
      setServerError("");

      setIsLoading(true);
      const { token, roles, user } = json;

      await setToken(token);

      setCurrentUser(user);

      setIsLogin();

      if (roles[0].name === "admin") {
        setIsAdmin(true);

        await usersAPI({ setAllUsers, token });

        setIsLoading(false);

        return history.push("/dashboard/orders");
      }
      if (roles[0].name === "moderator") {
        setIsModerator(true);
        setIsLoading(false);
        return history.push("/dashboard/myProducts");
      }

      setIsLoading(false);
      return history.push("/menu");
    }

    setServerError(json.message);
  } catch (err) {
    console.log(err);

    setIsLoading(false);
    setServerError(
      "A ocurrido un error en el servidor, por favor intente de nuevo"
    );
  }
}
export default loginAPI;
