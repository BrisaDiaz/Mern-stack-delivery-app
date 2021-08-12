import { DELETE } from "../utils/http";
import getCategoriesAPI from "./getCategoriesAPI";

export default async function deleteCategoryAPI({
  categorySelectId,
  token,
  setAllCategories,
}) {
  try {
    const { response } = await DELETE(
      `/api/categories/${categorySelectId}`,
      token
    );

    if (response.status === 204) {
      await getCategoriesAPI(setAllCategories);
      return;
    }
    if (response.status === 403)
      return alert("Se require rol de Administrador");
  } catch (err) {
    console.log(err);
  }
}
