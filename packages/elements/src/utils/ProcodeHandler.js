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

  return await (async function () {
    // console.log('code', p.props.code)
    return new AsyncFunction('$request', code)($request);
  })();
}
