import request, { METHOD } from '@/utils/request';

export const login = async ({ data, params }) => {
  return request('/api/auth/login', {
    method: METHOD.POST,
    data,
    params
  });
};

export const fetchCurrentUser = async ({ data, params }) => {
  return request('/api/auth/me', {
    method: METHOD.GET,
    data,
    params
  });
};
