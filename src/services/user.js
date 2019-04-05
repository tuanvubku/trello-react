import request from '@/utils/request';

export const login = async params => {
  return request('/api/login', {
    method: 'post',
    data: params
  });
};

export const fetchCurrent = async params => {
  return request('/api/me', {
    method: 'get',
    data: {}
  });
};
