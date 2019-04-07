<template>
  <sample-editor
      title="MySql实例"
      @upup="$emit('upup')"
      proxy="db_service"
      service="mysql"
      :columns="columns">
  </sample-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import SampleEditor from './components/sample-editor.vue';
@Component({components: {SampleEditor}})
export default class ExpMysql extends Vue {
  columns: any = [
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
    [
      {key: 'mysql_service_id'},
    ],
  ];
}
</script>
