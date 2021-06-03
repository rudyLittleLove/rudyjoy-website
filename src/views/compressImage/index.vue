<template lang="pug">
  div.wrapper( v-loading="isCompress" element-loading-text="图片压缩中...")
    el-upload(
      class="upload-demo"
      ref="upload"
      action=""
      list-type="picture-card"
      accept="image/*"
      :file-list="fileList"
      :auto-upload="false"
      :on-change="changeHandle"
      :on-remove="removeHandle"
      )
        el-button( slot="trigger" size="small" type="primary") 选择待压缩图片
        div( slot="tip" class="el-upload__tip") 图片将压缩为 image/jpeg 格式
    el-form( size="mini")
      el-form-item( label="图片质量")
        el-input-number( v-model="quality" controls-position="right" :min="0" :max="1" :step="0.1" placeholder="请输入0-1之间的数值")
        div 请输入0-1之间的数值，如果超出取值范围，将会使用默认值 0.92。
      el-form-item( label="图片宽度")
        el-input( v-model="width" placeholder="请输入合理像素数值")
        div 不合理值将使用图片默认宽度，只设置宽度时高度将按比例缩放
      el-form-item( label="图片高度")
        el-input( v-model="height" placeholder="请输入合理像素数值")
        div 不合理值将使用图片默认高度
    div( style="clear: both; color: #000000; ") 点击图片查看，左右切换对比原图
    ul( class="img-item-ul")
      li( v-for="(item,i) in compressImageList" :key="i" class="img-item")
        el-image( :src="item.url" :preview-src-list="[item.url, fileList[i].url]")
        div.info-text 原始大小：
          span {{item.originSize}}
        div.info-text 压缩质量：
          span {{item.quality}}
        div.info-text 压缩后大小：
          span {{item.size}}
        el-button( type="primary" icon="el-icon-download" circle @click="downloadHandle(item)")
        el-button( type="danger" icon="el-icon-delete" circle @click="removeHandle2(i)")
</template>

<script>
import { bytesToSize } from '@/libs/util.js'

export default {
  name: 'GetImageColor',
  data() {
    return {
      fileList: [],
      compressImageList: [],
      isCompress: false,
      quality: 0.2,
      qualityOptions: [],
      width: '',
      height: ''
    }
  },
  methods: {
    changeHandle(file, fileList) {
      this.fileList = fileList
      this.isCompress = true
      this.photoCompress(
        file.raw,
        {
          quality: this.quality,
          width: ~~this.width,
          height: ~~this.height
        },
        base64Codes => {
          let newFile = this.convertBase64UrlToFile(base64Codes, file.name)

          this.compressImageList.push({
            ...file,
            originSize: bytesToSize(file.size),
            size: bytesToSize(newFile.size),
            url: URL.createObjectURL(newFile),
            quality: this.quality
          })

          this.isCompress = false
        }
      )
    },
    removeHandle(file, fileList) {
      this.fileList = fileList
    },
    removeHandle2(index) {
      this.fileList.splice(index, 1)
      this.compressImageList.splice(index, 1)
    },
    downloadHandle(item) {
      let a = document.createElement('a')

      a.setAttribute('download', '')
      a.setAttribute('href', item.url)

      a.click()
    },
    photoCompress(file, compressedOption, callback) {
      let fileReader = new FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onload = () => {
        let fileResult = fileReader.result
        this.canvasDataURL(fileResult, compressedOption, callback)
      }
    },
    canvasDataURL(path, compressedOption, callback) {
      let img = new Image()
      img.src = path
      img.onload = () => {
        // 设置压缩后图片规格
        let quality = compressedOption.quality
        let w = compressedOption.width || img.width

        // 判断只存在宽度时，根据比例设置高度
        let h = compressedOption.height || (compressedOption.width ? compressedOption.width / (img.width / img.height) : '') || img.height

        // 生成canvas
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')

        // 设置宽高并渲染图片
        canvas.width = w
        canvas.height = h
        ctx.drawImage(img, 0, 0, w, h)

        let base64 = canvas.toDataURL('image/jpeg', quality)
        // https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL

        // 回调函数返回base64的值
        callback(base64)
      }
    },
    convertBase64UrlToFile(urlData, filename) {
      let arr = urlData.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]

      let bstr = atob(arr[1])
      // https://www.runoob.com/jsref/met-win-atob.html
      let n = bstr.length

      let u8arr = new Uint8Array(n)
      // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
      }

      // return new Blob([u8arr], { type: mime })
      // https://developer.mozilla.org/zh-CN/docs/Web/API/Blob

      return new File([u8arr], filename, { type: mime })
      // https://developer.mozilla.org/zh-CN/docs/Web/API/File
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper {
  width: 1000px;
  margin: auto;
  padding-top: 50px;
  padding-bottom: 50px;
  .upload-demo {
    margin: auto;
    float: left;
    >>> .el-upload-list {
      display: none;
    }
  }
  .el-form {
    float: left;
    margin-left: 100px;
    .el-input {
      width: 130px;
    }
    .el-form-item {
      margin-bottom: 10px;
    }
  }
  .img-item-ul {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
  }
  .img-item {
    margin-bottom: 20px;
    margin-right: 20px;
    padding: 10px;
    margin-top: 20px;
    border: 1px solid #cccccc;
    width: 20%;
    height: 200px;
    float: left;
    position: relative;
    &:hover {
      .el-button {
        opacity: 1;
      }
    }
    .el-button {
      float: right;
      position: absolute;
      right: 10px;
      top: 10px;
      opacity: 0;
      transition: all .2s;
      &.el-button--danger {
        left: 0;
      }
    }
    .info-text {
      line-height: 20px;
      span {
        color: #409EFF;
      }
    }
    .el-image {
      width: 100%;
      > /deep/ img {
        height: 140px;
        width: 100%;
      }
    }
    h4 {
      margin: 10px 0;
    }
    // img {
    //   box-shadow: 0 0 3px rgba(0, 0, 0, .2);
    //   object-fit: scale-down;
    // }
    .rect {
      display: inline-block;
      margin-right: 20px;
      width: 30px;
      height: 30px;
    }
  }
}
</style>
