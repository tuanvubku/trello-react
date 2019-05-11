import request, { METHOD, API_PATH } from '@/utils/request';

const { GET, POST } = METHOD;
const { COMMENT } = API_PATH;

export const fetchCommentOfCard = async ({ params }) => {
  return request(`${COMMENT}/`, {
    method: GET,
    params
  });
};
export const editCommentRequest = async ({ data }) => {
  return request(`${COMMENT}/edit`, {
    method: POST,
    data: data.body
  });
};

export const addCommentRequest = async ({ data }) => {
  return request(`${COMMENT}/add`, {
    method: POST,
    data: data.body
  });
};
