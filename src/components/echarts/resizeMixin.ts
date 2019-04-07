import { Component, Vue} from 'vue-property-decorator';
@Component
export default class ResizeMixin extends Vue {
  screenWidth = 0;
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler);
  }
  resizeHandler() {
   this.screenWidth = document.body.clientWidth;
  }
}
