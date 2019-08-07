<template lang="pug">
  .table-wrap
    div( @scroll="scrollHandle")
      table( v-if="type === 'list'" cellspacing="0" cellpadding="0" border="0")
        colgroup
          col( width="80px")
        thead
          tr
            th
              span.width-80 图片
            th 名称
            th 普通掉落
            th 稀有掉落
            th 出现地点
            th 备注
        tbody
          tr( v-for="item in dataList")
            td
              img( ref="img" :src="item.imgSrc" :listen="listen")
            td
              span {{item.name}}
            td
              span {{item.ordinaryDrop}}
            td
              span {{item.rareDrop}}
            td
              span {{item.address}}
            td
              span {{item.description}}
      ul.item-wrap( v-else)
        li( v-for="(item, i) in dataList")
          img( ref="img" :src="item.imgSrc" :listen="listen")
          span No: {{item.No}}
          span 名称：{{item.name}}
          span 普通掉落：{{item.ordinaryDrop}}
          span 稀有掉落：{{item.rareDrop}}
          span 出现地点：{{item.address}}
          span 备注：{{item.description}}
    div.page-wrap
      el-pagination(
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 50, 100, 200, 500]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total")
      el-button( type="success" size="mini" @click="switchTypeHandle" class="switch-button") 切换 {{type}}
      el-input( v-model="searchVal" @keyup.native.enter="calcList" size="mini" placeholder="请输入搜索值，回车确认")
        el-button( slot="append" icon="el-icon-search" @click="calcList")
</template>

<script>
import rudyCaptcha from "rudy-captcha";
import data from "../../static/monsterData";
export default {
  name: "login",
  components: { rudyCaptcha },
  data() {
    return {
      type: "list",
      listen: false,
      data: data.map((v, i) => {
        v.No = i + 1;
        return v;
      }),
      dataList: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      searchVal: "",
      timer: ""
    };
  },
  created() {
    this.calcList();
  },
  mounted() {},
  methods: {
    scrollHandle() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        var wh = window.innerHeight;
        this.dataList.forEach(item => {
          var top = item.dom.getBoundingClientRect().top;
          if (top > -80 && top < wh && !item.imgSrc) {
            item.imgSrc = item.url && require("../../static/yzdel/" + item.url);
          }
        });
        this.listen = !this.listen;
      }, 200);
    },
    switchTypeHandle() {
      this.type = this.type === "list" ? "item" : "list";
      this.assignmentImg();
      this.$nextTick(() => {
        this.scrollHandle();
      });
    },
    // getPositionHandle(item) {
    //   return require("../../static/yzdel/" + item.url);
    // },
    handleSizeChange(v) {
      this.pageSize = v;
      this.pageNum = 1;
      this.calcList();
    },
    handleCurrentChange(v) {
      this.pageNum = v;
      this.calcList();
    },
    calcList() {
      let filterData = this.calcPage(this.data, this.pageNum, this.pageSize, {
        key: ["name", "ordinaryDrop", "rareDrop", "description", "address"],
        val: this.searchVal
      });
      this.dataList = filterData.data;
      this.pageNum = filterData.pageNum;
      this.total = filterData.count;
      this.$nextTick(() => {
        this.assignmentImg();
        this.scrollHandle();
      });
    },
    assignmentImg() {
      var imgs = this.$refs.img;
      this.dataList = this.dataList.map((v, i) => {
        v.dom = imgs[i];
        v.imgSrc = "";
        return v;
      });
    },
    calcPage(data, num, size, searchObj, xor) {
      // 浅拷贝data
      let filterData = Object.assign([], data);

      if (searchObj) {
        let filterFun = filter => {
          return Array.isArray(filter.key)
            ? item =>
                !!filter.key.filter(
                  key => (item[key] || "").indexOf(filter.val) !== -1
                ).length
            : item => (item[filter.key] || "").indexOf(filter.val) !== -1;
        };

        if (Array.isArray(searchObj)) {
          let datas = [];
          if (xor) {
            searchObj.forEach(filter => {
              filterData = filterData.filter(item => filterFun(filter)(item));
            });
          } else {
            searchObj.forEach(filter => {
              datas.push(filterData.filter(item => filterFun(filter)(item)));
            });
            filterData = Array.from(new Set([].concat.apply([], datas)));
          }
        } else {
          filterData = filterData.filter(item => filterFun(searchObj)(item));
        }
      }

      let pageCount = Math.ceil(filterData.length / size);
      let pageNum = (pageCount >= num ? num : pageCount) || 1;

      return {
        data: filterData.slice(size * (pageNum - 1), size * pageNum),
        pageSize: size,
        pageNum: pageNum,
        pageCount: pageCount,
        count: filterData.length
      };
    }
  }
};
</script>
<style lang="stylus" scoped>
.table-wrap
  width 1200px
  margin auto
  height 100%
  > div
    overflow auto
    height calc(100% - 50px)
  &::after
    content ''
    display block
    clear both
  // > button
  //   position fixed
  //   top 50%
  //   right calc(50% - 700px)
  //   border 1px solid #ccc
  //   padding 3px 5px
  //   margin-top 5px
  //   border-radius 3px
  //   background-color cornsilk
  table
    table-layout fixed
    width 100%
    thead
      padding 0
      position fixed
      top 0
      background-color #fff
      box-shadow 0 0 3px rgba(0, 0, 0, .3)
    th
      padding 0
      text-align left
      height 25px
      line-height 25px
      width 222px
      background-color #fff
      .width-80
        display block
        width 80px
      &:nth-child(1)
        width 80px
    tbody
      img
        width 80px
        height 80px
      td
        border-bottom 1px solid #EBEEF5
      tr:nth-child(1)
        td
          padding-top 30px
      tr:nth-child(2n -1)
        td
          background-color #f5f7fa
      // tr:nth-child(2n)
      //   td
      //     background-color rgba(122, 23, 111,.1)
  .item-wrap
    padding-left 10px
    img
      width 80px
      height 80px
      float left
      margin-right 10px
      margin-bottom 40px
    li
      height 120px
      float left
      width calc(100% / 4)
      box-sizing border-box
      margin-top 10px
      background-color rgba(32,42,233, .1)
      padding-right 10px
      background-clip content-box
      span
        display block
        line-height 20px
        font-size 14px
  .page-wrap
    height 50px
    margin auto
    .el-pagination
      float left
    .el-input
      float right
      width 250px
      margin-top 5px
    .switch-button
      float right
      margin 5px 10px
@media (max-width: 1200px)
  .table-wrap
    width 100%
    > button
      position visible
    > div
      height calc(100% - 80px)
    .item-wrap
      li
        width calc(100% / 3)
    .page-wrap
      height 80px
      .el-pagination
        float none
      .el-input
        float left
@media (max-width: 900px)
  .table-wrap
    .item-wrap
      li
        width calc(100% / 2)
@media (max-width: 600px)
  .table-wrap
    min-width 360px
    .item-wrap
      li
        width calc(100% / 1)
</style>
<style lang="stylus">
@media (max-width: 800px)
  .table-wrap
    .page-wrap
      .number
        display none
        &.active
          display block
      .more
        display none
@media (max-width: 600px)
  .table-wrap
    .el-pagination__jump
      margin-left 0
</style>
