<template>
  <Canvas :height="100" :width="100" :pixel-size="5" />
</template>

<script lang="ts">
import { providerKey } from "../injectionKeys";
import { defineComponent, inject } from "vue";
import Canvas from "@/components/Canvas.vue";

export default defineComponent({
  name: "Home",
  setup() {
    let provider = inject(providerKey);
    return { provider };
  },
  methods: {
    cli() {
      this.provider?.listAccounts().then((l) => console.log(l));
    },
  },
  components: { Canvas },
});
</script>
