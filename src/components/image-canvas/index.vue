<template>
  <div class="image-canvas">
    <div class="image-canvas__origin" ref="clipContainer">
      <canvas
        class="image-canvas__origin--container"
        ref="originCanvas"
      ></canvas>
      <div class="select-box" :style="clipBoxStyle">
        <div class="action-button-group" v-if="showClipButton">
          <span
            :class="`action-button ${button.type}`"
            v-for="(button, index) in actionButtons"
            :key="index"
            @click="button.onClick"
          >
            {{ button.text }}
          </span>
        </div>
      </div>
    </div>
    <canvas
      class="image-canvas__preview"
      ref="clipCanvas"
      width="300"
      height="300"
    ></canvas>
  </div>
</template>

<script>
const url =
  "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1599362886&t=97de25ce80e95416306861804cddc936";

export default {
  name: "ImageCanvas",
  data() {
    return {
      clipContainer: null,
      clipBoxStyle: {
        left: "initial",
        top: "initial",
        right: "initial",
        bottom: "initial",
        width: 0,
        height: 0
      },
      originData: {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      },
      clipBoxPosition: null,
      showClipButton: false,
      flag: false,
      actionButtons: [
        {
          text: "取消",
          type: "error",
          onClick: () => {
            this.handleReset();
          }
        },
        {
          text: "确定",
          type: "success",
          onClick: () => {
            this.handleClip();
          }
        }
      ]
    };
  },
  mounted() {
    this.initOrginCanvas();
    this.initClipEvent();
  },
  methods: {
    // 初始化事件
    initClipEvent() {
      const clipContainer = this.$refs.clipContainer;
      this.clipContainer = clipContainer;
      this.clipBoxPosition = clipContainer.getBoundingClientRect();
      clipContainer.addEventListener("mousedown", this.handleMousedown);
      clipContainer.addEventListener("mousemove", this.hanldeMousemove);
      clipContainer.addEventListener("mouseup", this.handleMouseup);
    },
    // 初始化画布
    initOrginCanvas() {
      const originCanvas = this.$refs.originCanvas;
      const ctx = originCanvas.getContext("2d");
      this.originCtx = ctx;
      const originImage = new Image();
      originImage.src = url;
      originImage.crossOrigin = "";
      originImage.onload = function() {
        const { width, height } = this;
        originCanvas.width = width;
        originCanvas.height = height;
        ctx.drawImage(originImage, 0, 0, width, height);
      };
    },
    // 鼠标点击事件
    handleMousedown(e) {
      this.flag = true;
      const { left, top } = this.clipBoxPosition;
      const originLeft = e.clientX - left;
      const originTop = e.clientY - top;
      this.originData.left = originLeft;
      this.originData.top = originTop;
      this.clipBoxStyle.left = originLeft + "px";
      this.clipBoxStyle.top = originTop + "px";
    },
    // 鼠标移动事件
    hanldeMousemove(e) {
      if (!this.flag) return;
      const { left, top } = this.clipBoxPosition;
      const { left: originLeft, top: originTop } = this.originData;
      let width = 0;
      let height = 0;
      if (e.clientX < left) {
        //
      } else {
        width = e.clientX - left - originLeft;
      }
      if (e.clientY < originTop) {
        //
      } else {
        height = e.clientY - top - originTop;
      }
      this.originData.width = width;
      this.originData.height = height;
      this.clipBoxStyle.width = width + "px";
      this.clipBoxStyle.height = height + "px";
    },
    // 鼠标弹起
    handleMouseup() {
      this.flag = false;
      this.clipContainer.removeEventListener("mousedown", this.handleMousedown);
      this.clipContainer.removeEventListener("mousemove", this.hanldeMousemove);
      this.showClipButton = true;
    },
    // 重置
    handleReset() {
      this.showClipButton = false;
      this.clipBoxStyle = {
        left: "initial",
        top: "initial",
        right: "initial",
        bottom: "initial",
        width: 0,
        height: 0
      };
      this.originData = {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      };
      this.initClipEvent();
    },
    // 截取
    handleClip() {
      const { left: x, top: y, width, height } = this.originData;
      const clipImageUrl = this.originCtx.getImageData(x, y, width, height);
      const clipCanvas = this.$refs.clipCanvas;
      const ctx = clipCanvas.getContext("2d");
      ctx.clearRect(0, 0, 300, 300);  
      ctx.putImageData(clipImageUrl, 0, 0, 0, 0, width, height);
      this.handleReset();
    }
  }
};
</script>

<style lang="less" scoped>
.image-canvas {
  background-color: #ccc;
  height: 100%;
  padding: 10px;

  &__origin {
    background-color: #fff;
    float: left;
    position: relative;

    .select-box {
      border: 2px dotted #eee;
      position: absolute;

      .action-button-group {
        position: absolute;
        right: -2px;
        bottom: -20px;
      }

      .action-button {
        padding: 2px 4px;
        font-size: 12px;
        color: #fff;
        border: 1px solid #fff;
        box-sizing: border-box;
        cursor: pointer;
        user-select: none;

        &:hover {
          color: #eee;
        }

        &.success {
          background-color: green;
        }

        &.error {
          background-color: red;
        }
      }
    }
  }

  &__preview {
    background-color: #fff;
    margin-left: 10px;
  }
}
</style>
