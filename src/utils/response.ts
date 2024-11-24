export function wrapperResponse(p, msg) {
  return p
    .then((data) => success(data, msg))
    .catch((err) => error(err.message));
}

export function wrapperCountResponse(dataPromise, countPromise, msg) {
  return Promise.all([dataPromise, countPromise])
    .then((res) => {
      const [data, [count]] = res;
      return successCount(data, count.count, msg);
    })
    .catch((err) => error(err.message));
}

function success(data, msg) {
  return { code: 0, msg, data };
}

function successCount(data, count, msg) {
  return { code: 0, msg, data, count };
}

function error(msg) {
  return { code: -1, msg };
}
