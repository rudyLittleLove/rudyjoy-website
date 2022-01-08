<template lang="pug">
  div.yukangma-wrap
    div.button-map( @click="active = 2")
    img( class="second" :class="{show: active === 2}" src="./second.jpg", alt="alt")
    div.third-btn( @click="active = 3")
    img( class="second" :class="{show: active === 3}" src="./third.jpg", alt="alt")
    div.return-btn( @click="active -= 1")
</template>

<script>
export default {
  data() {
    return {
      active: 1,
    }
  },
  methods: {},
}
</script>

<style lang="stylus" scoped>
.yukangma-wrap {
  width: 100%;
  height: 100%;
  background-image: url(./home.jpg);
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
  .button-map {
    width: 100%;
    height: 150px;
    // box-shadow: 0 0 3px orange;
    position: absolute;
    bottom: 0%;
  }
  .second {
    position: absolute;
    left: 100%;
    top: 0;
    width: 100%;
    height: 100%;
    transition: left .3s;
    &.show {
      left: 0;
    }
  }
  .return-btn {
    width: 30px;
    height: 30px;
    left: 5px;
    top: 5.5%
    position: absolute;
    // box-shadow: 0 0 3px pink;
  }
  .third-btn {
    width: 100%;
    height: 40px;
    left: 0;
    top: 11%
    position: absolute;
    // box-shadow: 0 0 3px pink;
  }
}
</style>
