import getCategoriesAPI from "./getCategoriesAPI";
import { PUT } from "../utils/http";

async function updateProductAPI({
  token,
  formData,
  id,
  setIsSuccessfullySend,
  setFormIsLoading,
  history,
  setAllCategories,
}) {
  try {
    const { response } = await PUT(
      `/api/products/${id}`,
      formData,
      token,
      "formData"
    );
    setFormIsLoading(false);

    if (response.status === 200) {
      await getCategoriesAPI(setAllCategories);

      setIsSuccessfullySend(true);
      setTimeout(() => {
        setIsSuccessfullySend(false);
        return history.push("/dashboard/myProducts");
      }, 2000);
    }

    if (response.status === 403)
      return alert("Se require rol de Administrador");
  } catch (err) {
    console.log(err);
  }
}

export default updateProductAPI;
