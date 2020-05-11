<template lang="pug">
.home-wrap( ref="wrap")
  .container-wrap.marquee-line
    web-header( :show-header="showHeader")
    .show-audio( :class="{close: !showAudio}")
      div.el-icon-d-arrow-right( @click="showAudio = !showAudio")
      audio( loop autoplay preload src="../../../static/music/未知的荒野.mp3" ref="audio" controls class="audio")
      //- source( src="../../../static/music/未知的荒野.mp3" type="audio/mp3")
          //- <source src="css/Music.ogg" type="audio/ogg"> 
          //- <source src="css/Music.aac" type="audio/mp4"> 
    //- .blur-box( :style="blurPosition" ref="box")
    //-   .blur-bg( :style="{backgroundImage: `url(${backgorundImages[index % 6]})`}")
    rudy-scrollbar( :wrap-resize="true" @scroll="scrollHandle" )
      router-view

</template>

<script>
import warpdrive from "@/assets/js/warpdrive.js";
import WebHeader from "@/views/home/header.vue";
import circle from "@/assets/js/circleConnect.js";

export default {
  name: "home",
  components: { WebHeader },
  data() {
    return {
      index: 0,
      moving: true,
      // backgorundImage: require("@/assets/img/bg_evening.jpg"),
      x: 0,
      y: 0,
      activeX: 0,
      activeY: 0,
      targetX: 0,
      targetY: 0,
      warpdrive: "",
      circle: "",
      showHeader: true,
      scrollTop: 0,
      showAudio: true
    };
  },
  mounted() {
    this.initBgAnimation();
    setInterval(() => {
      this.initBgAnimation();
    }, 1000 * 30);
    // this.$refs.audio.play();
  },
  computed: {
    // blurPosition() {
    //   return `left: ${this.x}px; top: ${this.y}px`;
    // }
  },
  methods: {
    scrollHandle(e) {
      this.showHeader = !(this.scrollTop < e.target.scrollTop);
      this.scrollTop = e.target.scrollTop;
    },
    initBgAnimation() {
      // window.addEventListener("mouseup", this.removeEventListenerHandle);

      // window.addEventListener("touchend", this.removeEventListenerHandle);

      // window.addEventListener("resize", this.resizeHandle);
      if (this.warpdrive) {
        this.warpdrive.distory();
        delete this.warpdrive;
        this.circle = new circle(this.$refs.wrap, {
          num: 100,
          width: this.$refs.wrap.clientWidth,
          height: this.$refs.wrap.clientHeight
        });
      } else {
        this.circle && this.circle.distory();
        console.log(this.$refs.wrap);
        this.warpdrive =
          this.warpdrive ||
          new warpdrive(this.$refs.wrap, {
            width: this.$refs.wrap.clientWidth,
            height: this.$refs.wrap.clientHeight,
            autoResize: true,
            addMouseControls: false,
            addTouchControls: false,
            starCount:
              (this.$refs.wrap.clientWidth * this.$refs.wrap.clientHeight) /
              (!!window.ActiveXObject || "ActiveXObject" in window
                ? 2000
                : 1000),
            starBgCount: 0,
            starfieldBackgroundColor: { r: 28, g: 39, b: 59 }
          });
      }

      // box.addEventListener("mousedown", this.addEventListenerHandle);

      // box.addEventListener("touchstart", this.addEventListenerHandle);
    }
    // addEventListenerHandle(e) {
    //   e = e.type === "touchstart" ? e.targetTouches[0] : e;

    //   this.targetX = e.clientX;
    //   this.targetY = e.clientY;

    //   this.activeX = this.x;
    //   this.activeY = this.y;

    //   document.documentElement.addEventListener(
    //     "mousemove",
    //     this.mousemoveHandle
    //   );
    //   document.documentElement.addEventListener(
    //     "touchmove",
    //     this.mousemoveHandle,
    //     false
    //   );
    // },
    // removeEventListenerHandle() {
    //   document.documentElement.removeEventListener(
    //     "mousemove",
    //     this.mousemoveHandle
    //   );
    //   document.documentElement.removeEventListener(
    //     "touchmove",
    //     this.mousemoveHandle
    //   );
    // },
    // mousemoveHandle(e) {
    //   e.stopPropagation();

    //   e = e.type === "touchmove" ? e.targetTouches[0] : e;

    //   var box = this.$refs.box;
    //   var wrap = this.$refs.wrap;
    //   var x = this.activeX + (e.clientX - this.targetX);
    //   var y = this.activeY + (e.clientY - this.targetY);

    //   if (box.offsetWidth + x - wrap.clientWidth > 0) {
    //     x = wrap.clientWidth - box.offsetWidth;
    //   }

    //   if (box.offsetHeight + y - wrap.clientHeight > 0) {
    //     y = wrap.clientHeight - box.offsetHeight;
    //   }

    //   this.x = x < 0 ? 0 : x;
    //   this.y = y < 0 ? 0 : y;
    // },
    // resizeHandle() {
    //   var box = this.$refs.box;
    //   var wrap = this.$refs.wrap;

    //   if (this.x + box.offsetWidth > wrap.clientWidth) {
    //     this.x = wrap.clientWidth - box.offsetWidth;
    //   }
    //   if (this.y + box.offsetHeight > wrap.clientHeight) {
    //     this.y = wrap.clientHeight - box.offsetHeight;
    //   }
    // }
  },
  destroyed() {
    // window.removeEventListener("mouseup", this.eventListenHandle);
    // window.removeEventListener("resize", this.resizeHandle);
  }
};
</script>
<style lang="stylus" scoped>
// .button-group
//   padding-top 30px
//   padding-bottom 30px
//   .el-button
//     margin-right 10px
//     margin-top 10px
//     &+.el-button
//       margin-left 0
@keyframes upDow
  0%
    left -37px
  50%
    left -31px
  100%
    left -37px

