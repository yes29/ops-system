<template>
<!-- showKey 当需要配合其他输入才显示 -->
<el-form-item
    v-if="(item.showKey && params[item.showKey] === item.showValue) || (item.type && !item.showKey)"
    :label="item.label"
    :prop="item.required?item.key: ''"
    :rules="item.required ? required(item.label) : {}">
  <!-- input、textarea -->
  <el-input
      v-if="item.type === 'input' || item.type === 'textarea' || item.type === 'number'"
      :type="item.type"
      v-model="params[item.key]"
      :placeholder="item.placeholder ? item.placeholder : '请输入'+ item.label">
  </el-input>
  <!-- select -->
  <el-select
      v-if="item.type === 'select'"
      clearable
      filterable
      v-model="params[item.key]"
      :placeholder="'请选择' + item.label">
    <el-option
        v-for="(opt, index) in item.optList"
        :key="index"
        :label="opt.name ? opt.name : opt"
        :value="opt.id ? opt.id : index">
    </el-option>
  </el-select>
  <!-- select -->
  <el-select
      v-if="item.type === 'selStr'"
      filterable
      clearable
      v-model="params[item.key]"
      :placeholder="'请选择' + item.label">
    <el-option
        v-for="(opt, index) in item.optList"
        :key="index"
        :label="opt"
        :value="opt">
    </el-option>
  </el-select>
  <el-cascader
      v-if="item.type === 'cascader'"
      clearable
      filterable
      v-model="params[item.key]"
      :placeholder="'请选择' + item.label"
      :options="item.optList">
  </el-cascader>
  <el-date-picker
      v-if="item.type === 'date'"
      clearable
      type="date"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
      :placeholder="'请选择' + item.label"
      v-model="params[item.key]"
      style="width: 100%;">
  </el-date-picker>
  <el-date-picker
      v-if="item.type === 'datetime'"
      clearable
      type="datetime"
      :placeholder="'请选择' + item.label"
      format="yyyy-MM-dd HH:mm:ss"
      value-format="yyyy-MM-dd HH:mm:ss"
      v-model="params[item.key]"
      default-time="12:00:00"
      style="width: 100%;">
  </el-date-picker>
  <el-date-picker
      v-if="item.type === 'datetimerange'"
      clearable
      type="datetimerange"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
      :placeholder="'请选择' + item.label"
      v-model="params[item.key]"
      style="width: 100%;">
  </el-date-picker>
  <render-item v-if="item.type === 'render'" :render="item.render" :item="item" :params="params"/>
</el-form-item>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import RenderItem from './render-item';
import { required } from '@/utils/validate';
@Component({components: {RenderItem}})
export default class FormItem extends Vue {
  @Prop({ default: {} }) params!: object;
  @Prop({ default: {} }) item!: object;
  required = required;
}
</script>
