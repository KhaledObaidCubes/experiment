<template>
  <main>
    <DraggableItem :node="controller.root" />
  </main>
</template>

<script setup lang="ts">
import { defineAsyncComponent, provide } from "vue";
import { DragDropController } from "./domain/drag-controller/def";
import type { DraggableNode } from "./domain/drag-controller/meta";

// Initial root item
const rootNode: DraggableNode = {
  id: "root",
  label: "Root Item",
  children: [
    { id: "a", label: "Item A", children: [] },
    {
      id: "b",
      label: "Item B",
      children: [
        { id: "d", label: "Item D", children: [] },
        {
          id: "e",
          label: "Item E",
          children: [
            { id: "g", label: "Item G", children: [] },
            { id: "h", label: "Item H", children: [] },
            { id: "i", label: "Item I", children: [] },
          ],
        },
        { id: "f", label: "Item F", children: [] },
      ],
    },
    { id: "c", label: "Item C", children: [] },
  ],
};

const controller = new DragDropController(rootNode);
provide("dragDropController", controller);

const DraggableItem = defineAsyncComponent(
  () => import("./components/draggable.vue")
);
</script>

<style scoped>
main {
  padding: 30px;
}
</style>
