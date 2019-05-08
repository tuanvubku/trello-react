import request, { METHOD } from '@/utils/request';

const { GET, POST } = METHOD;

export const fetchCommentOfCard = async ({ params }) => {
  return request(`/api/comment/`, {
    method: GET,
    params
  });
};
export const editCommentRequest = async ({ data }) => {
  return request(`/api/comment/edit`, {
    method: POST,
    data: data.body
  });
};

export const addCommentRequest = async ({ data }) => {
  return request(`/api/comment/add`, {
    method: POST,
    data: data.body
  });
};
