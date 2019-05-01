import request, { METHOD } from '@/utils/request';

const { GET } = METHOD;

export const fetchCardOfListFromBoard = async ({ params }) => {
  return request(`/api/card/`, {
    method: GET,
    params
  });
};
