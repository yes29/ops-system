import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
@Module({ dynamic: true, store, name: 'modalEditor' })
class ModalEditor extends VuexModule {
  modalShow: boolean = false;
  modalData: any = {};
   // update
   @Mutation
  MODAL_VIEW(row: any) {
    this.modalShow = true;
    this.modalData = Object.assign({}, row);
  }
  @Action({ commit: 'MODAL_VIEW' })
  modalView(row: any) {
    return row;
  }

  @Mutation
  MODAL_CLOSE(close: boolean) {
    this.modalShow = close;
  }
  @Action({ commit: 'MODAL_CLOSE' })
  modalClose() {
    return false;
  }
}
export const ModalEditorModule = getModule(ModalEditor);
