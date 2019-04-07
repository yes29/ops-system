<template>
 <td-editor :columns="columns" labelWidth="100px"></td-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdEditor from '@/components/editor/editor.vue';
import { getSelectList } from '@/api/cmdb';
import { pushOptColumns } from '@/utils/index';
@Component({components: {TdEditor}})
export default class AdePmServer extends Vue {
  statusList = [ '未知', '正常', '下线'];
  columns = [
    [
      {type: 'input', label: 'sn编号', key: 'sn', required: true},
      {type: 'input', label: '名称', key: 'name', required: true},
    ],
    [
      {type: 'input', label: '型号', key: 'model_number'},
      {type: 'input', label: '所属系统', key: 'os'},
    ],
    [
      {type: 'select', label: '所属cpu', key: 'cpu_id', optList: []},
      {type: 'input', label: 'cpu颗数', key: 'cpu_num'},
    ],
    [
      {type: 'select', label: '所属内存', key: 'memory_id', optList: []},
      {type: 'input', label: '内存颗数', key: 'memory_num'},
    ],
    [
      {type: 'input', label: '光口数量', key: 'optical_port',  placeholder: '输入格式如：1-10'},
      {type: 'input', label: '电口数量', key: 'electrical_port', placeholder: '输入格式如：11-15'},
    ],
    [
      {type: 'select', label: '所属机柜', key: 'cabinet_id', optList: []},
      {type: 'input', label: '远程管理IP', key: 'remote_mgt'},
    ],
    [
      {type: 'select', label: '所属公司', key: 'company_id', optList: []},
      {type: 'input', label: '阵列卡', key: 'array_card'},
    ],
    [
      {type: 'select', label: '状态', key: 'status', optList: this.statusList},
      {type: 'date', label: '购买日期', key: 'purchase_date'},
    ],
    [
      {type: 'date', label: '保修开始日期', key: 'repair_start_date'},
      {type: 'date', label: '保修结束日期', key: 'repair_end_date'},
    ],
    [
      {type: 'date', label: '上架日期', key: 'active_time', showKey: 'status', showValue: 1},
    ],
    [
      {type: 'date', label: '下架日期', key: 'deactive_time', showKey: 'status', showValue: 2},
    ],
    [
      {type: 'input', label: '服务代码', key: 'service_code'},
    ],
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
  ];

  mounted() {
    this.getSelect();
  }

  eachList(list: any) {
    for (const k of list) {
      k.name = k.type;
    }
    return list;
  }

  getSelect() {
    getSelectList('cpu').then((rest: any) => {
      this.columns = pushOptColumns(this.columns, this.eachList(rest), 'cpu_id');
    });
    getSelectList('memory').then((rest: any) => {
      this.columns = pushOptColumns(this.columns, this.eachList(rest), 'memory_id');
    });
    getSelectList('cabinet').then((rest: any) => {
      this.columns = pushOptColumns(this.columns, rest, 'cabinet_id');
    });
    getSelectList('company').then((rest: any) => {
      this.columns = pushOptColumns(this.columns, rest, 'company_id');
    });
  }
}
</script>
