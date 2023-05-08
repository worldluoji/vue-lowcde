const BASE_URL = `${import.meta.env.VITE_BASE_API_URL}`;

const defaultConfigBase = {
  baseUrl: BASE_URL,
  headers: {},
  cors: 'cors',
  credentials: 'same-origin'
};

const defaultConfigGet = defaultConfigBase;

const defaultConfigPost = {
  ...defaultConfigBase,
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  }
};

const defaultMessage = '网络忙，请稍后再试';

async function get(path, configs, errorMsg = defaultMessage) {
  const cfg = Object.assign(defaultConfigGet, configs);
  const res = await fetch(cfg.baseUrl + path, {
    method: 'GET',
    headers: {
      ...cfg.headers
    },
    mode: cfg.cors,
    credentials: cfg.credentials
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch(() => {
      ElementPlus.ElMessageBox.alert(errorMsg, '提示', {});
    });
  return res;
}

async function __send__(
  path,
  method,
  params,
  configs,
  errorMsg = defaultMessage
) {
  const cfg = Object.assign(defaultConfigPost, configs);
  const res = await fetch(cfg.baseUrl + path, {
    method: method,
    body: JSON.stringify({
      ...params
    }),
    headers: {
      ...cfg.headers
    },
    mode: cfg.cors,
    credentials: cfg.credentials
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch(() => {
      ElementPlus.ElMessageBox.alert(errorMsg, '提示', {});
    });
  return res;
}

async function post(path, params, configs, errorMsg = defaultMessage) {
  return await __send__(path, 'POST', params, configs, errorMsg);
}

async function patch(path, params, configs, errorMsg = defaultMessage) {
  return await __send__(path, 'PATCH', params, configs, errorMsg);
}

async function deleteP(path, params, configs, errorMsg = defaultMessage) {
  return await __send__(path, 'DELETE', params, configs, errorMsg);
}

export default {
  // eslint-disable-next-line no-unused-vars
  install: (app, options) => {
    app.provide('$request', {
      get,
      post,
      patch,
      delete: deleteP
    });
  },
  get,
  post,
  patch,
  delete: deleteP
};
