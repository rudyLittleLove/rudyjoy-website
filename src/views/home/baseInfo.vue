<template lang="pug">
  .base-info
    h1 Rudy 的个人小站
    .line
    p 弄了一些特效，然后在其他页面放一些自己做过的一些东西，以及为了玩游戏方便搜索整理的一大堆数据。
    p 说一下做的这个页面吧，对，就是这个首页的样式。说实在对，对于我来说，如果你给我一个UI图，我能很快，并且精度很高的还原。但当我自己设计的时候，就是一件很烧脑的事了，做一个中规中矩的菜单可能都不需要设计。但想要做一个个性化的菜单，就足够我忙活了。
    p 怎么样能做到好看，怎么样才不会显得跟别人类似，删删改改多次，最后就确定这样了。虽说自己Photoshop玩的也蛮溜的，但是会Photoshop和设计是两码事。
    p 以前暑假我还干过美工呢，不过多数都是参照其他店铺的同类产品，再稍加改动就能做好主图、详情图、banner图等。
    p 好了，最后稍稍介绍一下自己。
    p 我是一个前端（废话，不是前端能做出这样的页面嘛），就技术而言呢，虽然不是大牛，但是还算是一个小牛吧。最近养成了写博客的习惯（其实是想记录技术的同时给自己加加分^_^），看着初入的同行私信问问题，心里还是有不少满足感的。
    p 本站目前都是前端页面，准备是用node.js 做后端，之前也用过node.js 开发，不过部署都是后端同事在干，自己还没弄过，得学学了。
    P 还有，本站是响应式的哦！不信？你拖动窗口大小看看，或者切换到手机或电脑看。
</template>

<style lang="stylus" scoped>
.base-info
  color #EEEEEE
  padding-bottom 100px
  > h1
    text-align center
    font-size 5em
    margin 80px auto 30px
  .line
    background-image linear-gradient(90deg, transparent, #EEEEEE, transparent )
    height 1px
    width 800px
    max-width 95%
    margin 0 auto
  > p
    margin 20px auto
    width 800px
    max-width 95%
    font-size 14px
@media screen and (max-width 900px)
  .base-info
    > h1
      font-size 2em
      margin-top 60px
</style>
