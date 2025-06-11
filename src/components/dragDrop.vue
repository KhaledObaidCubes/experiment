<script setup lang="ts"></script>

<template>
  <h1>Drag-n-Drop component</h1>
  1
  <div class="draggableElement" data-drop_type="typeA">Drag me A</div>
  <div class="draggableElement" data-drop_type="typeB">Drag me B</div>
  <div class="draggableElement" data-drop_type="typeA">Drag me B</div>

  <div class="droppableArea" data-drop_type="typeA">Drop A here</div>
  <div class="droppableArea" data-drop_type="typeB">Drop B here</div>
  <div class="droppableArea" data-drop_type="any">Drop anything here</div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
