export function success(data, msg) {
  return { code: 0, msg, data };
}

export function successCount(data, count, msg) {
  return { code: 0, msg, data, count };
}

export function error(msg) {
  return { code: -1, msg };
}
