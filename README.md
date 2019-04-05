# Trello Clone

This is a product as the outcome of the course about (pratical) Software Engineering.

## Requirements

Node ofcourse. And were using `yarn`.

- gatsby
- eslint
- prettier
- concurrently
- cross-env (maybe)

```bash
yarn global add eslint gatsby prettier concurrently cross-env
```

## Setup

```bash
yarn install
```

## Run

By default, a mock server API is run on port 3001. To turn off mock, run `start:nomock`, this expect that a real API server is run, as the app will connect to the API through that server.

For others, look in the package.json please.

## Project structure

This project tries (tried) to immitate ant-design-pro, but using another stack.

In replace for umi, gatsby and @reach/router is used. In replace for dva, rematch and rematch-saga is used. In replace for antd, material-ui is used.

- src/ contains all the source file
- src/pages contains the pages
- src/layouts contains the layouts used
- src/components contains the components
- src/stage contains the init of redux
- src/models contains the redux store models/reducers/effects
- src/services should contains API calling functions
- src/utils/auth.js contains basic authentication storing and extracting
- src/utils/request.js is the main API calling function

In src/services/, all function export has the form:

```js
function(params) {
  return request('API/endpoint', {
    method: 'GET',
    data: params
  })
}
```

`request` will call the API with the endpoint, using METHOD with the given data.

## On commit

eslint will run a lint and format before every commit, make sure you fix those errors.