.home-wrap
  height 100vh
  overflow hidden
  .show-audio
    // height 100px
    position fixed
    left calc(100% - 300px)
    width 300px
    bottom 10px
    z-index 1
    transition left .3s
    &.close
      left 100%
      > div.el-icon-d-arrow-right
        transform rotate(180deg)
    > div.el-icon-d-arrow-right
      color #ffffff
      font-size 30px
      position absolute
      top calc(50% - 18px)
      left -37px
      transform rotate(0deg)
      animation upDow 3s infinite
      cursor pointer
  .container-wrap
    position absolute
    // height 100vh
    // width 100vw
    // // overflow hidden
    top 0
    left 0
    right 0
    bottom 0
    background-image linear-gradient(90deg, rgba(28, 39, 59, 0) 0%, #ffffff 100%), linear-gradient(0deg, #ffffff 0%, rgba(28, 39, 59, 0) 100%), linear-gradient(-90deg, rgba(28, 39, 59, 0) 0%, #ffffff 100%), linear-gradient(0deg, rgba(28, 39, 59, 0) 0%, #ffffff 100%)
    background-size 100px 2px, 2px 100px, 100px 2px, 2px 100px
    padding 1px
    background-clip content-box
    > .rudy-scrollbar
      >>>
        > .rudy-scrollbar__wrap
          > .rudy-scrollbar__view
            padding-top 50px
.home-wrap, .blur-bg
  background-color #000000
  background-image url('../../assets/img/bg_evening-yasuo.jpg')
  background-repeat no-repeat
  background-attachment fixed
  background-size cover
  background-position center center

.blur-box
  width 100px
  height 100px
  box-sizing border-box
  position absolute
  border 1px solid #cccccc
  overflow hidden
  transition margin-top .5s

.blur-bg
  content ''
  position absolute
  top -1000px
  left -1000px
  right -1000px
  bottom -1000px
  filter blur(4px)
</style>
