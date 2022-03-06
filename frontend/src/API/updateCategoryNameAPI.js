import { PUT } from "../utils/http";

export default async function updateCategoryNameAPI({
  categorySelectId,
  info,
  onSuccess,
  token,
}) {
  try {
    const { json } = await PUT(
      `/api/categories/${categorySelectId}`,
      info,
      token
    );

    if (json.category) {
      return onSuccess(json);
    }
  } catch (err) {
    console.log(err);
  }
}
