<template lang="pug">
.blogs-wrap
  .blogs-catalog( :class="{close: closeMenu}" @click="closeMenu = !closeMenu")
    h3.title 文章目录
    ul.blogs-ul
      li( v-for="(item, i) in catalogs")
        span( @click="html = item.html") {{ i+1 }}. {{ item.label }}
  div.content
    iframe( ref="iframe")
</template>

<script>
// import marquee from "../../../public/htmlFile/marquee.html";
// import html from "../../../static/htmlFile/marquee.html";

export default {
  data() {
    return {
      catalogs: [
        {
          label: "只需一个DOM，纯CSS实现线性跑马灯特效",
          html: require("../../../static/htmlFile/marquee.html")
        },
        {
          label: "前端如何理解正则-由浅入深的学习",
          html: require("../../../static/htmlFile/regexpLearn.html")
        },
        {
          label: "DOM property 和 attribute 的区别详解",
          html: require("../../../static/htmlFile/propAndAttr.html")
        },
        {
          label:
            "CSS 预编译语言 变量全局引用方式 vue-cli@3.0 stylus/sass/less 使用方法",
          html: require("../../../static/htmlFile/preStyle.html")
        },
        {
          label: "JavaScript 有哪些数据类型 以及获取与判断的方法",
          html: require("../../../static/htmlFile/jsType.html")
        },
        {
          label:
            "进入debugger调试时, this 输出 undefined的问题，箭头函数与babel造成的调试不便",
          html: require("../../../static/htmlFile/debuggerConsole.html")
        },
        {
          label:
            "JavaScript 多线程处理计算密集型或高延迟的任务时，避免页面卡顿的方法",
          html: require("../../../static/htmlFile/jsWorker.html")
        },
        {
          label:
            "Vue-router 不允许导航到当前位置（'/path'）错误原因以及修复方式",
          html: require("../../../static/htmlFile/vue-rouerr-error.html")
        },
        {
          label: "CSS制作类似 Photoshop 模糊蒙版效果",
          html: require("../../../static/htmlFile/masking.html")
        },
        {
          label: "开发小技巧之调试DOM",
          html: require("../../../static/htmlFile/debugger-dom.html")
        },
        {
          label:
            "JavaScript 数组高性能去重 千万级数据去重效率测试 高效去重详解",
          html: require("../../../static/htmlFile/distinct.html")
        },
        {
          label: "vscode 自定义编辑器样式 CSS修改",
          html: require("../../../static/htmlFile/vscode-style-edit.html")
        }
      ],
      html: "",
      closeMenu: true
    };
  },
  watch: {
    html(val) {
      var html = this.$refs.iframe.contentWindow.document;
      html.documentElement.innerHTML = val;
      this.addIframeStyle(
        html.documentElement,
        `
        body { color: #eeeeee }
        pre>code { background-color: rgba(255,255,255,.1) }
        h1:after, h2:after { border-color: rgba(255, 255, 255, .8) }
      `
      );
      html.body.scrollTop = 0;
    }
  },
  mounted() {
    this.html = this.catalogs[0].html;
  },
  methods: {
    addIframeStyle(element, style) {
      var nod = document.createElement("style");
      nod.type = "text/css";
      if (nod.styleSheet) {
        nod.styleSheet.cssText = style;
      } else {
        nod.innerHTML = style;
      }

      element.getElementsByTagName("head")[0].appendChild(nod);
    }
  }
};
</script>

<style lang="stylus" scoped>
.blogs-wrap
  width 1200px
  max-width 100%
  margin auto
  font-size 16px
  color #eeeeee
  .blogs-catalog
    background-repeat no-repeat
    background-size 100% 1px, 1px 100%
    background-image linear-gradient(90deg, #ffffff, rgba(9, 16, 26, 0)), linear-gradient(0deg, rgba(9, 16, 26, 0), #ffffff)
    float left
    width 300px
    box-sizing border-box
    // border 1px solid #cccccc
    margin-right 10px
    height calc(100vh - 53px)
    .title
      font-size 16px
      padding 2px 5px
    .blogs-ul
      font-size 14px
      height calc(100% - 25px)
      box-sizing border-box
      overflow auto
      padding-bottom 70px
      > li
        padding 2px 5px
        margin-top 10px
        > span
          cursor pointer
          &:hover
            text-decoration underline dashed
  div.content
    float left
    width 890px
    // border 1px solid #ccccc
    background-repeat no-repeat
    background-size 100% 1px, 1px 100%
    background-image linear-gradient(90deg, #ffffff, rgba(9, 16, 26, 0)), linear-gradient(0deg, rgba(9, 16, 26, 0), #ffffff)
    box-sizing border-box
    font-size 0
    min-height calc(100vh - 53px)
    iframe
      min-height calc(100vh - 53px)
      border none
      width 100%
@media screen and (max-width 1270px)
  .blogs-wrap
    width 890px
    .blogs-catalog
      position absolute
      top 50px
      left 0
      background-image linear-gradient(90deg, rgba(9, 16, 26, 0), #ffffff), linear-gradient(0deg, rgba(9, 16, 26, 0), #ffffff)
      background-color rgba(9, 16, 26, .9)
      background-position right top
      height calc(100vh - 53px)
      width 250px
      transition margin-left .2s
      z-index 5
      &.close
        margin-left -250px
        &::before
          transform rotate(0deg)
          right -20px
          // text-indent -17px
      &::before
        overflow hidden
        // ◀
        content '▶'
        line-height 31px
        width 20px
        height 30px
        background rgba(255, 255, 255, .5)
        position absolute
        right 0
        top calc(50% - 15px)
        // border-radius 0 5px 5px 0
        border-radius 2px
        transform rotate(180deg)
        // word-spacing 1px
        white-space nowrap
        text-indent 2px
        transition text-indent .2s
      &:not(.close)
        &::after
          content ''
          position absolute
          left 0
          top -50px
          bottom 0
          width 10000px
          background-image linear-gradient(90deg, transparent 250px, rgba(255, 255, 255, .2) 250px), linear-gradient(180deg, rgba(255, 255, 255, .2) 50px, transparent 50px)
          background-size 100% 100%, 250px 50px
          background-repeat no-repeat
      .blogs-ul
        position relative
        z-index 1
    div.content
      background-image none
      max-width 100%
</style>
