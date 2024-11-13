import { error, success } from './login';

export function wrapperResponse(p, msg) {
  return p
    .then((data) => success(data, msg))
    .catch((err) => error(err.message));
}
