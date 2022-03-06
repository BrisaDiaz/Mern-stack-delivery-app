import { POST } from "../utils/http";
async function postProductAPI({
  token,
  e,
  formData,
  setIsSuccessfullySend,
  setFormIsLoading,
}) {
  try {
    const { response } = await POST(
      "/api/products",
      formData,
      token,
      "formData"
    );
    setFormIsLoading(false);

    if (response.status === 201) {
      setIsSuccessfullySend(true);
      e.target.reset();

      setTimeout(() => {
        setIsSuccessfullySend(false);
      }, 2000);
      return;
    }
  } catch (err) {
    setFormIsLoading(false);
    console.log(err);
  }
}

export default postProductAPI;
