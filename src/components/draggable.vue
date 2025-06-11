<template>
  <div
    class="draggable"
    draggable="true"
    @dragstart="onDragStart"
    @dragover="onDragOver"
    @drop="onDrop"
  >
    <div class="label">{{ node.label }}</div>

    <div class="children">
      <DraggableItem
        v-for="child in node.children"
        :key="child.id"
        :node="child"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";

import type { DragDropController } from "../domain/drag-controller/def";
import type { DraggableNode } from "../domain/drag-controller/meta";
import DraggableItem from "../components/draggable.vue";

const props = defineProps<{ node: DraggableNode }>();

const controller = inject<DragDropController>("dragDropController");
const onDragStart = () => {
  controller?.startDrag(props.node.id);
};

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
};

const onDrop = () => {
  controller?.dropOver(props.node.id);
};
</script>

<style scoped>
.draggable {
  border: 2px dashed #888;
  padding: 10px;
  margin: 10px;
  background-color: #f8f8f8;
}
.label {
  font-weight: bold;
  color: red;
}
.children {
  margin-left: 20px;
}
</style>
