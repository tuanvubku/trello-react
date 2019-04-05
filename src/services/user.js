import request from '@/utils/request';

export const login = async params => {
  return request('/api/login', {
    method: 'POST',
    data: params
  });
};

export const fetchCurrent = async params => {
  return request('/api/me', {
    method: 'GET',
    data: {}
  });
};
