<template>
  <div class="dashboard">
    <td-header></td-header>
    <td-middle></td-middle>
    <td-bottom></td-bottom>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TdHeader from './components/overview-header.vue';
import TdMiddle from './components/overview-middle.vue';
import TdBottom from './components/overview-bottom.vue';
@Component({components: {TdHeader, TdMiddle, TdBottom}})
export default class Overview extends Vue {}
</script>
<style lang="scss">
.dashboard{
  .el-loading-mask{
    background: #fff;
  }
  .item-header{
    border-radius: 0;
    height: 42px;
  }
  .el-table--medium td, .el-table--medium th {
    padding: 4px 0;
    margin: -20px 0 0 20px;
  }
  .el-table::before{height: 0;}
  .mb20{margin-bottom: 20px;}
  .mt20{margin-top: 20px;}
}
</style>
