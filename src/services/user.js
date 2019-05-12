import request, { METHOD, API_PATH } from '@/utils/request';

const { GET, POST } = METHOD;
const { AUTH, USER } = API_PATH;

export const login = async ({ data }) => {
  return request(`${AUTH}/login`, {
    method: POST,
    data
  });
};

export const fetchCurrentUser = async () => {
  return request(`${AUTH}/me`, {
    method: GET
  });
};

export const fetchUserBoard = async ({ query }) => {
  return request(`${USER}/${query}/boards`, {
    method: GET
  });
};

export const fetchAllUsername = async () => {
  return request(`${USER}/usernames`, {
    method: GET
  });
};
