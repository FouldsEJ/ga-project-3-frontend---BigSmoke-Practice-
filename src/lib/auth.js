export function getLoggedInUserId() {
  const token = sessionStorage.getItem('token');
  if (!token) return false; //safety in case there's no token

  const userObject = JSON.parse(window.atob(token.split('.')[1]));
  return userObject.userId;
}

export function isAdmin() {
  const token = sessionStorage.getItem('token');
  if (!token) return false; //safety in case there's no token

  const userObject = JSON.parse(window.atob(token.split('.')[1]));
  return !!userObject.isAdmin;
}
export function getLoggedInUserName() {
  const token = sessionStorage.getItem('token');
  if (!token) return false; //safety in case there's no token

  const userObject = JSON.parse(window.atob(token.split('.')[1]));
  return userObject.userName;
}
