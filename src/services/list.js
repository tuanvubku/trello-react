import request, { METHOD, API_PATH } from '@/utils/request';

const { GET, POST } = METHOD;
const { LIST } = API_PATH;

export const fetchListInfo = async ({ query }) => {
  return request(`${LIST}/${query}`, {
    method: GET
  });
};

export const fetchListOfBoard = async ({ params }) => {
  return request(`${LIST}/`, {
    method: GET,
    params
  });
};

export const addListOfBoard = async ({ data }) => {
  return request(`${LIST}/add`, {
    method: POST,
    data
  });
};
