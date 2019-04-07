import Cookies from 'js-cookie';
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';

export enum DeviceType {
  Mobile,
  Desktop,
}
export interface IAppState {
  loading: boolean;
  filtersRemote: any;
  device: DeviceType;
  dateResult: {
    startTime: number,
    endTime: number,
  };
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  loading = false;
  filtersRemote = {};
  sidebar = {
    opened: Cookies.get('sidebarStatus') !== 'closed',
    withoutAnimation: false,
  };
  device = DeviceType.Desktop;
  dateResult = {
    startTime: 0,
    endTime: 5,
  };

  @Mutation
  LOADDING(loading: boolean) {
    this.loading = loading;
  }
  @Action({ commit: 'LOADDING' })
  Loading(loading: boolean) {
    return loading;
  }

  @Mutation
  FILTERS_METHOD(obj: any) {
    this.filtersRemote = obj;
  }
  @Action({ commit: 'FILTERS_METHOD' })
  FiltersMethod(obj: any) {
    return obj;
  }

  @Mutation
  TOGGLE_SIDEBAR(withoutAnimation: boolean) {
    if (this.sidebar.opened) {
      Cookies.set('sidebarStatus', 'closed');
    } else {
      Cookies.set('sidebarStatus', 'opened');
    }
    this.sidebar.opened = !this.sidebar.opened;
    this.sidebar.withoutAnimation = withoutAnimation;
  }
  @Action({ commit: 'TOGGLE_SIDEBAR' })
  ToggleSideBar(withoutAnimation: boolean) {
    return withoutAnimation;
  }

  @Mutation
  CLOSE_SIDEBAR(withoutAnimation: boolean) {
    Cookies.set('sidebarStatus', 'closed');
    this.sidebar.opened = false;
    this.sidebar.withoutAnimation = withoutAnimation;
  }
 @Action({ commit: 'CLOSE_SIDEBAR' })
  CloseSideBar(withoutAnimation: boolean) {
    return withoutAnimation;
  }

  @Mutation
  TOGGLE_DEVICE(device: DeviceType) {
    this.device = device;
  }
  @Action({ commit: 'TOGGLE_DEVICE' })
  ToggleDevice(device: DeviceType) {
    return device;
  }

  @Mutation
  CHANGE_DATE(dateResult: any) {
    this.dateResult = dateResult;
  }
  @Action({ commit: 'CHANGE_DATE' })
  changeDate(dateResult: any) {
    return dateResult;
  }
}
export const AppModule = getModule(App);
