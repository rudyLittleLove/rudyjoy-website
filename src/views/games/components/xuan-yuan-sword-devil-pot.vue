<template lang="pug">
  .devil-pot-wrapper( ref="resize")
    h1 {{title}}
    el-form( label-width="100px" :inline="isInline")
      el-form-item( label="选择素材1：")
        el-select( v-model="value1" size="mini" clearable placeholder="请选择素材1" popper-class="devil-pot-popper" @change="changeHandle")
          el-option( v-for="item,i in baseInfo.options1" :value="item" :label="item")
      el-form-item( label="选择素材2：")
        el-select( v-model="value2" size="mini" clearable placeholder="请选择素材2" popper-class="devil-pot-popper" @change="changeHandle")
          el-option( v-for="item,i in baseInfo.options2" :value="item" :label="item")
      el-form-item( label="合成结果：")
        el-select( v-model="value3" size="mini" clearable placeholder="选择查询" popper-class="devil-pot-popper" @change="value1 = '';value2 = ''")
          el-option( v-for="item,i in baseInfo.options3" :value="item" :label="item")
    .content
      h2 {{value3}} 合成表
      el-table( :data="filterTable")
        el-table-column( prop="value1" label="素材1")
        el-table-column( prop="value2" label="素材2")
        el-table-column( prop="value3" label="合成")
</template>

<script>
// 引入DOM大小监听器
import {
  addResizeListener,
  removeResizeListener
} from "element-ui/lib/utils/resize-event";

import data from "../../../../static/XuanYuanSword/DevilPot.json";

export default {
  data() {
    return {
      title: "轩辕剑之天之痕 炼妖表",
      value1: "",
      value2: "",
      value3: "",
      isInline: true,
      baseInfo: data,
      filterTable: []
    };
  },
  watch: {
    value3: {
      handler(val) {
        var arr = this.baseInfo.total.filter(item => item.includes(`=${val}`));
        this.filterTable = arr.map(item => {
          let newArr = item.split(/\+|\=/);
          return {
            value1: newArr[0],
            value2: newArr[1],
            value3: newArr[2]
          };
        });
      },
      immediate: true
    }
  },
  mounted() {
    addResizeListener(this.$refs.resize, this.resizeWrapHandle);
  },
  destroyed() {
    removeResizeListener(this.$refs.resize, this.resizeWrapHandle);
  },
  methods: {
    changeHandle() {
      var search = `${this.value1}+${this.value2}=`;
      var result = this.baseInfo.total.filter(item => item.includes(search));
      this.value3 = result.length ? result[0].replace(search, "") : this.value3;
    },
    resizeWrapHandle() {
      if(this.$refs.resize){
        this.isInline = this.$refs.resize.offsetWidth > 880;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.devil-pot-wrapper
  font-size 1rem
  > h1
    text-align center
    padding 10px 0
    height 44px
    box-sizing border-box
  .el-form
    &.el-form--inline
      >>> .el-input__inner
        width 175px
    &:not(.el-form--inline)
      padding 0 20px 0 10px
      .el-select
        display block
        >>> .el-input__inner
          width 100%
  .el-form-item
    >>> .el-form-item__label
      color #fff
  .el-select
    >>> input
      color #ffffff
      background-color transparent
      &::placeholder
        color #FFF
  .content
    padding 0 20px 80px
    h2
      padding 10px 0
      text-align right
    .el-table
      background-color transparent
      >>> tr
      >>> th
      >>> .el-table__empty-text
        background-color transparent
        color #ffffff
      >>> tr:hover
        td
          background-color rgba(255, 255, 255, .2)
.el-select-dropdown__item
  max-width 80vw
</style>
