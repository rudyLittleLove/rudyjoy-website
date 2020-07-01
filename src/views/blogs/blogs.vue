<template lang="pug">
reactive-panel
  template( v-slot:catalog)
    h3.title 文章目录
    ul.blogs-ul
      li( v-for="(item, i) in catalogs" :key="i" :class="{active: activeLabel === item.label}")
        span( @click="targetHandle(item, i)") {{ i+1 }}. {{ item.label }}
  template( v-slot:content)
    iframe( ref="iframe")
</template>

<script>
import ReactivePanel from "../components/reactive-panel";

export default {
  components: { ReactivePanel },
  data() {
    return {
      activeLabel: "",
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
        },
        {
          label:
            "vue中 iframe 引入 本地静态html文件，vue-cli2与vue-cli3引用的差异",
          html: require("../../../static/htmlFile/iframe-load.html")
        },
        {
          label: "canvas 绘制特效 小球连接线动画",
          html: require("../../../static/htmlFile/circle-connect.html")
        },
        {
          label: "使用canvas 如何绘制形状并支持拖拽、缩放功能",
          html: require("../../../static/htmlFile/canvas-scale-offset.html")
        },
        {
          label:
            "elementUI el-form 组件 验证 提示不能为空，以及验证不生效的详细原因",
          html: require("../../../static/htmlFile/el-form-valid.html")
        },
        {
          label: "vue 组件选项的推荐顺序 与 自动排序",
          html: require("../../../static/htmlFile/vue-prop-sort.html")
        },
        {
          label: "删除列表中一个DOM，其余DOM动态过渡的方法",
          html: require("../../../static/htmlFile/dom-transition.html")
        },
        {
          label: "深入理解CSS之 如何使子元素撑宽 设置了 block 的父元素",
          html: require("../../../static/htmlFile/strut-block-dom.html")
        },
        {
          label: "遮罩覆盖的DOM，如果触发点击 等一系列事件",
          html: require("../../../static/htmlFile/pointer-event.html")
        }
      ],
      html: ""
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.activeHandle(to.query.label);
    next();
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  watch: {
    html(val) {
      var html = this.$refs.iframe.contentWindow.document;
      html.documentElement.innerHTML = val;
      this.addIframeStyle(
        html.documentElement,
        `
        ::-webkit-scrollbar{
          width: 7px;
          height: 7px;
        }
        ::-webkit-scrollbar-thumb{
          background-color: rgba(255, 255, 255, .2);
          border-radius: 3px;
        }
        body { color: #eeeeee }
        pre>code { background-color: rgba(255,255,255,.1) }
        h1:after, h2:after { border-color: rgba(255, 255, 255, .8) }
      `
      );
      html.body.scrollTop = 0;
    }
  },
  mounted() {
    this.activeHandle(this.$route.query.label);
  },
  methods: {
    activeHandle(label) {
      let activeItem =
        this.catalogs.filter(item => item.label === label)[0] ||
        this.catalogs[0];

      this.activeLabel = activeItem.label;
      this.html = activeItem.html;
    },
    targetHandle(item) {
      // html = item.html
      this.$router.push({
        name: "blogs",
        query: {
          label: item.label
        }
      });
    },
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
.reactive-panel
  .title
    font-size 16px
    padding 2px 5px
  .blogs-ul
    position relative
    z-index 1
    font-size 14px
    height calc(100% - 25px)
    box-sizing border-box
    overflow auto
    padding-bottom 70px
    > li
      padding 2px 5px
      margin-top 10px
      &.active
        color #0cb0e4
      > span
        cursor pointer
        &:hover
          text-decoration underline dashed
  iframe
    min-height calc(100vh - 53px)
    border none
    width 100%
</style>
