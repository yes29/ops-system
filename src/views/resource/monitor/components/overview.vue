<template>
<div class="overview" v-if="data.system_uptime">
  <el-row :gutter="10">
    <el-col :span="3">
      <span class="label">主机：</span>
      <span class="c-237">{{query.name}}</span>
    </el-col>
    <el-col :span="3">
      <span class="label">ip：</span>
      <span class="c-237">{{query.ip}}</span>
    </el-col>
    <el-col :span="3">
      <span class="label">运营：</span>
      <span>{{data.system_uptime}}</span>
    </el-col>
    <el-col :span="3">
      <span class="label">CPU：</span>
      <span>{{data.cpu_num}}核</span>
    </el-col>
    <el-col :span="6">
      <span class="label">内存：</span>
      <span>{{data.available_memory}}G&nbsp;/&nbsp;{{data.total_memory}}G</span>
    </el-col>
    <el-col :span="6" v-if="!data.agent_stat || !data.ping_stat">
      <span class="label">error：</span>
      <span class="c-ed4" v-if="!data.agent_stat">Agent Stat-->DOWN</span>
      <span class="c-ed4 ml20" v-if="!data.ping_stat">PING-->ERR</span>
    </el-col>
  </el-row>
  <!-- <el-row :gutter="10">
    <el-col :span="4">
       <span class="label">主机：</span><span class="c-237">{{query.name}}</span>
    </el-col>
     <el-col :span="4">
       <span class="label">ip：</span><span class="c-237">{{query.ip}}</span>
    </el-col>
  </el-row> -->
</div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { getSystemOverview, getDiskSpace } from '@/api/monitor';
@Component
export default class MOverview extends Vue {
  data = {};
  query = {};

  mounted() {
    const query: any = this.$route.query;
    this.query = query;
    this.getOverview();
  }

  async getOverview() {
    try {
      this.data = await getSystemOverview(this.$route.query);
    } catch (err) {
      console.error(err);
    }
  }
}
</script>
<style lang="scss" scoped>
.overview{
  width: 100%;
  padding: 20px 20px;
  background: #fff;
  font-size: 15px;
  font-weight: bold;
  // box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  line-height: 28px;
  .label{
    width: 100%;
    color: #888;
  }
  .c-237{
    color:rgba(237, 129, 40, 0.89);
  }
}
</style>
