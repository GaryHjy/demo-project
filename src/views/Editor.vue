<template>
  <div class="editor">
    <image-canvas />
  </div>
</template>

<script>
import ImageCanvas from "@/components/image-canvas";

export default {
  name: "Editor",
  components: {
    ImageCanvas
  }
};
</script>

<style lang="less" scoped>
.editor {
  height: 100%;
  background-color: #fff;
}
</style>
