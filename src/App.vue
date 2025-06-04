<script setup lang="ts">
import dragDrop from "./components/dragDrop.vue";
import { DragDropController } from "./domain/drag-controller/def";

window.onload = () => {
  const controller = new DragDropController({
    draggableSelector: ".draggableElement",
    droppableSelector: ".droppableArea",
    dropTypeAttribute: "data-drop_type",
  });

  controller.init();
};
</script>

<template>
  <drag-drop />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
