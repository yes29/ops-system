<template>
<div class="clear">
  <div class="mt20"
      v-if="item.item_list.length > 0"
      v-for="(item, index) in columns"
      :key="index">
    <table-card
        :title="'关联'+ item.name"
        :path="'/attribute/' + item.name"
        :columns ="item.item_list"
        :optList="keys[item.name]">
    </table-card>
  </div>
</div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
import { getServiceDetail } from '@/api/service';
import TableCard from '@/components/detail/card/table-card.vue';
@Component({components: {TableCard}})
export default class RelevancyCard extends Vue {
  @Prop({ default: '' }) api!: string;
  @Prop({ default: {} }) row!: any;
  columns: any = [];
  keys = {
    haproxy: [
      {title: '应用名', key: 'name', className: 'cname'},
      {title: '标签', key: 'label'},
      {title: '版本', key: 'version'},
      {title: '模式', key: 'mode'},
      {title: '连接地址', key: 'connect_address'},
      {title: '端口', key: 'port'},
      // {title: '后台地址', key: 'manage_address'},
      // {title: '后台密码', key: 'manage_user'},
      // {title: '调度算法', key: 'algorithm'},
      // {title: '备注', key: 'remark'}
    ],
    java: [
      {title: '应用名', key: 'name', className: 'cname'},
      {title: '语言', key: 'development_language'},
      {title: '项目组', key: 'project_team_name'},
      // {title: '简称', key: 'short_name'},
      // {title: '服务描述', key: 'describe'},
      {title: '负责人', key: 'manager'},
      // {title: '部署路径', key: 'dpy_path'},
      // {title: '启动参数', key: 'run_arg'},
      // {title: '运行环境', key: 'env_arg'},
      // {title: '备注', key: 'remark'}
    ],
    lvs: [
      {title: '应用名', key: 'name', className: 'cname'},
      {title: '标签', key: 'label'},
      {title: '版本', key: 'version'},
      {title: '模式', key: 'mode'},
      {title: 'vip', key: 'vip'},
      {title: '协议', key: 'protocol'},
      // {title: '调度算法', key: 'algorithm', align: 'center'},
      // {title: '转发规则', key: 'transpond_rule', align: 'center'},
      // {title: '会话保持', key: 'session_time', align: 'center'},
      // {title: '健康检查', key: 'health_check', align: 'center'}
    ],
    mq: [
      {title: '应用名', key: 'name', className: 'cname'},
      {title: '标签', key: 'label'},
      {title: '版本', key: 'version'},
      {title: '模式', key: 'mode'},
      {title: '节点', key: 'name'},
      // {title: 'vhost', key: 'vhost'},
      // {title: 'exchange', key: 'exchange'},
      // {title: 'exchange_type', key: 'exchange_type'},
      // {title: 'queue', key: 'queue'},
      // {title: 'routing_key', key: 'routing_key'},
      // {title: 'bindings', key: 'bindings'},
      // {title: 'ha_address"', key: 'ha_address'},
      // {title: 'user_password', key: 'user_password'},
      {title: 'role', key: 'role'},
    ],
    mysql: [
      {title: '应用名', key: 'name', className: 'cname'},
      {title: '标签', key: 'label'},
      {title: '版本', key: 'version'},
      {title: '模式', key: 'mode'},
      {title: '账号/密码', key: 'manage_user'},
      // {title: '读写地址', key: 'rw_address'},
      // {title: '写地址', key: 'write_address'},
      // {title: '库', key: 'library'},
      // {title: '备注', key: 'remark'}
    ],
    nginx: [
      {title: '应用名', key: 'name', className: 'cname'},
      {title: '标签', key: 'label'},
      {title: '版本', key: 'version'},
      {title: '模式', key: 'mode'},
      {title: '备注', key: 'remark'},
    ],
    redis: [
      {title: '应用名', key: 'name', className: 'cname'},
      {title: '标签', key: 'label'},
      {title: '版本', key: 'version'},
      {title: '模式', key: 'mode'},
      {title: '账号/密码', key: 'manage_address'},
      // {title: '读写地址', key: 'rw_address'},
      // {title: '写地址', key: 'write_address'},
      // {title: '库', key: 'library'},
      // {title: '备注', key: 'remark'}
    ],
    zookeeper: [
      {title: '应用名', key: 'name', className: 'cname'},
      {title: '标签', key: 'label'},
      {title: '版本', key: 'version'},
      {title: '模式', key: 'mode'},
      {title: '连接地址', key: 'connect_address'},
      // {title: '后台地址', key: 'manage_address'},
      // {title: '后台密码', key: 'manage_user'},
      // {title: '备注', key: 'remark'}
    ],
  };

  mounted() {
    this.geDataList();
  }

  // 监听row, 进行处理
  @Watch('row')
  handleRow() {
    this.geDataList();
  }

  // 获取data数据
  async geDataList() {
    if (!this.row.id) { return; }
    try {
      const result: any = await getServiceDetail(this.api, this.row.id);
      const data = result[0];
      if (!data.agent) { data.agent = []; }
      if (!data.dbs) { data.dbs = []; }
      if (!data.services) { data.services = []; }
      this.columns = [...data.agent, ...data.dbs, ...data.services];
    } catch (err) {
      console.error(err);
    }
  }

}
</script>
