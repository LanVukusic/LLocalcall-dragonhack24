// import { getToken } from "@/common/localStorage";
import { notifications } from '@mantine/notifications';
import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
// import { redirect } from "react-router-dom";
import qs from 'qs';
import { $currUser } from '../../global-state/user';

// https://orval.dev/guides/custom-axios
const baseURL: string = import.meta.env.VITE_BACKEND_API;

export const AXIOS_INSTANCE = Axios.create({
  baseURL,
  paramsSerializer: {
    // Important to use qs instead of the default URLSearchParams
    serialize: (params) => {
      return qs.stringify(params, { arrayFormat: 'comma' });
    },
  },
});

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = Axios.CancelToken.source();

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then((response) => {
    if (response) {
      return response.data;
    }

    return null;
  });
  // @ts-expect-error cant usually extend promise signiture
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

AXIOS_INSTANCE.interceptors.request.use(
  (config) => {
    // const token = getToken();
    const user = $currUser.get();
    if (user && user.token) {
      config.headers.Authorization = user.token ? `Bearer ${user.token}` : '';
    }

    return config;
  },
  (error) => Promise.reject(error),
);

interface BeErrorType {
  message: string;
}
// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<T> = AxiosError<BeErrorType, T>; // this might not work. !! TODO: fix this type

AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  (error: ErrorType<any>) => {
    // 401 - unauthenticated
    // when session is expired
    if (error.response?.status == 401) {
      notifications.show({
        message: 'Seja je potekla.',
        color: 'red',
        // id: "sessionExpired",
      });
      $currUser.set(null);
      // return window.location.replace("/");
    } else {
      // other errors
    }

    throw error;
  },
);

// In case you want to wrap the body type (optional)
// (if the custom instance is processing data before sending it, like changing the case for example)
export type BodyType<BodyData> = BodyData;
