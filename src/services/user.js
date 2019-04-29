import request, { METHOD } from '@/utils/request';

const { GET, POST } = METHOD;

export const login = async ({ data }) => {
  return request('/api/auth/login', {
    method: POST,
    data
  });
};

export const fetchCurrentUser = async () => {
  return request('/api/auth/me', {
    method: GET
  });
};

export const fetchUserBoard = async () => {
  return request('/api/user/myboard', {
    method: GET
  });
};
