import request, { METHOD } from '@/utils/request';

const { GET,POST } = METHOD;

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

export const addListRequest = async ({data}) => {
  console.log("List service: ", data);
  return request(`/api/list/add`,{
    method: POST,
    data
  });
}