function getCookieValueByName(cookies, name) {
  if (!name in cookies) return null;

  return cookies[name];
}
module.exports = { getCookieValueByName };
