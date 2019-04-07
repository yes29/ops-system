<template>
<el-dialog
    title="核对编辑execl"
    width="820px"
    :modal-append-to-body="false"
    :close-on-click-modal="false"
    custom-class="excel-dialog"
    :visible.sync="show"
    :before-close="handleClose">
  <el-table
      :height="420"
      :show-overflow-tooltip="true"
      :data="tableData"
      style="width: 100%">
    <el-table-column type="index" width="40" class-name="c-table-index" align="center"></el-table-column>
    <el-table-column
        :prop="item.key"
        align="center"
        min-width="80"
        :show-overflow-tooltip="true"
        :label="item.title"
        v-for="(item, index) in colList"
        :key="index">
    </el-table-column>
    <el-table-column
        min-width="150"
        align="left"
        fixed="right"
        label="操作">
      <template slot-scope="scope">
        <el-button type="text" size="small" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
        <popover-delete :row="scope.row" @onDelete="handleDelete(scope.row)"></popover-delete>
      </template>
    </el-table-column>
  </el-table>
  <div class="c-ed4 mt10 fs12 pab" v-if="error">保存成功的数据剔除，没保存成功的数据保留, 请核对处理！</div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" :loading="loading" @click="onSubmit(tableData)">确 定</el-button>
  </span>
</el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop} from 'vue-property-decorator';
import { post } from '@/api/common';
import { setObjLocal, getObjLocal, removeLocal } from '@/utils/index';
import PopoverDelete from '@/components/baseTable/components/popover-delete.vue';

@Component({components: {PopoverDelete}})
export default class ExcelDialog extends Vue {
  @Prop({ default: [] }) excelList!: any;
  @Prop({ default: [] }) columns!: any;
  tableData: any = [];
  colList: any = [];
  errData: any = [];
  error = false;
  show = false;
  loading = false;
  api = '';
  editorRouter = '';
  params = {};
  num = 0;
  mounted() {
    const query: any = this.$route.query;
    this.api = query.api;
    this.editorRouter = query.editorRouter;
    const excel: string[] = getObjLocal('td_excel_dialog');
    if (excel && excel.length > 0) {
      this.tableData = excel;
      this.colList = getObjLocal('td_excel_header');
      this.show = true;
    }
  }

 formatDate(numb: number) {
    const time: any = new Date((numb - 1) * 24 * 3600000 + 1);
    time.setYear(time.getFullYear() - 70);
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const date = time.getDate();
    return year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date);
  }

  @Watch('excelList')
  changeExcelList(data: any) {
    this.error = false;
    const list = data.results;
    const header = data.header;
    const optArr: any = [];
    const tableArr: any = [];
    let num  = 0;
    for (const k of list) {
      const obj: any = {
        random: Math.random(),
      };
      for (const row of this.columns) {
        for (const col of row) {
          if (k[col.label]) {
            obj[col.key] = k[col.label];
            if (col.type === 'select') {
              const selObj: any = this.getOptObj(col.optList, k[col.label]);
              obj[col.key] = selObj.value;
              obj[col.key + '_name'] = selObj.name;
            }
            if (col.type === 'date') {
              obj[col.key] = this.formatDate(k[col.label]);
            }
          }
          // 头部内容一次够了
          for (const head of header) {
            if (num === 0 && (head === col.label)) {
              let key = col.key;
              if (col.type === 'select') {
                key = col.key + '_name';
              }
              optArr.push({title: col.label, key});
            }
          }
        }
      }
      num ++;
      tableArr.push(obj);
    }
    this.colList = optArr;
    this.tableData = tableArr;
    setObjLocal('td_excel_header', optArr);
    setObjLocal('td_excel_dialog', tableArr);
  }

  getOptObj(opt: any, name: any) {
    name = name.replace(/(\s*$)/g, '');
    const obj: any = {};
    for (let i = 0; i < opt.length; i++) {
      if (opt[i].name ===  name) {
        if (opt[i].id) {
          obj.name = opt[i].name;
          obj.value = opt[i].id;
        } else {
          obj.name = opt[i];
          obj.value = i;
        }
      }
    }
    return obj;
  }

  handleClose() {
    this.show = false;
    removeLocal('td_excel_dialog');
    removeLocal('td_excel_header');
  }

  // 编辑
  handleEdit(row: any) {
    const query: any = {
      type: 'create',
      api: this.api,
      row: encodeURIComponent(JSON.stringify(row)),
    };
    this.$router.push({
      name: this.editorRouter,
      query,
    });
    this.handleDelete(row);
  }

  handleDelete(row: any) {
    const arr = [];
    for (const k of this.tableData) {
      if (k.random !== row.random) {
        arr.push(k);
      }
    }
    this.tableData = arr;
    setObjLocal('td_excel_dialog', arr);
  }

  async onSubmit() {
    this.error = false;
    this.loading = true;
    try {
      if (this.num >= this.tableData.length) {
        this.loading = false;
        this.complete();
        return;
      }
      await post(this.api, this.handleRow(this.tableData[this.num]));
      this.num++;
      this.onSubmit();
    } catch (err) {
      this.errData.push(this.tableData[this.num]); // 记录出错的key
      this.num++;
      this.onSubmit();
    }
  }

  complete() {
    if (this.errData.length === 0) {
      this.$confirm('数据保存成功, 是否继续?', '提示', {
        confirmButtonText: '继续',
        cancelButtonText: '返回',
        type: 'success',
      }).then(() => {
        this.handleClose();
      }).catch(() => {
        this.handleClose();
        window.history.go(-1);
      });
    } else {
      this.tableData = this.errData;
      setObjLocal('td_excel_dialog', this.errData);
      this.error = true;
    }
  }

  handleRow(row: any) {
    const params: any = {};
    for (const k of this.columns) {
      for (const n of k) {
        if (row[n.key]) {
          params[n.key] = row[n.key];
        }
      }
    }
    return params;
  }
}
</script>

<style lang="scss">
.excel-dialog{
  .el-dialog__body {
    padding: 20px 20px;
  }
  .el-table{
    border-top: 1px solid #ebeef5;
    th {
      background-color: #f8f8f9;
    }
    .el-button {
      padding: 5px 12px 5px 0;
      font-size: 13px;
    }
    .cell{
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>
