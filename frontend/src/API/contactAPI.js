import { POST } from "../utils/http";

const contactAPI = async ({ info, e }) => {
  try {
    const { response } = await POST("/api/contact", info);

    if (response.status === 200) {
      e.target.reset();
    }
  } catch (err) {
    console.log(err);
  }
};

export default contactAPI;
