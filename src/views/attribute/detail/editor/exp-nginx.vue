<template>
  <sample-editor
      title="Nginx实例"
      @upup="$emit('upup')"
      proxy="proxy_service"
      service="nginx"
      :columns="columns">
  </sample-editor>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import SampleEditor from './components/sample-editor.vue';
@Component({components: {SampleEditor}})
export default class ExpNginx extends Vue {
  columns: any = [
    [
      {type: 'textarea', label: '备注', key: 'remark'},
    ],
    [
      {key: 'nginx_id'},
    ],
  ];
}
</script>
