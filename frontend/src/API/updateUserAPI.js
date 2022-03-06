import usersAPI from "./usersAPI";
import { PUT } from "../utils/http";
async function uploadUserAPI({
  setFormIsLoading,
  setIsEditing,
  setServerError,
  info,
  setAllUsers,
  token,
  id,
}) {
  try {
    setFormIsLoading(true);

    const { response, json } = await PUT(`/api/users/role/${id}`, info, token);

    setFormIsLoading(false);
    if (response.status === 200) {
      await usersAPI({ setAllUsers, token });
      setServerError("");
      setIsEditing(false);
    }

    if (response.status === 403)
      return alert("Se require rol de Administrador");

    setServerError(json.message);
  } catch (err) {
    console.log(err);
  }
}

export default uploadUserAPI;
