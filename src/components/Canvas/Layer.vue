<template>
  <canvas
    ref="canvas"
    :height="height * pixelSize"
    :width="width * pixelSize"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, provide, ref } from "vue";
import { canvasKey } from "@/injectionKeys";
import Pixel from "@/components/Canvas/Pixel.vue";

export default defineComponent({
  name: "Layer",
  props: {
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    pixelSize: { type: Number, required: true },
    pixels: { type: Array as PropType<string[]>, required: true },
  },
  methods: {
    clearCanvas() {
      if (!(this.$refs.canvas instanceof HTMLCanvasElement)) return;
      const context = this.$refs.canvas.getContext("2d")!;
      context.save();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(
        0,
        0,
        this.$refs.canvas.width,
        this.$refs.canvas.height
      );
      context.restore();
    },
    draw(color: string, x: number, y: number, w: number, h: number) {
      if (!(this.$refs.canvas instanceof HTMLCanvasElement)) return;
      const context = this.$refs.canvas.getContext("2d")!;

      context.fillStyle = color;
      context.fillRect(x, y, w, h);
      console.log(color, x, y, w, h);
    },
  },
  watch: {
    pixels: {
      deep: true,
      handler: function (newPixel: string[], oldPixel: string[]) {
        this.clearCanvas();
        newPixel.forEach((p, i) => {
          if (p.localeCompare(oldPixel[i]) != 0) return;
          const y = ((i / this.width) | 0) * this.pixelSize;
          const x = (i % this.width) * this.pixelSize;
          this.draw(p, x, y, this.pixelSize, this.pixelSize);
        });
      },
    },
  },
  data() {
    return {};
  },
});
</script>

<style scoped></style>
