<template>
 <el-select
      v-model="params[item.key]" 
      value-key="id"
      @change="handleChange"
      :filterable="true"
      :placeholder="'请选择' + item.label">
    <el-option
      v-if="opt[item.key]"
      v-for="opt in briefList"
      :key="opt.id"
      :label="opt[item.key]"
      :value="opt">
    </el-option>
  </el-select>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { ModalEditorModule } from '@/store/modules/modalEditor';
@Component
export default class SampleSelect extends Vue {
  @Prop({ default: {} }) params!: any;
  @Prop({ default: [] }) briefList!: string[];
  @Prop({ default: {} }) item!: any;
  handleChange(row: any) {
    const obj: any = {
      ip: row.ip,
      hostname:　row.name,
      server_id: row.id,
      data_center: row.datacenter,
      data_center_id: row.datacenter_id,
      minion_name: row.minion_name,
    };
    const params = Object.assign({}, this.params, obj);
    ModalEditorModule.modalView(params);
  }
}
</script>
