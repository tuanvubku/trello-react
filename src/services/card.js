import request, { METHOD, API_PATH } from '@/utils/request';

const { GET, POST, DELETE } = METHOD;
const { CARD } = API_PATH;

export const fetchCardOfListFromBoard = async ({ params }) => {
  return request(`${CARD}/`, {
    method: GET,
    params
  });
};
export const editCardRequest = async ({ data }) => {
  return request(`${CARD}/edit`, {
    method: POST,
    data: data.body
  });
};
export const deleteLabelCardRequest = async ({ data }) => {
  return request(`${CARD}/remove-label`, {
    method: POST, // Post !!!!
    data: data.body
  });
};
export const addMemberRequest = async ({ data }) => {
  return request(`${CARD}/add-member`, {
    method: POST,
    data: data.body
  });
};

export const removeMemberRequest = async ({ data }) => {
  return request(`${CARD}/remove-member`, {
    method: POST,
    data: data.body
  });
};

export const moveCardRequest = async ({ data }) => {
  return request(`${CARD}/move`, {
    method: POST,
    data: data.body
  });
};

export const deleteCardRequest = async ({ params, data }) => {
  return request(`${CARD}/${params._id}`, {
    method: DELETE,
    data: data.body
  });
};

export const addCardRequest = async ({ data }) => {
  console.log(data);
  return request(`${CARD}/add`, {
    method: POST,
    data
  });
};

export const getCardRequest = async ({ query }) => {
  return request(`${CARD}/${query}`, {
    // query : /:_id
    method: GET
  });
};
