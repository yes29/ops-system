import request from '@/utils/request';
const proxy = '/cmdb/';

// 首页-->汇总
export const rscDetail = () => {
  return request({
    url: proxy + 'rsc/detail/',
    method: 'get',
  });
};

// 首页--> 拓扑图
export const rscIndex = () => {
  return request({
    url: proxy + 'rsc/index/',
    method: 'get',
  });
};
// 物理资源--> 服务器 --> 新增、编辑 --> 所属区域
export const rscListRegion = () => {
  return request({
    url: proxy + 'rsc/list/region/',
    method: 'get',
  });
};

// 物理资源--> 网络设备 --> 新增、编辑下拉
export const rscListDeviceType = () => {
  return request({
    url: proxy + 'rsc/list/device_type/',
    method: 'get',
  });
};

// 物理资源--> 网络设备 --> 编辑端口
export const rscAllListDevice = () => {
  return request({
    url: proxy + 'rsc/all/list/device/',
    method: 'get',
  });
};
// 物理资源--> 网络设备 --> 编辑端口
export const rscAssignPort = (data: any) => {
  return request({
    url: proxy + 'rsc/assign/port/',
    method: 'post',
    data,
  });
};

// 物理资源--> 获取下拉列表
export const getSelectList = (name: string) => {
  return request({
    url: proxy + 'rsc/list/all/',
    method: 'get',
    params: {name},
  });
};

// 物理资源--> 服务器 --> 详情
export const rscListServices = (params: any) => {
  return request({
    url: proxy + 'rsc/list/services/',
    method: 'get',
    params,
  });
};

// 服务资源--> 全部详情 --> 编辑实例
export const rscListServerBrief = () => {
  return request({
    url: proxy + 'rsc/list/server/brief/',
    method: 'get',
  });
};

// 物理资源--> 维修记录 --> 新增编辑
export const rscHardware = () => {
  return request({
    url: proxy + '/rsc/hardware/',
    method: 'get',
  });
};
