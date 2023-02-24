export function getQueryString(name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r = window.location.hash.slice(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
}
