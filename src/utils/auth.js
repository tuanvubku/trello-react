const isBrowser = typeof window !== `undefined`;

const getUser = () =>
  window.localStorage.currentUser
    ? JSON.parse(window.localStorage.currentUser)
    : {};

const getUserRole = () =>
  window.localStorage.userRole ? JSON.parse(window.localStorage.userRole) : [];

const getJWT = () =>
  window.localStorage.JWTtoken ? window.localStorage.JWTtoken : '';

export const setUser = ({ user = {}, role = ['guest'], token = '' }) => {
  window.localStorage.currentUser = JSON.stringify(user);
  window.localStorage.userRole = JSON.stringify(role);
  window.localStorage.JWTtoken = token;
};

export const isLoggedIn = () => {
  if (!isBrowser) return false;
  const user = getUser();
  return !!user;
};

export const getRole = () => {
  if (!isBrowser) return ['user'];
  const role = getUserRole();
  return role;
};

export const getCurrentUser = () => isBrowser && getUser();

export const getUserJWT = () => isBrowser && getJWT();
