import getCategoriesAPI from "./getCategoriesAPI";
import { POST } from "../utils/http";

async function createCategoryAPI({
  token,
  info,
  setAllCategories,
  setIsCreateFormLoading,
  setIsSuccessfullySend,
  e,
}) {
  setIsCreateFormLoading(true);
  try {
    const { response } = await POST("/api/categories", info, token);

    setIsCreateFormLoading(false);

    if (response.status === 201) {
      await getCategoriesAPI(setAllCategories);
      e.target.newCategory.value = "";
      setIsSuccessfullySend(true);
      setTimeout(() => {
        setIsSuccessfullySend(false);
      }, 3000);
      return;
    }
  } catch (err) {
    console.log(err);
  }
}
export default createCategoryAPI;
