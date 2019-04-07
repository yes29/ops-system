<template>
  <div class="clear">
    <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">
    <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      将文件拖到此处或
      <el-button :loading="loading" style="margin-left:16px;" size="mini" type="primary" @click="handleUpload">点击上传</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue} from 'vue-property-decorator';
import { read, utils } from 'xlsx';
@Component
export default class UploadExcel extends Vue {
  loading = false;
  excelData: any = {
    header: null,
    results: null,
  };

  generateData(data: any) {
    this.excelData.header = data.header;
    this.excelData.results = data.results;
    this.$emit('onSuccess', this.excelData);
  }

  handleDrop(e: any) {
    e.stopPropagation();
    e.preventDefault();
    if (this.loading) { return; }
    const files = e.dataTransfer.files;
    if (files.length !== 1) {
      this.$message.error('Only support uploading one file!');
      return;
    }
    const rawFile = files[0];
    if (!this.isExcel(rawFile)) {
      this.$message.error('Only supports upload .xlsx, .xls, .csv suffix files');
      return false;
    }
    this.upload(rawFile);
    e.stopPropagation();
    e.preventDefault();
  }

  handleDragover(e: any) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }

  handleUpload() {
    const refs: any = this.$refs['excel-upload-input'];
    refs.click();
  }

  handleClick(e: any) {
    const files = e.target.files;
    const rawFile = files[0]; // only use files[0]
    if (!rawFile) { return; }
    this.upload(rawFile);
  }

  upload(rawFile: any) {
    const refs: any = this.$refs['excel-upload-input'];
    refs.value = null;
    this.readerData(rawFile);
  }

  readerData(rawFile: any) {
    this.loading = true;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const target: any = e.target;
        const data = target.result;
        const fixedData = this.fixData(data);
        const workbook = read(btoa(fixedData), { type: 'base64' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const header = this.getHeaderRow(worksheet);
        const results = utils.sheet_to_json(worksheet);
        this.generateData({ header, results });
        this.loading = false;
        resolve();
      };
      reader.readAsArrayBuffer(rawFile);
    });
  }

  fixData(data: any) {
    let o = '';
    let l = 0;
    const w = 10240;
    for (; l < data.byteLength / w; ++l) {
      const numb: any = data.slice(l * w, l * w + w);
      const strArr: any = new Uint8Array(numb);
      o += String.fromCharCode.apply(null, strArr);
    }
    const numb2: any = data.slice(l * w);
    const strArr2: any = new Uint8Array(numb2);
    o += String.fromCharCode.apply(null, strArr2);
    return o;
  }

  getHeaderRow(sheet: any) {
    const headers = [];
    const range = utils.decode_range(sheet['!ref']);
    let C;
    const R = range.s.r;
    /* start in the first row */
    for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
      const cell = sheet[utils.encode_cell({ c: C, r: R })];
      /* find the cell in the first row */
      let hdr = 'UNKNOWN ' + C; // <-- replace with your desired default
      if (cell && cell.t) { hdr = utils.format_cell(cell); }
      headers.push(hdr);
    }
    return headers;
  }

  isExcel(file: any) {
    return /\.(xlsx|xls|csv)$/.test(file.name);
  }

}
</script>
<style scoped>
.excel-upload-input{
  display: none;
  z-index: -9999;
}
.drop{
  border: 1px dashed #bbb;
  width: 530px;
  height: 100px;
  line-height: 100px;
  font-size: 22px;
  border-radius: 5px;
  color: #bbb;
  position: relative;
  padding-left: 28px;
}
</style>
