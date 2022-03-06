import { DELETE } from "../utils/http";

export default async function deleteCategoryAPI({ categorySelectId, token }) {
  try {
    const { response } = await DELETE(
      `/api/categories/${categorySelectId}`,
      token
    );
    if (response.status === 403 || response.status === 401) {
      alert("Se require rol de Administrador");
    }
  } catch (err) {
    console.log(err);
  }
}
