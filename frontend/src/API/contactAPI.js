const contactAPI = async ({ info, e }) => {
  const headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");

  const setting = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(info),
  };

  try {
    const res = await fetch("/api/contact", setting);
    const { message } = await res.json();

    if (res.status === 200) {
      e.target.reset();
    }
    console.log(message);
    return message;
  } catch (err) {
    console.log("There was a problem submitting contact form");
    console.log(err);
  }
};

export default contactAPI;
