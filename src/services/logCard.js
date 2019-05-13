import request, { METHOD, API_PATH } from '@/utils/request';

const { GET } = METHOD;
const { CARD } = API_PATH;

export const fetchLogOfCard = async ({ query }) => {
  return request(`${CARD}/${query}`, {
    method: GET
  });
};
