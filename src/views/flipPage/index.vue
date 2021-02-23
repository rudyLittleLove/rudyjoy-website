<template lang="pug">
  div.box-wrapper
    Trun( :width="1000" ref="turn" :height="1000" :data="data" @change="" @tap="" @turning="")
</template>

<script>
import Trun from 'vue-flip-page'

export default {
  components: { Trun },
  data() {
    return {
      data: Array.from(new Array(30)).fill({ picture_image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2600216442,2384386498&fm=15&gp=0.jpg' })
    }
  }
}
</script>

<style lang="stylus" scoped>
.box-wrapper
  width 1000px
  margin auto
  >>> .page-photo img
    width 100%
    height 100%
    object-fit contain
</style>
