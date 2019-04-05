import { getCurrentUser, getRole } from '@/utils/auth';

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
const request = async (url, { method, data }) => {
  // fake api request
  // in reality, this one will get jwt from localStorage
  // sends with the request in header
  if (url === '/api/me') {
    return {
      status: 'ok',
      user: getCurrentUser(),
      role: getRole()
    };
  } else if (url === '/api/login') {
    return {
      status: 'ok',
      user: {
        name: 'Nguyen Van Teo',
        age: 21
      },
      role: ['admin']
    };
  } else {
    return {
      status: 'error'
    };
  }
};

export default request;
