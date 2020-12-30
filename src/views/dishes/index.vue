<template lang="pug">
  div.dishes-wrapper
    h1 土家菜馆菜单
    el-form( :model="formData" inline size="mini")
      el-form-item( label="人数")
        el-input( v-model="formData.peopleNumber")
      el-form-item( label="桌数")
        el-input( v-model="formData.tableNumber")
      el-form-item( label="单价")
        el-input( v-model="formData.price")
      el-form-item( label="餐位费")
        el-input( v-model="formData.peoplePrice")
      span.item 总金额 ￥{{count}}
      span.item 每桌金额 ￥{{total }}
    el-checkbox-group( v-model="formData.checked")
      ul
        li( v-for="(item, i) in dishes" :key="i")
          h2 {{item.type}}
          div.list-wrap
            el-checkbox( v-for="(item2, i2) in item.children" :key="`${i}.${i2}`" :label="`${item2.name} ${item2.price}`" ) {{item2.name}} 
              span.price ￥{{item2.price}}
    .right-box
      h2 已点菜品
      ul
        li( v-for="(item, i) in formData.checked") {{item.replace(' ',' ￥')}}
      .box
        p 每桌金额
          span ￥{{total}}
        p 已点菜品金额 
          span ￥{{totaled}}
        p( :class="{danger: total < totaled}") 剩余金额 
          span ￥{{total - totaled}}
</template>

<script>
import dishes from "./dishes";

export default {
  name: "Dishes",
  data() {
    return {
      dishes,
      formData: {
        peopleNumber: 20,
        tableNumber: 2,
        price: 15,
        peoplePrice: 3,
        checked: []
      }
    };
  },
  computed: {
    count() {
      return (
        this.formData.peopleNumber *
        (this.formData.price - this.formData.peoplePrice)
      );
    },
    total() {
      return this.count / this.formData.tableNumber;
    },
    totaled() {
      let arr = this.formData.checked.map(item => item.split(" ")[1]);

      arr.push(0, 0);

      return arr.reduce((a, b) => +a + +b);
    }
  },
  created() {
    console.log(dishes);
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
.dishes-wrapper
  width 1080px
  height 100%
  margin: 0 auto
  > h1
    text-align center
  .el-form
    margin-top 15px
    >>> .el-form-item__content
      width 100px
    .item
      font-size 14px
      line-height 28px
      display inline-block
      width 120px
  .el-checkbox-group
    h2
      font-size 20px
  .list-wrap
    padding 10px 0
    .el-checkbox
      min-width 180px
      padding: 5px 0
      >>> .el-checkbox__label
        font-size 16px
        width calc(100% - 20px)
      .price
        float right
  .right-box
    width 300px
    height 500px
    box-shadow 0 0 3px rgba(0, 0, 0, .2)
    position fixed
    top 50px
    left calc(50% + 530px)
    overflow auto
    padding-bottom 70px
    h2
      padding 5px
      text-align center
    li
      font-size 14px
      padding 5px 10px
    .box
      position absolute
      bottom 0
      width 100%
      box-sizing border-box
      font-size 14px
      padding 5px
      .danger
        color red
      span
        float right
</style>
