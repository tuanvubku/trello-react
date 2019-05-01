import request, { METHOD } from '@/utils/request';

const { GET } = METHOD;

export const fetchListInfo = async ({ query }) => {
  return request(`/api/list/${query}`, {
    method: GET
  });
};

export const fetchListOfBoard = async ({ params }) => {
  return request(`/api/list/`, {
    method: GET,
    params
  });
};
