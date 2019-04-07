import request from '@/utils/request';
const nginxProxy = '/monitor/nginx_monitor/';
const hostProxy = '/monitor/host_monitor/';
const businessProxy = '/monitor/business_monitor/';
export const getGraph = (url: string, query: any) => {
  return request({
    url: nginxProxy + url,
    method: 'get',
    params: query,
  });
};

export const getDUGraph = (query: any) => {
  return request({
    url: nginxProxy + 'domain/url/graph/',
    method: 'get',
    params: query,
  });
};

export const getDomainQpsTop10 = (query: any) => {
  return request({
    url: nginxProxy +　'domain/tp10/qps/',
    method: 'get',
    params: query,
  });
};

export const getDomainDelayTop10 = (query: any) => {
  return request({
    url: nginxProxy +　'domain/tp10/delay/',
    method: 'get',
    params: query,
  });
};

export const getUrlQpsTop10 = (query: any) => {
  return request({
    url: nginxProxy + 'url/tp10/qps/',
    method: 'get',
    params: query,
  });
};

export const getUrlDelayTop10 = (query: any) => {
  return request({
    url: nginxProxy + 'url/tp10/delay/',
    method: 'get',
    params: query,
  });
};

export const getListDomain = (query: any) => {
  return request({
    url: nginxProxy + 'list/domain/',
    method: 'get',
    params: query,
  });
};

// 精确搜索
export const getSearchResult = (data: any) => {
  return request({
    url: nginxProxy + 'search/result/',
    method: 'post',
    data,
  });
};

// 模糊搜索
export const getSearchFuzzy = (data: any) => {
  return request({
    url: nginxProxy + 'search/fuzzy/',
    method: 'post',
    data,
  });
};

export const getDomainDetail = (query: any) => {
  return request({
    url: nginxProxy + 'important/domain/',
    method: 'get',
    params: query,
  });
};

// 资源管理-->服务器-->vm监控
export const getSystemOverview = (params: any) => {
  return request({
    url: hostProxy + 'system/overview/',
    method: 'get',
    params,
  });
};

// 资源管理-->服务器-->vm监控
export const getCpuTime = (params: any) => {
  return request({
    url: hostProxy + 'cpu/time/',
    method: 'get',
    params,
  });
};

// 资源管理-->服务器-->vm监控
export const getMemory = (params: any) => {
  return request({
    url: hostProxy + 'memory/',
    method: 'get',
    params,
  });
};

// 资源管理-->服务器-->vm监控
export const getCpuInterrupt = (params: any) => {
  return request({
    url: hostProxy + 'cpu/interrupts/context/switches/',
    method: 'get',
    params,
  });
};

// 资源管理-->服务器-->vm监控
export const getCpuLoad = (params: any) => {
  return request({
    url: hostProxy + 'cpu/load/',
    method: 'get',
    params,
  });
};

// 资源管理-->服务器-->vm监控
export const getDiskSpace = (params: any) => {
  return request({
    url: hostProxy + 'disk/space/',
    method: 'get',
    params,
  });
};
// 资源管理-->服务器-->vm监控
export const getNetworkTraffic = (params: any) => {
  return request({
    url: hostProxy + 'network/traffic/',
    method: 'get',
    params,
  });
};
// 资源管理-->服务器-->vm监控
export const getNetworkTrafficAll = (params: any) => {
  return request({
    url: hostProxy + 'network/traffic/all/',
    method: 'get',
    params,
  });
};
// 资源管理-->服务器-->vm监控
export const getTcpConnection = (params: any) => {
  return request({
    url: hostProxy + 'tcp/connection/',
    method: 'get',
    params,
  });
};
// 资源管理-->服务器-->vm监控
export const getTcpConnectionStatus = (params: any) => {
  return request({
    url: hostProxy + 'tcp/connection/status/',
    method: 'get',
    params,
  });
};
// 资源管理-->服务器-->vm监控
export const getDiskIO = (params: any) => {
  return request({
    url: hostProxy + '/disk/read/write/bytes/',
    method: 'get',
    params,
  });
};

