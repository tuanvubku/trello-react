import request, { METHOD, API_PATH } from '@/utils/request';

const { GET } = METHOD;
const { LOGCARD } = API_PATH;

export const fetchLogOfCard = async ({ params }) => {
  return request(`${LOGCARD}/`, {
    method: GET,
    params
  });
};
