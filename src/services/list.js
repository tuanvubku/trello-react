import request, { METHOD, API_PATH } from '@/utils/request';

const { GET, POST } = METHOD;
const { BOARD, LIST } = API_PATH;

export const fetchListInfo = async ({ query }) => {
  return request(`${LIST}/${query}`, {
    method: GET
  });
};

export const fetchListOfBoard = async ({ query }) => {
  return request(`${BOARD}/${query}/lists`, {
    method: GET
  });
};

export const addListOfBoard = async ({ data }) => {
  return request(`${LIST}/add`, {
    method: POST,
    data
  });
};

export const editListOfBoard = async ({ data }) => {
  console.log("edit service")
  return request(`${LIST}/edit`, {
    method: POST,
    data
  });
};
