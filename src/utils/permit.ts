import router from '../router';
import { DetailModule } from '@/store/modules/detail';
import { PermitModule } from '@/store/modules/routerPermit';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken, getMenu } from '@/utils/index';
import { Route } from 'vue-router';
const whiteList = ['/'];
router.beforeEach((to: Route, from: Route, next: any) => {
  NProgress.start();
  DetailModule.handleClose(); // 不管走什么路由，都关闭详情
  if (getToken()) {
    if (to.path === '/') {
      next({ path: '/dashboard' });
      NProgress.done();
    } else {
      next();
      // 设置PermitModule
      filterRouter(to);
      // const isRouter = filterRouter(to);
      // if (!isRouter) {
      //   next({ path: '/404' });
      // } else {
      //   next();
      // }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/`); // 否则全部重定向到登录页
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

// const noFilterList = ['/', '/404', '/401'];
const filterRouter = (to: any) => {
  // 如果设置了noFilterList， 不过滤
  // for (const k of noFilterList) {
  //   if (k === to.path) {
  //     return true;
  //   }
  // }
  const list = getMenu();
  // 如果list中有的路由，返回true
  // let isRouter = false;
  for (const m of list) {
    if (m.read && m.path === to.path) {
      setTimeout(() => {
        PermitModule.setRouter(m);
      });
      // isRouter = true;
      break;
    }
    if (m.children && m.children.length > 0) {
      for (const n of m.children) {
        if (n.read && n.path === to.path) {
          setTimeout(() => {
            PermitModule.setRouter(n);
          });
          // isRouter = true;
          break;
        }
      }
    }
  }
  // return isRouter;
};
