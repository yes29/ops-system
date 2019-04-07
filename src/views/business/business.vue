<template>
<el-tabs
    type="border-card"
    v-model="active"
    @tab-click="tabClick"
    class="business-card">
  <el-tab-pane name="1">
    <span slot="label">
      <i class="icon iconfont icon-business-list"></i>
      业务列表
    </span>
    <td-table
        :columns="columns"
        v-if="active==='1'"
        :render="btnBusiness"
        :filter="filter"
        ref="business"
        :root="true"
        :opt-width="250"
        proxy="monitor/business_monitor"
        service="business">
      <d-business></d-business>
    </td-table>
  </el-tab-pane>
  <el-tab-pane name="2">
    <span slot="label">
      <i class="icon iconfont icon-serve-list"></i>
      服务列表
    </span>
    <td-table
        ref="serve"
        opt-width="260"
        v-if="active === '2'"
        class="mt_10"
        :columns="columnsServe"
        :render="btnSevice"
        :filter="filter"
        proxy="service/service"
        service="project_team/services">
      <d-service></d-service>
      <ade-share-service @upup="getService()"></ade-share-service>
    </td-table>
  </el-tab-pane>
</el-tabs>
</template>
<script lang="ts">
import { Component, Vue, Watch} from 'vue-property-decorator';
import { DetailModule } from '@/store/modules/detail';
import { getQuery } from '@/utils/index';
import TdTable from '@/components/baseTable/table.vue';
import BtnSevice from './tableBtn/btn-service.vue';
import BtnBusiness from './tableBtn/btn-business.vue';
import DService from './detail/d-service.vue';
import DBusiness from './detail/d-business.vue';
import AdeShareService from './editor/ade-share-service.vue';
import { setTimeout } from 'timers';
@Component({components: {TdTable, DService, DBusiness, AdeShareService}})
export default class Business extends Vue {
  active = getQuery('keyword') ? '2' : '1';
  filter = {
    project_team_id: getQuery('id'),
  };
  // 详情页面的值是共用的，这两个详情需要
  btnBusiness = {
    type: 'render',
    render: (h: any, data: any) => {
      return h(BtnBusiness, {
        props: {
          row: data.row,
          reqDelete: data.reqDelete,
          handleEdit: data.handleEdit,
        },
      });
    },
  };

  btnSevice = {
    type: 'render',
    render: (h: any, data: any) => {
      return h(BtnSevice, {
        props: {
          row: data.row,
        },
      });
    },
  };

  columns = [
    {title: '业务名称', key: 'name', width:　200},
    {
      title: '关联服务',
      render(row: any) {
        let str: string = '';
        let num: number = 0;
        if (row.service_name_list) {
          for (const k of row.service_name_list) {
            if (num === 0) {
              str = k.service_name;
            } else {
              str = str + '，' + k.service_name;
            }
            num++;
          }
        }
        row.service = str;
        return str;
      },
    },
    {
      title: '重点URL',
      render(row: any) {
        let str: string = '';
        let num: number = 0;
        if (row.uri_info) {
          for (const k of row.uri_info) {
            for (const m of k.uris) {
              if (num === 0) {
                str = m.uri;
              } else {
                str = str + '，' + m.uri;
              }
              num++;
            }
          }
        }
        row.url = str;
        return str;
      },
    },
  ];

  columnsServe = [
    {title: '服务名称', key: 'name'},
    {title: '负责人', key: 'manager'},
    {
      title: '实例',
      render(row: any) {
        return row.instances.length + '个';
      },
    },
    {title: '更新时间', key: 'data'},
    {title: '运行状态', key: 'data'},
  ];

  mounted() {
    this.getKeywork();
  }
  // 就换项目组时，重获取代码
  @Watch('$route')
  routeChange() {
    this.filter = {
      project_team_id: getQuery('id'),
    };
    this.getKeywork();
    setTimeout(() => {
      if (this.active === '1') {
        this.getBusiness();
      } else {
        this.getService();
      }
    }, 100);
  }

  // 业务服务-关联服务跳转
  getKeywork() {
    if (getQuery('keyword')) {
      this.active = '2';
      const serve: any = this.$refs.serve;
      serve.params.search = {
        keyword: getQuery('keyword'),
      };
    }
  }

  // 获取业务列表
  getBusiness() {
    const business: any = this.$refs.business;
    business.params.page = 1;
    business.getDataList();
  }

  // 获取服务列表
  getService() {
    const serve: any = this.$refs.serve;
    serve.params.page = 1;
    serve.getDataList();
  }

  // 标签切换， 要清空search数据
  tabClick() {
    const query: any = {
      id: getQuery('id'),
      nav_name: getQuery('nav_name'),
    };
    this.$router.push({
      path: '/business',
      query,
    });
    DetailModule.handleClose();
  }
}
</script>
<style lang="scss">
.business-card{
  .icon-rmon-collect{
    float: left;
    margin-top: -2px;
    font-size: 17px !important;
  }
  .el-tabs__content{
    padding: 0;
  }
  .el-tabs__header{
    background-color: #fff;
  }
  .base-table{
    padding: 20px;
  }
  .el-tabs__item{
    height: 48px;
    line-height: 48px;
  }
}
</style>

