import request, { METHOD } from '@/utils/request';

const { GET } = METHOD;

export const fetchBoard = async ({ query }) => {
  return request(`/api/board/${query}`, {
    method: GET
  });
};
