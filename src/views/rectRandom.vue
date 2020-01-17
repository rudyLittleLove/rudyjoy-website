<template>
  <div class="wrap">
    <button @click="randomHandle">random</button>
    <transition-group tag="ul">
      <li
        v-for="(item, i) in arr"
        :key="item"
        @click="activeHandle(i)"
        :style="`width: calc(100% / ${step});padding-top: calc(100% / ${step})`"
      ></li>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // arr: [],
      step: 30,
      length: 4,
      sum: 0
    };
  },
  computed: {
    arr() {
      return Array.from(new Array(Math.ceil(this.sum)), (e, i) => i);
    }
  },
  created() {
    this.calcSum();
    let timer = "";
    window.onresize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.calcSum();
      }, 100);
    };
  },
  methods: {
    calcSum() {
      this.sum =
        (document.documentElement.clientHeight /
          (document.documentElement.clientWidth / this.step)) *
          this.step +
        this.step;
    },
    randomHandle() {
      for (let i = 0, len = this.arr.length; i < len; i++) {
        let temp = this.arr[i];
        let rand = Math.floor(Math.random() * len);
        this.arr[i] = this.arr[rand];
        this.arr[rand] = temp;
      }
      this.$forceUpdate();
    },
    activeHandle(index) {
      let changeArr = [];
      changeArr.push(index);
      for (let i = 1; i <= this.length; i++) {
        index - i >= 0 && changeArr.push(index - i);
        index + i <= this.sum && changeArr.push(index + i);

        let before = index - i * this.step;
        if (before >= 0) {
          changeArr.push(before);
          for (let x = 1; x <= this.length - i; x++) {
            before - x >= 0 && changeArr.push(before - x);
            before + x <= this.sum && changeArr.push(before + x);
          }
        }

        let after = index + i * this.step;
        if (after <= this.sum) {
          changeArr.push(after);
          for (let x = 1; x <= this.length - i; x++) {
            after - x >= 0 && changeArr.push(after - x);
            after + x <= this.sum && changeArr.push(after + x);
          }
        }
      }

      for (let i = 0, len = changeArr.length; i < len; i++) {
        let temp = this.arr[changeArr[i]];
        let rand = Math.floor(Math.random() * len);
        this.arr[changeArr[i]] = this.arr[changeArr[rand]];
        this.arr[changeArr[rand]] = temp;
      }
      this.$forceUpdate();
      console.log(changeArr);
    }
  }
};
</script>

<style lang="stylus">
.wrap
  height 100%
  width 100%
ul
  margin 0
  padding 0
  overflow hidden
  height 100%
  width 100%
  li
    transition transform 2s
    list-style none
    text-align center
    box-shadow  0 0 13px #000 inset
    float left
    &:hover
      transition transform 0.1s
      transform scale(1.5)
button
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  display block
  width 80px
  height 30px
  line-height 30px
  margin auto
  border 1px solid #ccc
  border-radius 3px
  z-index 1
</style>
