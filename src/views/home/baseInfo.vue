<template lang="pug">
  .base-info
    h1 Rudy 的个人小站
    .line
    p 弄了一些特效，然后在其他页面放一些自己做过的一些东西，以及为了搜索整理的一大堆游戏数据。
    p 说一下做的这个页面吧，对，就是这个首页的样式。说实在对，对于我来说，如果你给我一个UI图，我能很快，并且精度很高的还原。但当我自己设计的时候，就是一件很烧脑的事了，做一个中规中矩的菜单可能都不需要设计。但想要做一个个性化的菜单，就足够我忙活了。
    p 删删改改多次，最后就确定这样了，虽说自己Photoshop玩的也还不错，但是会Photoshop和设计是两码事。
    p 以前暑假兼职美工的时候，多数都是参照其他店铺的同类产品，再稍加改动就能做好主图、详情图、banner图等。
    p 谈谈页面的优化吧
    p 最明显的就是加了Gzip压缩吧，主流浏览器都支持解析.gz这个格式的压缩文件。只需要前端打包创建好压缩文件，后端配置浏览器支持解析的就返回这种压缩格式文件，这样就能极大缩减加载文件时间了。
    P 还有就是背景图用photoshop 导出了web格式的压缩类型，1920*1080大小图片的最后也才36.5kb。
    p 最 low 的一个优化就是因为菜单用了迷你简菱心字体，这个字体文件原本接近2M，为了缩小大小就把header中所有用到的文字，通过字体编辑软件一个一个的添加到新创建的字体文件中，最后这个字体文件最大的一种格式也才50kb。
    p 好了，最后稍稍介绍一下自己。
    p 我是一个前端（废话，不是前端能做出这样的页面嘛），就技术而言呢，虽然不是大牛，但是还算是一个小牛吧。最近养成了写博客的习惯（其实是想记录技术的同时给自己加加分^_^），看着初入的同行私信问问题，心里还是有不少满足感的。
    p 本站目前都是前端页面，准备是用node.js 做后端，之前也用过node.js 开发，不过部署都是后端同事在干，自己还没弄过，得学学了。
    P 还有，本站是响应式的哦！不信？你拖动窗口大小看看，或者切换到手机或电脑看。
    p 其实IE也是支持的，不过用了elementUI，其中的el-image 组件的懒加载IE不支持，我找了一下发现是elementUI的bug，已经在element这个开源项目上提了issuse 和 Pull request，不知道什么下个版本能不能修复。
    p 还有个问题就是因为 IE不支持 object-fit 样式，用了其他hack样式，在.el-image 这个className上用非固定高度（min-height、max-height），hack的样式就会失效，有兴趣的同学可以去尝试一下。
    P 果然是人开发的就有bugヽ(￣▽￣)ﾉ
    p 2020-04-23 更新
    p 注：添加jenkins 自动部署更改
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
