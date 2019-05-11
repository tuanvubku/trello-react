import request, { METHOD } from '@/utils/request';

const { GET, POST, DELETE } = METHOD;

export const fetchCardOfListFromBoard = async ({ params }) => {
  return request(`/api/card/`, {
    method: GET,
    params
  });
};
export const editCardRequest = async ({ data }) => {
  return request(`/api/card/edit`, {
    method: POST,
    data: data.body
  });
};
export const deleteLabelCardRequest = async ({ data }) => {
  return request(`/api/card/remove-label`, {
    method: POST, // Post !!!!
    data: data.body
  });
};
export const addMemberRequest = async ({ data }) => {
  return request(`/api/card/add-member`, {
    method: POST,
    data: data.body
  });
};

export const removeMemberRequest = async ({ data }) => {
  return request(`/api/card/remove-member`, {
    method: POST,
    data: data.body
  });
};

export const moveCardRequest = async ({ data }) => {
  return request(`/api/card/move`, {
    method: POST,
    data: data.body
  });
};

export const deleteCardRequest = async ({ params, data }) => {
  return request(`/api/card/${params._id}`, {
    method: DELETE,
    data: data.body
  });
};

export const addCardRequest = async ({data}) => {
  console.log(data);
  return request(`/api/card/add`, {
    method: POST,
    data
  });
}