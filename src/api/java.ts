import request from '@/utils/request';
import { timestampToTime } from '@/utils/index';

const baseUrl = 'https://tdh5.tuandai888.com/hunter/';

export const getSlowSqlTop10 = (query: any) => {
  return request({
    url: baseUrl + 'sql/top10',
    method: 'get',
    params: query,
  });
};

export const getAllDbCurrentDelayTime = () => {
  return request({
    url: baseUrl + 'db/getAllDbCurrentDelayTime',
    method: 'get',
  });
};

export const importantBusinessUrls = () => {
  return request({
    url: baseUrl + 'important/business/urls',
    method: 'get',
  });
};

export const importantBusiness = (url: string, query: any) => {
  return request({
    url: baseUrl + url + '/' + timestampToTime(query.startTime) + '/' + timestampToTime(query.endTime),
    method: 'get',
    params: {
      url: query.url,
    },
  });
};
