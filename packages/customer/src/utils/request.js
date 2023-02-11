import { ElMessageBox } from 'element-plus';
import 'element-plus/es/components/message-box/style/css';

const BASE_URL = `${import.meta.env.VITE_BASE_API_URL}`;

async function get(url, baseUrl = BASE_URL) {
  const res = await fetch(baseUrl + url, {
    method: 'GET'
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch(() => {
      ElMessageBox.alert('网络忙，请稍后再试', '提示', {});
    });
  return res;
}

async function post(url, params, baseUrl = BASE_URL) {
  const res = await fetch(baseUrl + url, {
    method: 'POST',
    body: JSON.stringify({
      ...params
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch(() => {
      ElMessageBox.alert('网络忙，请稍后再试', '提示', {});
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
  $request: {
    get: get,
    post: post
  }
};
