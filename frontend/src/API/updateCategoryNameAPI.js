import getCategoriesAPI from "./getCategoriesAPI";
import { PUT } from "../utils/http";

export default async function updateCategoryNameAPI({
  categorySelectId,
  info,
  setIsRenameFormLoading,
  setIsSuccessfullySend,
  token,
  setAllCategories,
}) {
  setIsRenameFormLoading(true);

  try {
    const { response } = await PUT(
      `/api/categories/${categorySelectId}`,
      info,
      token
    );

    setIsRenameFormLoading(false);

    if (response.status === 200) {
      await getCategoriesAPI(setAllCategories);

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
