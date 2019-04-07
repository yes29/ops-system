/* 封装验证体系 */
export const required = (msg: string) => {
  return [{
    required: true,
    message: msg + '为必填项',
  }];
};
