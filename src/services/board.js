import request, { METHOD, API_PATH } from '@/utils/request';

const { GET } = METHOD;
const { BOARD } = API_PATH;

export const fetchBoard = async ({ query }) => {
  return request(`${BOARD}/${query}`, {
    method: GET
  });
};
