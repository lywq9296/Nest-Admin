import { error, success, successCount } from './login';

export function wrapperResponse(p, msg) {
  return p
    .then((data) => success(data, msg))
    .catch((err) => error(err.message));
}

export function wrapperCountResponse(dataPromise, countPromise, msg) {
  return Promise.all([dataPromise, countPromise])
    .then((res) => {
      console.log(res);
      const [data, [count]] = res;
      return successCount(data, count.count, msg);
    })
    .catch((err) => error(err.message));
}
