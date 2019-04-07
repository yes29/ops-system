<template>
  <sample-editor
      label-width="72px"
      title="Haproxy实例"
      @upup="$emit('upup')"
      proxy="proxy_service"
      service="haproxy"
      :columns="columns">
  </sample-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import SampleEditor from './components/sample-editor.vue';
@Component({components: {SampleEditor}})
export default class ExpHaproxy extends Vue {
  backupList = [
    {id: 1, name: '是'},
    {id: 0, name: '否'},
  ];
  columns: any = [
    [
      {
        type: 'select',
        label: '备用节点',
        key: 'is_backup',
        optList: this.backupList,
      },
    ],
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
    [
      {key: 'haproxy_id'},
    ],
  ];
}
</script>
