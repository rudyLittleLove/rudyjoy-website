<template lang="pug">
  div.dishes-wrapper
    h1 土家菜馆菜单
    el-form( :model="formData" inline size="mini")
      el-form-item( label="人数")
        el-input-number( v-model="formData.peopleNumber" controls-position="right")
      el-form-item( label="桌数")
        el-input-number( v-model="formData.tableNumber" controls-position="right")
      el-form-item( label="单价")
        el-input-number( v-model="formData.price" controls-position="right")
      el-form-item( label="餐位费")
        el-input-number( v-model="formData.peoplePrice" controls-position="right")
      span.item 总金额 ￥{{count}}
      span.item 每桌金额 ￥{{total }}
    el-checkbox-group( v-model="formData.checked")
      ul
        li( v-for="(item, i) in dishes" :key="i")
          h2 {{item.type}}
          div.list-wrap
            el-checkbox( v-for="(item2, i2) in item.children" :key="`${i}.${i2}`" :label="item2.id" :class="{light: balance === +item2.price}") {{item2.name}} 
              span.price( v-if="item2.name !== '炒时蔬'") ￥{{item2.price}}
              el-input( v-else v-model="item2.price" size="mini")
    .right-box
      h2 已点菜品
      ul
        li( v-for="(item, i) in formData.checked" :key="i" @click="formData.checked.splice(i, 1)") {{dishesObj[item].name}}
          span ￥{{dishesObj[item].price}}
      .box
        p 桌数
          span {{formData.tableNumber}} 桌
        p 每桌金额
          span ￥{{total}}
        p 已点菜品金额 
          span ￥{{totaled}}
        p( :class="{danger: total < totaled}") 剩余金额 
          span ￥{{balance}}
</template>

<script>
import dishes from './dishes'

export default {
  name: 'Dishes',
  data() {
    return {
      dishes: [],
      formData: {
        peopleNumber: 20,
        tableNumber: 2,
        price: 15,
        peoplePrice: 3,
        checked: []
      },
      dishesObj: {}
    }
  },
  computed: {
    count() {
      return this.formData.peopleNumber * (this.formData.price - this.formData.peoplePrice)
    },
    total() {
      return this.count / this.formData.tableNumber
    },
    totaled() {
      let arr = this.formData.checked.map(item => {
        return this.dishesObj[item].price
      })

      arr.push(0, 0)

      return arr.reduce((a, b) => +a + +b)
    },
    balance() {
      return this.total - this.totaled
    }
  },
  created() {
    this.dishes = dishes.map(item => {
      item.children.sort((a, b) => (a.price >>> 0) - (b.price >>> 0))

      item.children.map(v => {
        v.id = (Math.random() * Math.pow(10, 10)) >>> 0
        this.dishesObj[v.id] = v
        return v
      })
      return item
    })
  },
  methods: {}
}
</script>

<style lang="css">
.light > .el-checkbox__label {
  color: orange;
}
</style>

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
      .el-input-number--mini
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
      .el-input
        width 80px
        float right
        margin-top -5px
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
    // overflow auto
    padding-bottom 70px
    h2
      padding 5px
      text-align center
    ul
      height calc(100% - 80px)
      overflow auto
    li
      font-size 14px
      padding 5px 10px
      cursor url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAA7ElEQVQ4T7WUPQrCQBCF3zP+YGkECyt7b2ClTRQT7DyP8RA2niOC2ugdvIAgWAimV0lWRgkkmogrcZoZltlv3s7sLpGTMScO/g/ynb5KU2t6q9TimYrO9mAMhu04jApHc7GepxVIgHzbmoHsPBNVK71/3Ms6wUPNW46inHcQOAQhkG3GILpQ2JPcZYJk49mxXIKTrF5I7xTUtO6t3cSxX6vGQb7T35jeqic5UawNCsCeAbURL6AoFq+lKDdQpYzm5YpjKSg0CtWwGMU3IzxpKcqt2YR6TCWUKxMzmaiWok+P+SvQr7/B/1+/rrI7OduHE5n+jYMAAAAASUVORK5CYII='), no-drop
      &:hover
        box-shadow 0 0 3px rgba(255, 0, 0, 1) inset
      span
        float right
    .box
      position absolute
      border-top 1px solid #eeeeee
      bottom 0
      width 100%
      box-sizing border-box
      font-size 14px
      padding 5px
      p
        padding 3px 0
      .danger
        color red
      span
        float right
</style>
