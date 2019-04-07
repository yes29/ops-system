import request from '@/utils/request';
const proxy = '/uums/';

// 首页 --> 扫码登录
export const saoMaLogin = (code: string) => {
  return request({
    url: proxy + 'auth/login/d/',
    method: 'get',
    params: {
      code,
    },
    headers: {
      result: true,
    },
  });
};

// 首页 --> 账号密码登录
export const autoLogin = (data: object) => {
  return request({
    url: proxy + 'auth/login/',
    method: 'post',
    data,
  });
};

// 首页 --> 账号密码登录确认
export const confirmLogin = (data: object) => {
  return request({
    url: proxy + 'auth/login/confirm/',
    method: 'post',
    data,
    headers: {
      result: true,
    },
  });
};

// 账号设置 --> 权限管理
export const getMenuList = () => {
  return request({
    url: proxy + 'auth/list/menu/',
    method: 'get',
  });
};

// 账号设置 --> 权限管理
export const getUserList = () => {
  const params = {
    page: 1,
    size: 1000,
  };
  return request({
    url: proxy + 'user/list/user/',
    method: 'get',
    params,
  });
};

// 首页 --> 权限管理 --> 关联用户
export const updatePermission = (data: object) => {
  return request({
    url: proxy + 'user/update/permission_group/',
    method: 'post',
    data,
  });
};

// 首页 --> 服务资源 --> 关联项目组
export const  getProjectTeamList = () => {
  return request({
    url: proxy + 'user/list/project_team/',
    method: 'get',
    params: {
      page: 1,
      size: 1000,
    },
  });
};
