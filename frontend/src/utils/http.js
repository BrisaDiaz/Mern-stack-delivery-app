async function POST(url, info, token, type) {
  const headers = new Headers();
  headers.append("Accept", "application/json");

  type === "formData"
    ? headers.append("Content-Type", "multipart/form-data")
    : headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const body = type === "formData" ? info : JSON.stringify(info);

  const setting = {
    method: "POST",
    headers: headers,
    body,
  };

  const response = await fetch(url, setting);
  const json = await response.json();
  return { response, json };
}
async function PUT(url, info, token, type) {
  const headers = new Headers();

  headers.append("Authorization", `Bearer ${token}`);
  type === "formData"
    ? headers.append("Content-Type", "multipart/form-data")
    : headers.append("Content-Type", "application/json");

  const body = type === "formData" ? info : JSON.stringify(info);
  const setting = {
    method: "PUT",
    headers: headers,
    body,
  };
  const response = await fetch(url, setting);
  const json = await response.json();
  return { response, json };
}

async function DELETE(url, token) {
  const headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const setting = {
    method: "DELETE",
    headers: headers,
  };
  const response = await fetch(url, setting);
  const json = await response.json();
  return { response, json };
}

async function GET(url, token) {
  const headers = new Headers();
  headers.append("Accept", "application/json");
  token && headers.append("Authorization", `Bearer ${token}`);
  const setting = {
    method: "GET",
    headers: headers,
  };
  const response = await fetch(url, setting);
  const json = await response.json();
  return { response, json };
}

export { POST, PUT, DELETE, GET };
