const isBrowser = typeof window !== `undefined`;

const getUser = () =>
  window.localStorage.currentUser
    ? JSON.parse(window.localStorage.currentUser)
    : {};

const getUserRole = () =>
  window.localStorage.userRole ? JSON.parse(window.localStorage.userRole) : [];

export const setUser = ({ user, role }) => {
  window.localStorage.currentUser = JSON.stringify(user);
  window.localStorage.userRole = JSON.stringify(role);
};

export const isLoggedIn = () => {
  if (!isBrowser) return false;

  const user = getUser();

  // console.log(user);

  return !!user;
};

export const getRole = () => {
  if (!isBrowser) return [];

  const role = getUserRole();

  return role;
};

export const getCurrentUser = () => isBrowser && getUser();
