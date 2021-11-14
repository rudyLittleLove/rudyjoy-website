<template lang="pug">
  div.coordinate-acquisition-wraper
    Spin( fix v-if="isLoading")
    .filter-wrap( :class="{expand: isExpand}")
      i.el-icon( :class="isExpand ? 'el-icon-arrow-left':'el-icon-arrow-right'" @click="isExpand = !isExpand")
      el-form( :model="formData" ref="form" size="small" label-width="100" class="custom-scrollbar")
        el-form-item( label="选择定位位置")
          //- el-input( type="text" v-model="formData.keyword" placeholder="请输入位置")
          el-input( type="text" v-model="formData.keyword" @keyup.native.enter="posSearchHandle" placeholder="请输入位置" clearable @on-clear="clearHandle")
          el-button( icon="el-icon-search" type="primary" @click="posSearchHandle")
        el-form-item( :label="`经纬度${i+1}`" v-for="(item, i) in formData.coordinates" :key="i" :rules="rules.coordinate" :prop="`coordinates.${i}`")
          el-input( type="text" v-model="formData.coordinates[i]" icon="md-navigate" placeholder="请输入经纬度" :class="{active: active === i}")
            i( slot="suffix" class="el-input__icon el-icon-s-promotion" @click="activeHandle(i)")
          el-button( icon="el-icon-close" type="danger" v-if="formData.coordinates.length > 2" @click="removePointHandle(i)")
          el-button( icon="el-icon-plus" type="primary" v-if="formData.coordinates.length < 15" @click="formData.coordinates.splice(i + 1, 0, ''); active = i+1")
        //- el-form-item( label="经纬度")
        //-   el-input( type="text" v-model="formData.start" icon="md-navigate" placeholder="请输入经纬度" on-click="active = 0")
        //- el-form-item( label="输入截止经纬度")
        //-   el-input( type="text" v-model="formData.end" icon="md-navigate" placeholder="请输入经纬度")
        el-button( type="primary" @click="renderLine") 查询路线
        el-form-item( label="经纬度段坐标")
          el-input( type="textarea" v-model="sectionStr" readonly :rows="2")
        el-form-item( label="返回路线坐标")
          el-input( type="textarea" v-model="formData.result" readonly :rows="3")
        p 可在控制台查看完整路线对象
    .style-change
      span 地图主题：
      el-select( v-model="formData.style" @on-change="setMapStyle")
        el-option( v-for="(item, i) in styleOptions" :label="item.label" :value="item.value")
    .search-result.custom-scrollbar( id="search-result" ref="searchResult")
    div.coordinate-acquisition( id="coordinate-acquisition" :class="{active: active !== -1}")
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'CoordinateAcquisition',
  data() {
    return {
      isExpand: true,
      isLoading: false,
      formData: {
        keyword: '',
        coordinates: ['116.303843,39.983412', '116.407012,39.992093'],
        start: '116.303843,39.983412',
        end: '116.407012,39.992093',
        result: '',
        style: 'light'
      },
      styleOptions: [
        {
          label: '幻影黑',
          value: 'dark'
        },
        {
          label: '月光银',
          value: 'light'
        },
        {
          label: '远山黛',
          value: 'whitesmoke'
        },
        {
          label: '草色青',
          value: 'fresh'
        },
        {
          label: '雅士灰',
          value: 'grey'
        },
        {
          label: '涂鸦',
          value: 'graffiti'
        },
        {
          label: '马卡龙',
          value: 'macaron'
        },
        {
          label: '靛青蓝',
          value: 'blue'
        },
        {
          label: '极夜蓝',
          value: 'darkblue'
        },
        {
          label: '酱籽',
          value: 'wine'
        }
      ],
      aMap: null,
      route: null,
      placeSearch: null,
      active: -1,
      rules: {
        coordinate: [
          {
            required: true,
            message: '请输入经纬度'
          }
        ]
      },
      timer: null
    }
  },
  computed: {
    sectionStr() {
      return JSON.stringify(this.formData.coordinates.map(item => item.split(',').map(v => +v)))
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    clearHandle() {
      this.$refs.searchResult.innerHTML = ''
    },
    posSearchHandle() {
      // 关键字查询
      this.formData.keyword && this.placeSearch.search(this.formData.keyword)
    },
    setMapStyle() {
      let styleName = 'amap://styles/' + this.formData.style
      this.aMap.setMapStyle(styleName)

      // this.aMap.setZoom(13)
    },
    activeHandle(i) {
      if (this.active === i) {
        this.active = -1
      } else {
        this.active = i
      }
    },
    removePointHandle(i) {
      // clearTimeout(this.timer)
      this.formData.coordinates.splice(i, 1)

      // this.timer = setTimeout(() => {
      //   this.renderLine()
      // }, 300)
    },
    initMap() {
      AMapLoader.load({
        key: '523c9fc07c690089f319101a72c2c13e',
        version: '2.0Beta',
        // 'key': '	523c9fc07c690089f319101a72c2c13e', // 申请好的Web端开发者Key，首次调用 load 时必填
        // 'version': '2.0Beta' // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.DragRoute', 'AMap.PlaceSearch'] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        // 'AMapUI': { // 是否加载 AMapUI，缺省不加载
        //   'version': '1.1', // AMapUI 缺省 1.1
        //   'plugins': [] // 需要加载的 AMapUI ui插件
        // },
        // 'Loca': { // 是否加载 Loca， 缺省不加载
        //   'version': '1.3.2' // Loca 版本，缺省 1.3.2
        // }
      })
        .then(AMap => {
          this.aMap = new AMap.Map('coordinate-acquisition', {
            zoom: 5,
            mapStyle: `amap://styles/${this.formData.style}`
          })

          // 构造地点查询类
          this.placeSearch = new window.AMap.PlaceSearch({
            pageSize: 5, // 单页显示结果条数
            pageIndex: 1, // 页码
            // city: '010', // 兴趣点城市
            // citylimit: true, // 是否强制限制在设置的城市内搜索
            map: this.aMap, // 展现结果的地图实例
            panel: 'search-result', // 结果列表将在此容器中进行展示。
            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
          })

          this.placeSearch.on('markerClick', params => {
            this.aMap.setZoom(15)
          })

          this.aMap.on('click', e => {
            if (this.active !== -1) {
              this.$set(this.formData.coordinates, this.active, `${e.lnglat.lng},${e.lnglat.lat}`)
              // this.$nextTick(() => {
              //   this.renderLine()
              // })
            }
          })
        })
        .catch(e => {
          console.log(e)
        })
    },
    renderLine(h) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isLoading = true
          if (this.route) {
            this.route.destroy()
          }
          // path 是驾车导航的起、途径和终点，最多支持16个途经点
          let path = this.formData.coordinates.map(v => v.split(','))
          // let path = []

          // path.push(this.formData.start.split(','))
          // path.push([116.321354, 39.896436])
          // path.push(this.formData.end.split(','))

          this.route = new window.AMap.DragRoute(this.aMap, path, window.AMap.DrivingPolicy.LEAST_DISTANCE)
          // 查询导航路径并开启拖拽导航
          this.route.search()

          this.route.on('complete', ({ data, target }) => {
            this.isLoading = false
            this.active = -1
            this.formData.coordinates = target._path.map(v => `${v.lng},${v.lat}`)

            let arr = this.route.getRoute()
            let posArr = arr.map(item => [item.lat, item.lng])
            this.formData.result = JSON.stringify(posArr)

            // this.$Message.success('可在控制台查看完整路线对象')
            let css = 'font-size: 20px; font-weight: bold;font-family: 微软雅黑; color: #fff; text-shadow: 0 0 3px rgba(0, 0, 0, 1);'
            console.clear()
            console.log('%c行车路线对象  ↓', css)
            console.log(data)
            console.log('%c行车路线数组  ↓', css)
            console.log(arr)
            console.log('%c行车路线经纬度  ↓', css)
            console.log(posArr)
            console.log('%c行车路线经纬度JSON串  ↓', css)
            console.log(this.formData.result)
          })

          this.route.on('addway', ({ type, lnglat, target }) => {
            this.active = -1
            this.formData.coordinates = target._path.map(v => `${v.lng},${v.lat}`)
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.coordinate-acquisition-wraper {
  height: 100%;
  position: relative;
  font-family: "微软雅黑";
  .style-change span {
    font-size: 14px;
    // color: #ffffff;
    font-weight: bold;
    font-family: "微软雅黑";
  }
  .filter-wrap {
    border-right: 1px solid #dddddd;
    position: absolute;
    z-index: 7;
    height: 100%;
    // left: 0;
    // right: 0;
    background-color: #ffffff;
    transition: left 0.3s;
    padding: 10px 0 10px 10px;
    width: 397px;
    box-sizing: border-box;
    left: -397px;
    &.expand {
      left: 0;
    }
    > .el-icon {
      cursor: pointer;
      font-size: 18px;
      position: absolute;
      right: -17px;
      height: 60px;
      line-height: 60px;
      width: 16px;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
      top: calc(~'50% - 30px');
      background-color: #ffffff;
      border-radius: 0 5px 5px 0;
    }
  }
  .el-form {
    height: 100%;
    overflow: auto;
    p {
      color: #888888;
      text-shadow: 0 0 1px #ffffff;
      padding-left: 100px;
    }
    > .el-button {
      display: block;
      margin-left: 212px;
      margin-bottom: 10px;
    }
    .el-form-item {
      margin-bottom: 20px;
      padding-right: 10px;
      .el-input {
        &.active {
          /deep/ .el-icon-s-promotion {
            color #409eff;
          }
        }
      }
      /deep/ .el-icon-s-promotion {
        cursor: pointer;
      }
      /deep/ .el-form-item-error-tip {
        position: static;
      }
      /deep/ .el-form-item__content {
        display: flex;
      }
      .el-button {
        margin-left: 3px;
      }
      // /deep/ textarea {
      //   width: 250px;
      // }
    }
  }
  .coordinate-acquisition {
    height: 100%;
    &.active {
      /deep/ .amap-layer {
        cursor: crosshair !important;
      }
    }
    /deep/ .amap-copyright,
    /deep/ .amap-logo {
      display: none !important;
    }
  }
  .style-change {
    position: absolute;
    z-index: 7;
    right: 10px;
    top: 10px;
    .el-select {
      width: 120px;
    }
  }
  .search-result {
    position: absolute;
    z-index: 7;
    top: 50px;
    right: 10px;
    max-height: calc(~'100% - 70px');
    overflow: auto;
  }
}
</style>
