<template>
  <div class='dashboard'>
    <front-card></front-card>
    <echarts-tree></echarts-tree>
  </div>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import FrontCard from './components/front-card.vue';
import EchartsTree from './components/echarts-tree.vue';
@Component({components: {FrontCard, EchartsTree}})
export default class Dashboard extends Vue {}
</script>
<style lang="scss">
.dashboard{
  p{
    margin: 0;
    padding: 0;
    border: 0
  }
  .tree{
    padding: 10px;
    padding-top: 0;
    margin-top: 20px;
  }
  .front-card{
    padding: 0;
  }
}
</style>
