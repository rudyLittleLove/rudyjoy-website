<template lang="pug">
  .statistic-analysis-wrapper
    .filter-wrapper
      Button( type="primary" @click="renderAllNodesAndDownload") 下载
    .content-wrapper
      .header-info-box.clearfix( :class="{expand: isHeaderExpand}")
        .inner-wrap
          .tip-title
            div.current 隧道
            div 简介
          .tip-info-content
            div.tunnel-name {{tunnelName}}
            div.description( ref="description") {{tunnelIntroduction}}
            span.expand-btn( v-if="descriptionWidth > descriptionWrapWidth" @click="isHeaderExpand = !isHeaderExpand") {{isHeaderExpand ? '收起':'详情'}}
              //- Icon( type="ios-arrow-down")
      .table-wrapper
        .canvas-container( ref="canvasWrap")
        div.dark-scrollbar.vertical( ref="scrollY" @scroll="scrollHandle")
          div( :style="{height: `${tableHeight}px`, width: '1px'}")
        div.dark-scrollbar.horizontal( ref="scrollX" @scroll="scrollXHandle")
          div( :style="{width: `${tableWidth}px`, height: '1px'}")
      template( v-if="current && current.tooltip")
        div.tooltip-custom( :style="tooltipStyle") {{(current || {}).tooltip}}
        div.line-tip( :style="lineStyle" )
</template>

<script>
import render from './render.js'
// import { projectSelects } from '@api/civil-eng-inspect/daily-inspection/patrol-plan'
// import { getProjectTunnelTree, getTunnelTrunks } from '@/api/civil-eng-inspect/tunnel-work/image-management'
// import { getTunnelImaStatistics } from '@/api/database/civilStructure/tunnel.js'

