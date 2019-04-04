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
  if (url === '/api/login') {
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
