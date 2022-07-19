const tokenObject = {
  token: "token",
  name: "name",
  stores: "stores",
  shopCode: "shopCode",
  userId: "userId",
  userInfo: "userInfo",
  userName: "userName",
};

export function getSession(key) {
  return sessionStorage.getItem(tokenObject[key]);
}

export function setSession(key, token) {
  return sessionStorage.setItem(tokenObject[key], token);
}

export function removeSession(key) {
  return sessionStorage.removeItem(tokenObject[key]);
}
