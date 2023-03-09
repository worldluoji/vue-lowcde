export function getQueryParam(param, pattern) {
  const hash = window.location.hash;
  if (!hash) {
    return null;
  }
  const re = new RegExp(`${param}=(${pattern})`);
  const res = hash.match(re);
  if (!res) {
    return null;
  }
  return res[1];
}

export function getAppId() {
  return getQueryParam('appId', '\\d+');
}

/*
 * encodeURIComponent 转义除了如下所示外的所有字符：
 * 不转义的字符：
 * A-Z a-z 0-9 - _ . ! ~ * ' ( )
 * 如果有中文参数，window.location.href中的中文参数会被默认转义
 */
export function getAppName() {
  let title = getQueryParam('appName', '[\\w+%-|]+&');
  if (title) {
    title = title.slice(0, title.length - 1);
    return decodeURIComponent(title);
  }
  return null;
}