export default {
  mixins: [render],
  data() {
    return {
      loading: false,
      isHeaderExpand: false,
      tunnelName: '',
      tunnelIntroduction: '',
      descriptionWrapWidth: 0,
      descriptionWidth: 0,

      tooltipStyle: {},
      lineStyle: {},
      filterData: {
        id: '',
        projectId: '',
        tunnelId: '',
        tunnelTrunkId: ''
      },
      projectOptions: [],
      tunnelOptions: [],
      tunnelTrunkOptions: []
    }
  },
  watch: {
    current(val, old) {
      old && this.render(old)
      if (val) {
        this.canvasWrap.style.cursor = 'pointer'
        this.render(val)
      } else {
        this.$refs.canvasWrap.style.cursor = ''
      }

      this.calcTooltipStyle()
    }
  },
  mounted() {
    // this.getProjectTunnelTree()
  },
  methods: {
    searchHandle() {
      if (this.filterData.projectId && this.filterData.tunnelId && this.filterData.tunnelTrunkId) {
        this.getTunnelImaStatistics()
      }
    },
    // 获取项目下拉候选
    getProjectTunnelTree() {
      // this.loading = true
      // getProjectTunnelTree().then(({ code, data, message }) => {
      //   this.loading = false
      //   if (code === this.success_code) {
      //     this.projectOptions = data || []
      //     if (data.length) {
      //       this.filterData.id = data[0].id
      //       this.changeProjectHandle(this.filterData.id)
      //     }
      //   } else {
      //     this.$Message.error(message)
      //   }
      // })
    },
    changeProjectHandle(val) {
      this.filterData.tunnelId = ''
      let node = this.projectOptions.find(v => v.id === val)

      this.tunnelOptions = node.projectTunnelImaVoList || []

      if (this.tunnelOptions.length) {
        let active = this.tunnelOptions[0]
        this.filterData.projectOptions = active.projectId
        this.filterData.tunnelId = active.tunnelId

        this.tunnelName = active.tunnelName

        this.getTunnelTrunks()
      }
    },
    changeTunnelHandle(val) {
      this.filterData.tunnelTrunkId = ''

      let node = this.tunnelOptions.find(v => v.tunnelId === val)

      if (node) {
        this.filterData.projectOptions = node.projectId
      }
      this.getTunnelTrunks()
    },

    // 查询左右洞
    getTunnelTrunks() {
      // getTunnelTrunks(this.filterData.tunnelId).then(({ code, data, message }) => {
      //   if (code === this.success_code) {
      //     this.tunnelTrunkOptions = data
      //     if (data.length) {
      //       this.filterData.tunnelTrunkId = data[0].paramTunnelTrunk
      //       this.getTunnelImaStatistics()
      //     }
      //   } else {
      //     this.$Message.error(message)
      //   }
      // })
    },

    // 获取隧道影像数据
    getTunnelImaStatistics() {
      // getTunnelImaStatistics(this.filterData.projectOptions, this.filterData.tunnelId, this.filterData.tunnelTrunkId).then(({ code, data, message }) => {
      //   if (code === this.success_code) {
      //     console.log('施工进度：', data.constructionProgress)
      //     console.log('质量检查：', data.qualityInspection)
      //     console.log('竖井、斜井：', data.slopeAndShaftList)
      //     console.log('工序影像：', data.processIma)
      //     console.log('围岩级别', data.designInfoList)
      //     // -48 容器右侧 padding
      //     this.descriptionWrapWidth = this.$refs.description.getBoundingClientRect().width - 48
      //     this.descriptionWidth = this.getTextWidth(data.tunnelIntroduction, 'font-size: 15px').width
      //     this.tunnelIntroduction = data.tunnelIntroduction
      //     this.startPileNo = data.startPileNo >>> 0
      //     this.endPileNo = data.endPileNo >>> 0
      //     this.startPileStr = `进口 ${data.startPileStr}`
      //     this.endPileStr = `出口 ${data.endPileStr}`
      //     this.formatData()
      //     this.canvasWrap ? this.renderAll() : this.init()
      //   }
      // })
    },

    formatData() {
      this.data = JSON.parse(JSON.stringify(this.rootData))
      this.data[1].data = JSON.parse('[{"start":0,"end":100,"level":0},{"start":100,"end":200,"level":3},{"start":200,"end":350,"level":2},{"start":370,"end":480,"level":4},{"start":480,"end":810,"level":5}]')
      this.data.push(...JSON.parse(this.fixedData))
    },

    scrollHandle(e) {
      this.translateY = -e.target.scrollTop
      this.calcContentXY()
      this.renderRule()
      this.renderNodes()
    },
    scrollXHandle(e) {
      this.translateX = -e.target.scrollLeft
      this.calcContentXY()
      this.renderRule()
      this.renderNodes()
    },
    calcTooltipStyle() {
      if (!this.current) return {}
      let x = 0
      let y = 0
      let top = 0
      let left = 0
      this.lineStyle = { display: 'none' }
      if (this.current.placement === 'rule') {
        let w = this.getTextWidth(this.current.tooltip, 'padding: 5px; font-size: 14px;').width / 2

        ;[left, top] = this.current.tooltipXY

        this.lineStyle = {
          left: left + this.position.x + 'px',
          top: this.position.y + 'px',
          height: this.tableHeight + 'px'
        }

        left = left + this.position.x - w
        top += this.position.y - 30
      } else {
        ;[, y] = this.current.crd[0]
        ;[x] = this.current.crd[1]

        let offset = 2

        y += this.translateY
        x += this.translateX

        left = this.position.x + x + offset
        top = this.position.y + y + 10
      }

      this.tooltipStyle = {
        left: left + 'px',
        top: top + 'px'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './render.styl';
.statistic-analysis-wrapper {
  height: 100%;
  .filter-wrapper {
    padding-top: 13px;
    height: 60px;
    border-bottom: 1px solid #D5DDE4;
    box-sizing: border-box;
    .ivu-form-item {
      margin-bottom: 10px;
      width: 230px;
    }
    .ivu-btn {
      margin-right: 10px;
    }
  }
  .content-wrapper {
    height: calc(100% - 60px);
    overflow: hidden;
    // overflow: auto;
  }
  .header-info-box {
    height: 100px;
    position: relative;
    z-index: 1;
    .inner-wrap {
      display: flex;
      background-color: #fff;
      padding: 20px 20px 10px;
    }
    .tip-title {
      width: 44px;
      margin-right: 20px;
      font-size: 14px;
      flex-shrink: 0;
      > div {
        height: 24px;
        text-align: center;
        font-weight: bold;
        color: #2D8CF0;
        border: 1px solid #D3E1FE;
        margin-bottom: -1px;
      }
      .current {
        color: #ffffff;
        background-color: #2D8CF0;
      }
    }
    .tip-info-content {
      flex-shrink: 0;
      width: calc(100% - 64px);
      .tunnel-name {
        height: 27px;
        margin-top: -3px;
        font-size: 18px;
        font-weight: bold;
      }
      .description {
        height: 20px;
        overflow: hidden;
        padding-right: 48px;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 15px;
        color: #555555;
        margin-top: 10px;
      }
    }
    .expand-btn {
      position: relative;
      margin-top: -20px;
      float: right;
      font-size: 15px;
      color: #2D8CF0;
      cursor: pointer;
      .ivu-icon-ios-arrow-down {
        float: right;
        margin-top: 1px;
        text-shadow: 0 5px 0;
      }
    }
    &.expand {
      .inner-wrap {
        box-shadow: 0 0 13px 0 rgba( 0, 0, 0, .1);
      }
      .tip-info-content {
        .description {
          height: auto;
          overflow: visible;
          white-space: normal;
          padding-right: 0;
        }
      }
      .ivu-icon-ios-arrow-down  {
        transform: rotate(180deg);
        margin-top: 6px;
      }
    }
  }
  .table-wrapper {
    position: relative;
    height: calc(100% - 100px);
    margin: 0 20px;
    padding-bottom: 20px;
    box-sizing: border-box;
    .dark-scrollbar {
      position: absolute;
      &.vertical {
        top: 0;
        right: -12px;
        bottom: 20px;
        overflow-y: auto;
      }
      &.horizontal {
        left: 0;
        right: 0;
        bottom: 5px;
        overflow-x: auto;
      }
    }
  }

  .tooltip-custom {
    position: fixed;
    z-index: 1;
    background-color: rgba(47, 59, 85, .8);
    color: #ffffff;
    font-size: 14px;
    padding: 5px;
    border-radius: 4px;
    pointer-events: none;
  }

  .line-tip {
    position: fixed;
    z-index: 1;
    pointer-events: none;
    border-right: 1px dotted #bbbbbb;
  }
}
</style>
