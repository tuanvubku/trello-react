import request, { METHOD } from '@/utils/request';

const { GET } = METHOD;

export const fetchLogOfCard = async ({ params }) => {
  return request(`/api/logCard/`, {
    method: GET,
    params
  });
};
