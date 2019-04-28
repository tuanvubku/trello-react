import request, { METHOD } from '@/utils/request';

export const fetchBoard = async ({ query, data, params }) => {
  return request(`/api/board/${query}`, {
    method: METHOD.GET,
    data,
    params
  });
};
