<template lang="pug">
  .prop-wrap
    el-tabs( v-model="type")
      el-tab-pane( v-for="(item, i) in data" :label="item.titles[1]" :name="'index' + i")
        template( v-if="type === 'index'+ i")
          table
            thead
              tr
                th( v-for="item2 in item.titles") {{item2}}
            tbody
              tr( v-for="item2 in item.data")
                td( v-for="item3 in item2") {{item3}}
</template>

<script>
import propData from "../../static/propData";
export default {
  name: "dragonQuestProp",
  data() {
    return {
      data: propData,
      type: "index0"
    };
  },
  created() {
    console.log(propData[0]);
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="stylus" scoped>
.prop-wrap
  width 1200px
  height 100%
  margin auto
  font-size 16px
  th
    text-align left
  td
    padding 2px 4px
  tr:nth-child(2n)
    td
      background-color rgba(32,11,233, .1)
</style>