// 业务服务-->服务列表-->访问量
export const getTpsTrend = (params: any) => {
  return request({
    url: businessProxy + 'tps/1_5min/and/trend/',
    method: 'get',
    params,
  });
};

// 业务服务-->服务列表-->访问量
export const getPvTps = (params: any) => {
  return request({
    url: businessProxy + 'pv_tps/line/',
    method: 'get',
    params,
  });
};


// 业务服务-->服务列表-->响应时间
export const getTp9x = (params: any) => {
  return request({
    url: businessProxy + 'tp9x/line/chart/',
    method: 'get',
    params,
  });
};

// 业务服务-->服务列表-->响应时间
export const getTp9xTrend = (params: any) => {
  return request({
    url: businessProxy + 'tp9x/and/trend/',
    method: 'get',
    params,
  });
};

// 业务服务-->服务列表-->成功率
export const getResponseRate = (params: any) => {
  return request({
    url: businessProxy + 'http_status/success_rate/',
    method: 'get',
    params,
  });
};

// 业务服务-->服务列表-->响应状态码
export const getStatusCode = (params: any) => {
  return request({
    url: businessProxy + 'statuscode/pie/',
    method: 'get',
    params,
  });
};
// 业务服务-->服务列表-->响应状态码
export const getStatusError = (params: any) => {
  return request({
    url: businessProxy + 'status/error/',
    method: 'get',
    params,
  });
};


// 业务服务-->服务列表-->URL监控
// export const getFocusMatrix = (params: any) => {
//   return request({
//     url: businessProxy + 'focus/matrix/',
//     method: 'get',
//     params,
//   });
// };

// 业务服务-->服务列表-->URL监控
export const getTpvTpsUrl = (params: any) => {
  return request({
    url: businessProxy + 'pv_tps/line/',
    method: 'get',
    params,
  });
};

// 业务服务-->业务列表-->监控-->获取重点URL
export const getEmphaUrl = (params: any) => {
  return request({
    url: businessProxy + 'business/service_uris/',
    method: 'get',
    params,
  });
};

// 业务服务-->业务列表-->监控-->访问量（汇总）
export const getBusinessPvTpsMix = (params: any) => {
  return request({
    url: businessProxy + 'business/pv_tps/line/mix/uri/',
    method: 'get',
    params,
  });
};

// 业务服务-->业务列表-->监控-->响应时间（汇总）
export const getBusinessTp9xMix = (params: any) => {
  return request({
    url: businessProxy + 'business/tp9x/line/mix/uri/',
    method: 'get',
    params,
  });
};

// 业务服务-->业务列表-->监控-->成功率（汇总）
export const getBusinesSuccessRateMix = (params: any) => {
  return request({
    url: businessProxy + 'business/http_status/mix/success_rate/',
    method: 'get',
    params,
  });
};
// 业务服务-->业务列表--监控-->状态码饼图（汇总）
export const getBusineSstatusCodeMix = (params: any) => {
  return request({
    url: businessProxy + '/business/mix/statuscode/pie/',
    method: 'get',
    params,
  });
};

// 业务服务-->业务列表-->监控-->访问量（服务）
export const getBusinessPvTps = (params: any) => {
  return request({
    url: businessProxy + 'business_service/pv_tps/line/',
    method: 'get',
    params,
  });
};

// 业务服务-->业务列表--监控-->响应时间（服务）
export const getBusinessTp9x = (params: any) => {
  return request({
    url: businessProxy + 'business_service/tp9x/line/chart/',
    method: 'get',
    params,
  });
};

// 业务服务-->业务列表--监控-->成功率（服务）
export const getBusinesSuccessRate = (params: any) => {
  return request({
    url: businessProxy + 'business_service/http_status/success_rate/',
    method: 'get',
    params,
  });
};

// 业务服务-->业务列表--状态码饼图（服务）
export const getBusineSstatusCode = (params: any) => {
  return request({
    url: businessProxy + 'business_service/statuscode/pie/',
    method: 'get',
    params,
  });
};



// 业务服务-->业务列表--pv_tps tp90 tp99
export const geMatrixUrl = (params: any) => {
  return request({
    url: businessProxy + 'focus/matrix/business/uri/',
    method: 'get',
    params,
  });
};

