export const setNames = (keys: any, list: any) => {
  let names = '';
  for (const k of list) {
    k.keys = [];
    for (const n of k.children) {
      n.key = n.id;
      n.label = n.name;
      if (!n.name) {
        n.label = '';
      }
      for (const i in keys) {
        // 设置显示的names
        if (keys[i] === n.key) {
          if (names.length < 1) {
            names = names + n.label;
          } else {
            names = names + '， ' + n.label;
          }
          // 设置穿梭keys
          k.keys.push(n.key);
        }
      }
    }
  }
  return names;
};
