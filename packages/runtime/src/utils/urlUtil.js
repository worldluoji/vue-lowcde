export function getAppIdFromQueryParam() {
  const hash = window.location.hash;
  if (!hash) {
    return null;
  }
  const res = hash.match(/appId=(\d+)/);
  if (!res) {
    return null;
  }
  return res[1];
}
