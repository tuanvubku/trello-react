import axios from 'axios';
import { navigate } from 'gatsby';

import { getUserJWT } from '@/utils/auth';

const METHOD = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PATCH: 'patch'
};

const API_PATH = {
  USER: '/api/users',
  AUTH: '/api/auth',
  BOARD: '/api/boards',
  CARD: '/api/cards',
  LIST: '/api/lists',
  LOGCARD: '/api/logCards',
  COMMENT: '/api/comments'
};

const codeMessage = {
  200: 'Success',
  201: '',
  202: '',
  204: '',
  400: '',
  401: '',
  403: 'Forbidden',
  404: 'Not found',
  406: '',
  410: '',
  422: '',
  500: 'Internal server error',
  502: '',
  503: '',
  504: ''
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

/*
 * request(
 *  URL, // URL
 *  {
 *    METHOD, // GET/POST/PUT/DELETE
 *    DATA: {
 *      // data to post
 *    }
 *  }
 * )
 */
const request = (endpoint, { method, data = {}, params = {} }) => {
  // fake api request
  // in reality, this one will get jwt from localStorage
  // sends with the request in header
  const API_URL = process.env.API_URL;
  const API_PORT = process.env.PORT;

  const JWT = getUserJWT();

  console.log(
    `${API_URL}:${API_PORT}${endpoint}?${JSON.stringify(
      params
    )} ${method} ${JSON.stringify(data)}`
  );

  return axios({
    url: endpoint,
    baseURL: `http://${API_URL}:${API_PORT}`,
    method,
    data,
    params,
    headers: {
      authorization: `Bearer ${JWT}`
    }
  })
    .then(checkStatus)
    .then(({ data, status }) => {
      if (method === METHOD.DELETE || status === 204) {
        return data;
      }
      return data;
    })
    .catch(e => {
      const status = e.name;
      if (status === 401) {
        // dispatch logout
        // window.g_app._store.dispatch({
        //   type: 'login/logout'
        // });
        return;
      }
      // environment should not be used
      if (status === 403) {
        navigate('/exception/403');
        return;
      }
      if (status <= 504 && status >= 500) {
        navigate('/exception/500');
        return;
      }
      if (status >= 404 && status < 422) {
        navigate('/exception/404');
      }
    });
};

export default request;
export { METHOD };
export { API_PATH };
