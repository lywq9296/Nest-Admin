export function success(data, msg) {
  return { code: 0, msg, data };
}

export function error(msg) {
  return { code: -1, msg };
}
