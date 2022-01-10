<template>
  <div class="position-relative">
    <canvas
      class="position-absolute"
      style="z-index: -2"
      :height="height * pixelSize"
      :width="width * pixelSize"
      ref="cacheCanvas"
    />
    <canvas
      :onmousedown="onMouseDown"
      :onmouseup="onMouseUp"
      :onmouseleave="clearPenCanvas"
      :onmousemove="onMouseMove"
      class="position-absolute"
      style="z-index: -1"
      :height="height * pixelSize"
      :width="width * pixelSize"
      ref="penCanvas"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Canvas",
  data() {
    return {
      mouseDown: false,
      mouseEnter: false,
      height: 100,
      width: 100,
      pixelSize: 5,
    };
  },
  methods: {
    onMouseDown() {
      this.mouseDown = true;
    },
    onMouseUp() {
      this.mouseDown = false;
    },
    clearPenCanvas() {
      if (!(this.$refs.penCanvas instanceof HTMLCanvasElement)) return;
      const context = this.$refs.penCanvas.getContext("2d");
      if (context == null) return;
      context.clearRect(
        0,
        0,
        this.$refs.penCanvas.width,
        this.$refs.penCanvas.height
      );
    },
    onMouseMove(e: MouseEvent) {
      const penContext = (this.$refs.penCanvas as HTMLCanvasElement).getContext(
        "2d"
      );
      if (penContext == null) return;
      this.clearPenCanvas();
      const bounds = (
        e.currentTarget as HTMLCanvasElement
      ).getBoundingClientRect();
      let x = e.clientX - bounds.left;
      let y = e.clientY - bounds.top;
      x = x - (x % this.pixelSize);
      y = y - (y % this.pixelSize);
      /*
      x = (x - (x % (20 * pzTransformScale))) / pzTransformScale;
      y = (y - (y % (20 * pzTransformScale))) / pzTransformScale;
       */
      penContext.fillStyle = "#FF000050";
      penContext.fillRect(x, y, this.pixelSize, this.pixelSize);
      /*
            this.penLayerPixel[
              ((y / this.pixelSize) | 0) * this.width + ((x / this.pixelSize) | 0)
            ] = "#000000FF";
       },*/
      if (!this.mouseDown) return;
      const cacheContext = (
        this.$refs.cacheCanvas as HTMLCanvasElement
      ).getContext("2d");
      if (cacheContext == null) return;

      cacheContext.fillStyle = "#000000";
      cacheContext.fillRect(x, y, this.pixelSize, this.pixelSize);
    },
  },
});
</script>

<style scoped></style>
