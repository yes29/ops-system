import axios from 'axios';
import { Message } from 'element-ui';
import { getToken, removeLocal } from '@/utils/index';
import { AppModule } from '@/store/modules/app';

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_MOCK_API,
  // timeout: 5000,
  headers: {
    Authorization: getToken(),
  },
});

// 当返回结果出错时
const error = (rest: any) => {
  const msg = rest.error ? rest.error : rest.message;
  switch (rest.code) {
    case 401:
      removeLocal('cmdb_userinfo');
      location.href = './';
      break;
    case 500:
      Message({ message: msg, type: 'error'});
      break;
    case 4000:
      Message({message: msg, type: 'error'});
      break;
    case 5000:
      Message({message: msg, type: 'error'});
      break;
    default:
      Message({message: rest.message ? rest.message : '系统出错，请稍后重试！', type: 'error'});
      break;
  }
};

// request拦截器
service.interceptors.request.use((config) => {
  AppModule.Loading(true);
  return config;
}, (err) => {
  AppModule.Loading(false);
  return Promise.reject(err);
});

// respone 拦截器
service.interceptors.response.use(
  (res) => {
    AppModule.Loading(false);
    const rest = res.data;
    const headers = res.config.headers;
    if (rest.code === 0  || rest.code === 200) {
      if (headers.result) { // (table)表格时、不提取data
        return rest;
      }
      if (rest.data) {
        return rest.data; // py
      }
      if (rest.payload) {
        return rest.payload; // java
      }
    } else {
      error(rest);
      return Promise.reject(rest);
    }
  }, (err) => {
    AppModule.Loading(false);
    if (err.response) {
      err = err.response.data;
    }
    error(err);
    return Promise.reject(err);
  },
);

export default service;
