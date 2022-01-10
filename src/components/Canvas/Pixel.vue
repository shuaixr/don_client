<template>
  <div :style="pixelStyle()"></div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Pixel",
  props: {
    size: Number,
    color: String,
  },
  methods: {
    pixelStyle() {
      return {
        height: this.size + "px",
        width: this.size + "px",
        float: "left",
        backgroundColor: this.color,
      };
    },
  },
  data() {
    return {
      PixelStyle: {
        height: this.size + "px",
        width: this.size + "px",
        float: "left",
        backgroundColor: this.color,
      },
    };
  },
});
</script>

<style scoped></style>
