
// 获取浏览器客户端口高度
export const cHeight: number = window.document.body.clientHeight;

// 获取浏览器客户端口宽度
export const cWidth: number = window.document.body.clientWidth;

// 编码字符串
export const encodeURI = (arg: any) => {
  return encodeURIComponent(JSON.stringify(arg));
};

// 用于计算calc高度
export const calcHeight = (attr: any) => {
  return cHeight - attr + 'px';
};

// 存储单个属性
export const setLocal = (key: string, val: any) => {
  return window.localStorage && window.localStorage.setItem(key, val);
};

// 获取单个属性
export const getLocal = (key: string) => {
  return window.localStorage && window.localStorage.getItem(key);
};

// 存储对象，以JSON格式存储
export const setObjLocal = (key: string, value: object) => {
  window.localStorage[key] = JSON.stringify(value);
};

// 读取对象
export const getObjLocal = (key: string) => {
  return JSON.parse(window.localStorage[key] || '{}');
};

// 删除某一键值对
export const removeLocal = (key: string) => {
  return window.localStorage.removeItem(key);
};

// 获取单个url的key值
export const getQuery = (name: any) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const search = decodeURI(window.location.search);
  const r = search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
};

// 获取本地存储的token
export const getToken = () =>  {
  const hdD = getObjLocal('cmdb_userinfo');
  const Base64 = require('js-base64').Base64;
  if (hdD.token) {
    // %E5%8F%B6%E6%9D%BE
    return  'Basic ' + Base64.encode(encodeURIComponent(hdD.username) + ':' + hdD.token);
  } else {
    return false;
  }
};

// 根据key去重复
export const uniqueKey = (arr: string[], key: any) =>  {
  const result: any = [];
  const obj: any = {};
  for (const k of arr) {
    if (!obj[k[key]]) {
      result.push(k);
      obj[k[key]] = true;
    }
  }
  return result;
};

// 时间戳转成日期
export const timestampToTime = (timestamp: any) => {
  const date = new Date(timestamp * 1000); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = date.getFullYear() + '-';
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = date.getDate() as any;
  if (D < 10) { D = '0' + D; }
  D = D + ' ';
  let h = date.getHours() as any;
  if (h < 10) { h = '0' + h; }
  h = h + ':';
  let m = date.getMinutes() as any;
  if (m < 10) { m = '0' + m; }
  m = m + ':';
  let s = date.getSeconds() as any;
  if (s < 10) { s = '0' + s; }
  return Y + M + D + h + m + s;
};

// 5分钟同内时间
export const startTime = () => {
  return (Math.floor(new Date().valueOf() / 1000)) - 5 * 60;
};
// 60分钟同内时间
export const startTime60 = () => {
  return (Math.floor(new Date().valueOf() / 1000)) - 60 * 60;
};


// 当前时间
export const endTime = () => {
  return Math.floor(new Date().valueOf() / 1000);
};

// 获取菜单数据
export const getMenu = () => {
  const data: any = getObjLocal('cmdb_userinfo');
  if (data && data.menu) {
    return data.menu;
  }
  return [];
};
// 处理返回的菜单数据
export const setMenu = (menu: any) => {
  const arr = [];
  for (const item of menu) {
    // 当只有一层
    if (item.children && item.children[0].key) {
      for (const k of item.children) {
        item[k.key] = k.checked;
      }
      delete item.children;
    // 当菜单有两层时
    } else {
      let read = 0;
      for (const row of item.children) {
        for (const col of row.children) {
          row[col.key] = col.checked;
        }
        if (row.read) {
          read = 1;
        }
        delete row.children;
      }
      // 设置最顶层是否显示
      if (read === 1) {
        item.read = true;
      }
    }
    arr.push(item);
  }
  return arr;
};

// 新增编辑select的处理
export const pushOptColumns = (columns: any, rusult: any, key: string) => {
  const arr = [];
  for (const k of columns) {
      for (const n of k) {
        if (n.key === key) {
          n.optList = rusult;
        }
    }
      arr.push(k);
  }
  return arr;
};
