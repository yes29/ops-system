import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
@Module({ dynamic: true, store, name: 'detail' })
class Detail extends VuexModule {
  show: boolean = false;
  row: any = {};

   // 更新详情row数据
   @Mutation
  HANDLE_VIEW(row: any) {
    this.show = true;
    this.row = Object.assign({}, row);
  }
  @Action({ commit: 'HANDLE_VIEW' })
  handleView(row: any) {
    return row;
  }

  // 关闭详情modal
  @Mutation
  HANDLE_CLOSE(close: boolean) {
    this.show = close;
  }
  @Action({ commit: 'HANDLE_CLOSE' })
  handleClose() {
    return false;
  }
}
export const DetailModule = getModule(Detail);
