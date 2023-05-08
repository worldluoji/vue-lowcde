import { request } from '@lowcode/helper';

const $request = {
  get: request.get,
  post: request.post,
  patch: request.patch,
  delete: request.delete
};

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

export async function implementCodeAsync(code) {
  if (!code) {
    throw new Error('代码不能为空');
  }

  return await new AsyncFunction('$request', code)($request);
}

export function implementCodeSync(code) {
  if (!code) {
    throw new Error('代码不能为空');
  }
  return new Function(code)();
}
