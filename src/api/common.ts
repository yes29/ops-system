import request from '@/utils/request';
export const  get = (url: string, params: any) => {
  url = '/' + url;
  return request({
    url,
    method: 'get',
    params,
    headers: {
      result: true,
    },
  });
};
export const  post = (url: string, data: any) => {
  url = '/' + url;
  return request({
    url,
    method: 'post',
    data,
  });
};
export const  getTransferList = (url: string, params: object) => {
  return request({
    url,
    method: 'get',
    params,
  });
};
