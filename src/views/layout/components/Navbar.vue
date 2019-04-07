<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb />
     <div class="right-menu">
      <el-date-picker class="date-wrapper"
          v-if="showDate"
          v-model="dateArr"
          type="datetimerange"
          align="right"
          size="small"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="dateChange"
          :default-time="['12:00:00']"
          :picker-options="pickerOptions">
      </el-date-picker>
      <el-select
          class="refresh"
          size="small"
          v-if="showDate"
          @change="refreshChange"
          v-model="refresh"
          placeholder="请选择定时自动刷新">
        <el-option
            v-for="item in refreshOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <i class="el-icon-refresh refreshBtn" @click="refreshPage"></i>
      <el-tooltip class="refreshBtn" content="切换主题" effect="dark" placement="bottom">
        <theme-picker class="theme-switch right-menu-item"/>
      </el-tooltip>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img src="@/assets/images/avatar.jpg" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Breadcrumb from './Breadcrumb/index.vue';
import ThemePicker from './ThemePicker/index.vue';
import Hamburger from './Hamburger/index.vue';
import { AppModule } from '@/store/modules/app';
import { removeLocal } from '@/utils/index';
@Component({components: {Breadcrumb, Hamburger, ThemePicker}})
export default class Navbar extends Vue {
  timer: any;
  refresh: any = 0;
  dateArr: any = '';
  showDate = false;
  refreshOption = [{
      value: 0,
      label: 'reflesh ever 0',
    }, {
      value: 15,
      label: 'reflesh ever 15s',
    }, {
      value: 30,
      label: 'reflesh ever 30s',
    }, {
      value: 60,
      label: 'reflesh ever 1min',
    }, {
      value: 180,
      label: 'reflesh ever 3min',
    }, {
      value: 300,
      label: 'reflesh ever 5min',
    },
  ];
  pickerOptions = {
    shortcuts: [{
      text: '最近5分钟',
      onClick(picker: any) {
        picker.$emit('pick', [0, 5]);
      },
    }, {
      text: '最近15分钟',
      onClick(picker: any) {
        picker.$emit('pick', [0, 15]);
      },
    }, {
      text: '最近30分钟',
      onClick(picker: any) {
        picker.$emit('pick', [0, 30]);
      },
    }, {
      text: '最近1小时',
      onClick(picker: any) {
        picker.$emit('pick', [0, 60]);
      },
    }, {
      text: '最近12小时',
      onClick(picker: any) {
        picker.$emit('pick', [0, 720]);
      },
    }, {
      text: '最近24小时',
      onClick(picker: any) {
        picker.$emit('pick', [0, 1440]);
      },
    }],
  };

  get sidebar() {
    return AppModule.sidebar;
  }

  // 监听路由，添加处理监控时间
  @Watch('$route.meta')
  onRouteChange(meta: any) {
    clearInterval(this.timer);
    this.showDate = false;
    this.refresh = 0;
    this.dateArr = '';
    if (meta.rmon) {
      this.showDate = true;
    }
  }

  mounted() {
    const meta = this.$route.meta;
    if (meta.rmon) {
      this.showDate = true;
    }
  }

  refreshPage() {
    this.$router.go(0);
  }

  refreshChange(index: number) {
    clearInterval(this.timer);
    if (index === 0) { return; }
    this.timer = setInterval(() => {
      let date = this.dateArr;
      if (date === '') {
        date = [0, 5];
      }
      const startTime: number = date[0];
      if (startTime) {
        const obj = {
          startTime: (startTime / 1000).toFixed(0),
          endTime: (Math.floor(new Date().valueOf() / 1000)).toFixed(0),
        };
        this.$store.dispatch('changeDate', obj);
      } else {
        this.dateChange(date);
      }
    }, index * 1000);
  }

  dateChange(dateArr: any) {
    const obj = {
      startTime: 0 as any,
      endTime: 5 as any,
    };
    // 如果时间为空值或者电机清除
    if (!dateArr) {
      this.$store.dispatch('changeDate', obj);
      return false;
    }
    if (dateArr[0]) {
      obj.startTime = (dateArr[0].getTime() / 1000).toFixed(0);
      obj.endTime = (dateArr[1].getTime() / 1000).toFixed(0);
    } else {
      obj.endTime =  (Math.floor(new Date().valueOf() / 1000)).toFixed(0);
      obj.startTime  = (obj.endTime - dateArr[1] * 60).toFixed(0);
      const end = new Date().getTime();
      const start = end - dateArr[1] * 60 * 1000;
      this.dateArr = [start, end];
    }
    this.$store.dispatch('changeDate', obj);
  }

  toggleSideBar() {
    AppModule.ToggleSideBar(false);
  }

  logout() {
    removeLocal('cmdb_userinfo');
    location.href = './';
  }

}
</script>

<style rel="stylesheet/scss" lang="scss">
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
   .right-menu {
    float: right;
    height: 100%;
    display: flex;
    align-items: center;
    .el-date-editor--datetimerange.el-input__inner{
      display: flex;
      justify-content: center;
      width: 350px;
      right: 130px;
      color: #000;
    }
    .el-select{
      width: inherit;
    }
    .refresh{
      right: 100px;
      .el-input{
        width: 220px;
      }
      .el-input__inner{
        height: 32px;
      }
    }
    .refreshBtn{
      position: relative;
      font-size: 23px;
      color: #888;
      font-weight: bold;
      margin: 3px 12px 0;
      right: 90px;
      cursor: pointer;
    }
   }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
