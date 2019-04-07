import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';

@Module({ dynamic: true, store, name: 'tagsView' })
class TagsView extends VuexModule {
  visitedViews: any = [];
  @Mutation
  ADD_VISITED_VIEW(view: any) {
    if (this.visitedViews.some((v: any) => v.name === view.name)) {return; }
    const path: any = Object.assign({}, view, {title: view.meta.title});
    this.visitedViews.push(path);
  }
  @Action({ commit: 'ADD_VISITED_VIEW' })
  addView(view: any) {
    return view;
  }

 // close
  @Mutation
  DEL_VISITED_VIEW(view: any) {
    for (const [i, v] of this.visitedViews.entries()) {
      if (v.path === view.path) {
        this.visitedViews.splice(i, 1);
        break;
      }
    }
  }
  @Action({ commit: 'DEL_VISITED_VIEW' })
  delVisitedView(view: any) {
    return view;
  }

  // update
  @Mutation
  UPDATE_VISITED_VIEW(view: any) {
    for (let v of this.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view);
        break;
      }
    }
  }
  @Action({ commit: 'UPDATE_VISITED_VIEW' })
  updateVisitedView(view: any) {
    return view;
  }

  // del-others
  @Mutation
  DEL_OTHERS_VISITED_VIEWS(view: any) {
    for (const [i, v] of this.visitedViews.entries()) {
      if (v.path === view.path) {
        this.visitedViews = this.visitedViews.slice(i, i + 1);
        break;
      }
    }
  }
  @Action({ commit: 'DEL_OTHERS_VISITED_VIEWS' })
  delOthersVisitedViews(view: any) {
    return view;
  }

  // del-all
  @Mutation
  DEL_ALL_VISITED_VIEWS() {
    this.visitedViews = [];
  }
  @Action({ commit: 'DEL_ALL_VISITED_VIEWS' })
  delAllVisitedViews() {
    return;
  }
}
export const TagsViewModule = getModule(TagsView);
