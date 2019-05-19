import request, { METHOD, API_PATH } from '@/utils/request';

const { GET, POST, DELETE } = METHOD;
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
  console.log('edit service');
  return request(`${LIST}/edit`, {
    method: POST,
    data
  });
};

export const deleteListOfBoard = async ({ params }) => {
  console.log('delete list service');
  return request(`${LIST}/${params._id}`, {
    method: DELETE
  });
};
