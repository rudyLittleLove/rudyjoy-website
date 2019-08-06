<template lang="pug">
  .login-wrap( ref="loginWrap")
    canvas( ref="canvas" class="canvas" :height="canvasHeight" :width="canvasWidth")
    canvas( ref="canvas2" class="canvas2" :height="canvasHeight" :width="canvasWidth")
    img( class="login-icon" src="../assets/img/login-icon.png")
    .login-content
      h3 新兴业务服务支撑系统
      .content
        el-form( :model="form")
          el-form-item
            el-input( v-model="form.name" placeholder="账号")
          el-form-item
            el-input( v-model="form.password" placeholder="密码")
          el-form-item
            el-input( v-model="form.code" placeholder="验证码")
            rudy-captcha( class="captcha" width="100" font-family="迷你简菱心" :click-fresh="true")
      button 登录
</template>

<script>
import rudyCaptcha from "rudy-captcha";
export default {
  name: "login",
  components: { rudyCaptcha },
  data() {
    return {
      canvasWidth: 0,
      canvasHeight: 0,
      form: {
        name: "",
        password: "",
        code: ""
      }
    };
  },
  mounted() {
    this.canvasWidth = this.$refs.loginWrap.clientWidth;
    this.canvasHeight = this.$refs.loginWrap.clientHeight;
    this.$nextTick(() => {
      this.initCanvas();
    });
  },
  methods: {
    initCanvas() {
      let ctx = this.$refs.canvas.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(this.canvasWidth * 0.37, 0);
      ctx.bezierCurveTo(
        this.canvasWidth * 0.8,
        this.canvasHeight * 0.25,
        -100,
        this.canvasHeight * 0.8,
        this.canvasWidth * 0.55,
        this.canvasHeight * 0.95
      );
      ctx.quadraticCurveTo(
        this.canvasWidth * 0.63,
        this.canvasHeight * 0.97,
        this.canvasWidth * 0.65,
        this.canvasHeight
      );
      ctx.lineTo(0, this.canvasHeight);
      ctx.lineTo(0, 0);
      ctx.fillStyle = "rgba(7, 152, 245, .6)";
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(this.canvasWidth * 0.275, 0);
      ctx.bezierCurveTo(
        this.canvasWidth * 0.69,
        this.canvasHeight * 0.25,
        -100,
        this.canvasHeight * 0.7,
        this.canvasWidth * 0.4,
        this.canvasHeight * 0.85
      );
      ctx.quadraticCurveTo(
        this.canvasWidth * 0.63,
        this.canvasHeight * 0.95,
        this.canvasWidth * 0.65,
        this.canvasHeight
      );
      ctx.lineTo(0, this.canvasHeight);
      ctx.lineTo(0, 0);
      ctx.fillStyle = "rgba(7, 152, 245, .6)";
      ctx.fill();

      let ctx2 = this.$refs.canvas2.getContext("2d");
      ctx2.beginPath();
      ctx2.moveTo(this.canvasWidth * 0.614, 0);
      ctx2.quadraticCurveTo(
        this.canvasWidth * 0.65,
        this.canvasHeight * 0.2,
        this.canvasWidth * 0.77,
        this.canvasHeight * 0.23
      );
      ctx2.quadraticCurveTo(
        this.canvasWidth * 0.87,
        this.canvasHeight * 0.25,
        this.canvasWidth * 0.89,
        this.canvasHeight * 0.45
      );
      ctx2.quadraticCurveTo(
        this.canvasWidth * 0.93,
        this.canvasHeight * 0.73,
        this.canvasWidth,
        this.canvasHeight * 0.76
      );
      ctx2.lineTo(this.canvasWidth, 0);
      ctx2.lineTo(0, 0);
      ctx2.fillStyle = "rgba(7, 152, 245, .6)";
      ctx2.fill();
    }
  }
};
</script>
<style lang="stylus" scoped>
.login-wrap
  height 100%
  overflow hidden
  position relative
  .login-icon
    position absolute
    z-index 1
    left 50%
    margin-left -600px
    top 26%
    animation movemove 3s infinite
  canvas
    position absolute
    width 100%
    height 100%
    left 0
    top 0
  .canvas2
    z-index 2
  &::after
    content ''
    background-color #ffffff
  &::after
  .login-content
    position absolute
    width 468px
    height 557px
    border-radius 5px
    box-shadow -1px 1px 8px rgba(57, 21, 226, .4)
    left 50%
    margin-left 100px
    top 18%
    background-image radial-gradient(#5991e5 0, #5991e5 60%, transparent 60.5%, transparent 100% )
    background-position 240px -200px
    background-size 400px 400px
    background-repeat no-repeat
  .login-content
    background none
    z-index 3
    box-shadow none
    h3
      margin-top 150px
      text-align center
      font-size 26px
      color #1f60bd
      font-weight normal
    .content
      width 292px
      height 244px
      margin 50px auto 0
    button
      border none
      display block
      width 288px
      height 35px
      margin 0 auto
      border-radius 3px
      background-color #1f60bd
      color #ffffff
</style>
<style lang="stylus">
.login-wrap
  .el-form-item
    margin-bottom 30px
    .el-input__inner
      border 0px
      border-bottom 1px solid #a9d3ff
      border-radius 0
      padding 0
      &:last-child
        padding-right 100px
    .captcha
      line-height 0
      float right
      margin-top -40px
      position relative
@keyframes movemove
  0%
    transform translateY(0px)
  50%
    transform translateY(10px)
  100%
    transform translateY(0px)
</style>
