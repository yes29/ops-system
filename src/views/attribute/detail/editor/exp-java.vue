<template>
  <sample-editor
      title="Java实例"
      @upup="$emit('upup')"
      proxy="service"
      service="java"
      :columns="columns">
  </sample-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import SampleEditor from './components/sample-editor.vue';
@Component({components: {SampleEditor}})
export default class ExpJava extends Vue {
  groupSelList = ['蓝组', '绿组', '线上', '灰度'];
  columns: any = [
    [
      {type: 'input', label: '版本', key: 'version'},
    ],
    [
      {type: 'selStr', label: '分组名', key: 'group', optList: this.groupSelList},
    ],
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
    [
      {key: 'java_service_id'},
    ],
  ];
}
</script>
