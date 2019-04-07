<template>
<el-color-picker v-model="theme" @change="cliTheme"></el-color-picker>
</template>
<script lang="ts">
import { Component, Vue, Watch} from 'vue-property-decorator';
import { setTimeout } from 'timers';
import { getLocal, setLocal } from '@/utils/index';
@Component
export default class ThemePicker extends Vue {
  chalk = false;
  theme = '#394663';
  oldCluster: any = '#409eff';
  mounted() {
    const theme = getLocal('td_theme');
    if (theme) { this.theme = theme; }
    this.cliTheme();
    this.getLinkHref();
  }

  getLinkHref() {
    const list: any = document.querySelectorAll('link');
    for (const k of list) { // 提交需要处理的样式
      if (k.rel === 'stylesheet') {
        this.getCSSString(k.href);
      }
    }
  }

  cliTheme() {
    if (!this.theme) {
      this.theme = '#394663';
    }
    // 处理现有样式
    const styles = [].slice.call(document.querySelectorAll('style'))
      .filter((style: any) => {
        const text = style.innerText;
        return new RegExp(this.oldCluster, 'i').test(text) && !/Chalk Variables/.test(text);
      });
    styles.forEach((style: any) => {
      const { innerText } = style;
      if (typeof innerText !== 'string') { return; }
      style.innerText = this.updateStyle(innerText);
    });
    setTimeout(() => {
      this.oldCluster = this.theme;
      setLocal('td_theme', this.theme);
    }, 1000);
  }

  updateStyle(newStyle: any) {
    const newCluster: any = this.getThemeCluster(this.theme.replace('#', ''));
    const oldCluster = this.getThemeCluster(this.oldCluster.replace('#', ''));
    oldCluster.forEach((color: any, index: any) => {
      newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index]);
    });
    return newStyle;
  }

  getCSSString(url: any) { // 重新请求样式
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const styleTag: any = document.createElement('style');
        styleTag.setAttribute('id', 'chalk-style');
        const head: any = document.head;
        head.appendChild(styleTag);
        styleTag.innerText = xhr.responseText;
        this.cliTheme();
      }
    };
    xhr.open('GET', url);
    xhr.send();
  }

  getThemeCluster(theme: any) {
    const tintColor = (color: any , tint: any ) => {
      let red: any  = parseInt(color.slice(0, 2), 16);
      let green: any  = parseInt(color.slice(2, 4), 16);
      let blue: any  = parseInt(color.slice(4, 6), 16);

      if (tint === 0) { // when primary color is in its rgb space
        return [red, green, blue].join(',');
      } else {
        red += Math.round(tint * (255 - red));
        green += Math.round(tint * (255 - green));
        blue += Math.round(tint * (255 - blue));

        red = red.toString(16);
        green = green.toString(16);
        blue = blue.toString(16);

        return `#${red}${green}${blue}`;
      }
    };
    const shadeColor = (color: any, shade: any) => {
      let red: any = parseInt(color.slice(0, 2), 16);
      let green: any = parseInt(color.slice(2, 4), 16);
      let blue: any = parseInt(color.slice(4, 6), 16);

      red = Math.round((1 - shade) * red);
      green = Math.round((1 - shade) * green);
      blue = Math.round((1 - shade) * blue);

      red = red.toString(16);
      green = green.toString(16);
      blue = blue.toString(16);

      return `#${red}${green}${blue}`;
    };
    const clusters = [theme];
    for (let i = 0; i <= 9; i++) {
      clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
    }
    clusters.push(shadeColor(theme, 0.1));
    return clusters;
  }
}
</script>

<style>
.theme-picker .el-color-picker__trigger {
  vertical-align: middle;
}
.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
