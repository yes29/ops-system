<template>
  <el-row :gutter="20" class="front-card">
    <el-col :span="6">
      <el-card class="box-card">
        <p slot="header" class="clearfix">汇总统计</p>
        <p class="lh-p">
          <span class="c-888">机房统计：</span>
          <span class="c-ed4">{{data.data_center_count}}</span>&nbsp;个
        </p>
        <p class="lh-p">
          <span class="c-888">网络设备：</span>
          <span class="c-ed4">{{data.device_total}}</span>&nbsp;台
        </p>
        <p class="lh-p">
          <span class="c-888">业务数量统计：</span>
          <span class="c-ed4">{{data.service_total}}</span>&nbsp;个
        </p>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="box-card">
        <p slot="header">机柜
          <span class="pl15">总数&nbsp;<span class="c-ed4">{{data.cabinet_detail.total}}</span>&nbsp;个</span>
        </p>
        <p class="lh-p" v-if="key!=='total'" v-for="(item, key) in data.cabinet_detail" :key="key">
          <span class="c-888">{{key}}：</span>
          <span class="c-ed4">{{item}}</span>&nbsp;个
        </p>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="box-card">
        <p slot="header">服务器数量
          <span class="pl15">
            总数&nbsp;<span class="c-ed4">{{data.pm_detail.total}}</span>&nbsp;台
          </span>
        </p>
        <p class="lh-p">
          <span class="c-888">宿主机</span>
          <span class="c-ed4">{{data.pm_detail.vm_count || 0}}</span>&nbsp;台
        </p>
        <p class="lh-p">
          <span class="c-888">非宿主机</span>
          <span class="c-ed4">{{data.pm_detail.host_count || 0}}</span>&nbsp;台
        </p>
        <p class="lh-p">
          <span class="c-888">虚拟机总计：</span>
          <span class="c-ed4">{{data.vm_server_count || 0}}</span>&nbsp;台
        </p>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="box-card">
        <p slot="header">代理
          <span class="pl15">
            总数&nbsp;<span class="c-ed4">
            {{data.agent_detail.total}}
            </span>&nbsp;套
          </span>
        </p>
        <p class="lh23">
          <span class="c-888">Lvs集群：</span>
          <span class="c-ed4">{{data.agent_detail.lvs || 0}}</span>&nbsp;套
        </p>
         <p class="lh23">
          <span class="c-888">Nginx集群：</span>
          <span class="c-ed4">{{data.agent_detail.nginx || 0}}</span>&nbsp;套
        </p>
        <p class="lh23">
          <span class="c-888">Haproxy集群：</span>
          <span class="c-ed4">{{data.agent_detail.haproxy || 0}}</span>&nbsp;套
        </p>
        <p class="lh23">
          <span class="c-888">Zookeeper集群：</span>
          <span class="c-ed4">{{data.agent_detail.zookeeper || 0}}</span>&nbsp;套
        </p>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="box-card">
        <p slot="header">数据库
          <span class="pl15">
              总数&nbsp;<span class="c-ed4">
              {{data.db_detail.total}}
              </span>&nbsp;套
            </span>
        </p>
        <p class="lh-p">
          <span class="c-888">MQ集群：</span>
          <span class="c-ed4">{{data.db_detail.mq || 0}}</span>&nbsp;套
        </p>
        <p class="lh-p">
          <span class="c-888">Redis集群：</span>
          <span class="c-ed4">{{data.db_detail.redis || 0}}</span>&nbsp;套
        </p>
        <p class="lh-p">
          <span class="c-888">MySQL集群：</span>
          <span class="c-ed4">{{data.db_detail.mysql || 0}}</span>&nbsp;套
        </p>
      </el-card>
    </el-col>
  </el-row>
</template>
<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {rscDetail} from '@/api/cmdb';

  @Component
  export default class FrontCard extends Vue {
    data: any = {
      cabinet_detail: {},
      pm_detail: {},
      agent_detail: {},
      db_detail: {},
    };

    mounted() {
      this.getDataDetait();
    }

    async getDataDetait() {
      const rest: any = await rscDetail();
      this.data = rest[0];
    }
  }
</script>
<style lang="scss">
  .front-card {
    background: rgb(238, 238, 238);
    padding: 20px 10px;
    margin: 0;

  .el-col-6 {
    width: 20%;
  }

  .pl15 {
    padding-left: 10px;
    font-size: 12px;
    font-weight: initial;
    color: #999;
  }

  .el-card {
    height: 178px;
  }

  .lh23 {
    line-height: 23px;
  }

  .lh-p {
    line-height: 28px;
  }

  }
</style>
