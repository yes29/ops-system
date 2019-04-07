import request from '@/utils/request';
const proxy = '/service/service/';

// 获取服务详情
export const  getServiceDetail = (api: string, id: number) => {
  return request({
    url: '/service/' + api + 'service/detail/',
    method: 'get',
    params: {
      id,
    },
  });
};

// 业务服务，获取项目组下的服务
export const  getBusinessService = (params: any) => {
  return request({
    url: proxy + 'list/project_team/services/',
    method: 'get',
    params,
  });
};

// 获取服务实例
export const getJavaInstance = (params: any) => {
  return request({
    url: proxy + 'list/java/instance/',
    method: 'get',
    params,
  });
};

// 获取项目下实例
export const getProjectService = (params: any) => {
  return request({
    url: proxy + 'list/project_team/services/',
    method: 'get',
    params,
  });
};

// 业务服务--新增业务--资源地址
export const getServiceUrl = (data: any) => {
  return request({
    url: proxy + 'list/service/uri/',
    method: 'post',
    data,
  });
};

// 业务服务--业务详情--服务列表
export const getBusService = (data: any) => {
  return request({
    url: proxy + '/service_detail/by/id/',
    method: 'post',
    data,
  });
};

// // 业务服务--服务列表-->监控
// export const getSystemSUrl = (data: any) => {
//   return request({
//     url: proxy + '/list/service/uri/',
//     method: 'post',
//     data,
//   });
// };

// 业务服务--服务列表-->共享服务
export const serviceShareToProject = (data: any) => {
  return request({
    url : proxy + '/service/share/to/project/',
    method: 'post',
    data,
  });
};
