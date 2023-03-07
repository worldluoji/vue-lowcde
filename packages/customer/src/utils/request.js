const BASE_URL = `${import.meta.env.VITE_BASE_API_URL}`;

async function get(
  path,
  baseUrl = BASE_URL,
  headers = {},
  cors = 'cors',
  credentials = 'same-origin'
) {
  const res = await fetch(baseUrl + path, {
    method: 'GET',
    headers: {
      ...headers
    },
    mode: cors,
    credentials: credentials
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch(() => {
      ElementPlus.ElMessageBox.alert('网络忙，请稍后再试', '提示', {});
    });
  return res;
}

async function post(
  path,
  params,
  baseUrl = BASE_URL,
  headers = { 'Content-type': 'application/json; charset=UTF-8' },
  cors = 'cors',
  credentials = 'same-origin'
) {
  const res = await fetch(baseUrl + path, {
    method: 'POST',
    body: JSON.stringify({
      ...params
    }),
    headers: {
      ...headers
    },
    mode: cors,
    credentials: credentials
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch(() => {
      ElementPlus.ElMessageBox.alert('网络忙，请稍后再试', '提示', {});
    });
  return res;
}

export default {
  // eslint-disable-next-line no-unused-vars
  install: (app, options) => {
    app.provide('$request', {
      get: get,
      post: post
    });
  },
  get: get,
  post: post
};
