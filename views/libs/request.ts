import axios, { 
  AxiosRequestConfig,
  AxiosError,
  Method,
  AxiosResponse,
} from 'axios';

interface BaseOptions<P> {
  url: string;
  params?: P;
  token?: string;
}

export interface PaginatedParams {
  limit?: number;
  page?: number;
}

export interface RequestOptions<P> extends BaseOptions<P> {
  method: Method;
  isBlob?: boolean;
  isForm?: boolean;
}

export interface BaseResponse {
  status: 'OK' | 'FAIL';
}

export interface ErrorResponse extends BaseResponse {
  message?: string;
  code?: AxiosResponse['status'];
}

interface GetOptionsFn<P> {
  (options: RequestOptions<P>): AxiosRequestConfig;
}

interface RequestJSONFn {
  <T, P = undefined>(options: RequestOptions<P>): Promise<T | ErrorResponse>;
}

export interface JSONFn {
  <T, P = undefined>(options: BaseOptions<P>): Promise<T | ErrorResponse>;
}

const getOptions: GetOptionsFn<any> = ({ method, url, params, token, isForm, isBlob }) => {
  let _params = null;
  let data = null;
  if (method === 'POST') {
    data = params;
  } else if (method === 'GET') {
    _params = params;
  }
  const opts: AxiosRequestConfig = {
    url,
    method,
    data,
    params: _params,
  };
  if (isForm) {
    opts.headers['Content-Type'] = 'multipart/form-data';
  }
  if (token) {
    opts.headers['Authorization'] = `Bearer ${token}`;
  }
  if (isBlob) {
    opts.responseType = 'blob';
  }
  return opts;
};

export const RequestJSON: RequestJSONFn = async (options) => {
  const opts = getOptions(options);
  try {
    const response = await axios.request(opts);
    if (response.status === 201 || response.status === 200) {
      return response.data;
    }
  } catch (err) {
    const response: AxiosError['response'] = err.response;
    if (response && response.status) {
      if (response.status !== 500) {
        const params = {
          url: options.url,
          method: options.method,
          params: options.params,
          status: response.status,
          response,
        };
        const opts = getOptions({
          method: 'POST',
          url: '/analytics/add_bad_request',
          params,
        });
        await axios.request(opts);
      }
      if (response.status === 403) {
        return {
          status: 'FAIL',
          message: 'It seems that you are either logged out or do not have permission for this action. Please refresh the page and try again.',
        };
      }
      return {
        status: 'FAIL',
        message: 'Sorry, something is not right here. It can be a connection issue or an error has occurred. Contact support@epharmix.com if you require assistance.',
        code: response.status,
      };
    } else {
      console.error(err);
      return {
        status: 'FAIL',
        message: 'Sorry, something is not right here. It can be a connection issue or an error has occurred. Contact support@epharmix.com if you require assistance.',
      };
    }
  }
};

export const GetJSON: JSONFn = ({ url, params, token }) => {
  return RequestJSON({
    method: 'GET',
    url,
    params,
    token,
  });
};

export const PostJSON: JSONFn = ({ url, params, token }) => {
  return RequestJSON({
    method: 'POST',
    url,
    params,
    token,
  });
};
