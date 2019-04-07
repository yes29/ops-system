import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
@Module({ dynamic: true, store, name: 'permit' })
class Permit extends VuexModule {
  permit: any = {};
   // update
   @Mutation
  SET_ROUTER(permit: any) {
    this.permit = permit;
  }
  @Action({ commit: 'SET_ROUTER' })
  setRouter(permit: any) {
    return permit;
  }
}
export const PermitModule = getModule(Permit);
