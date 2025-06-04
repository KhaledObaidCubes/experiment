window.onload = function () {
  const draggableElements = document.getElementsByClassName("draggableElement");
  const droppableAreas = document.getElementsByClassName("droppableArea");

  // Loop through all draggable elements
  for (let i = 0; i < draggableElements.length; i++) {
    const el = draggableElements[i] as HTMLElement;

    // Ensure each has an id for identification during drop
    if (!el.id) {
      el.id = `draggable-${i}`;
    }

    el.setAttribute("draggable", "true");

    el.addEventListener("dragstart", (event: DragEvent) => {
      if (event.dataTransfer) {
        event.dataTransfer.setData("text/plain", el.id);
      }
    });
  }

  // Loop through all droppable areas
  for (let i = 0; i < droppableAreas.length; i++) {
    const area = droppableAreas[i] as HTMLElement;

    area.addEventListener("dragover", (event: DragEvent) => {
      event.preventDefault(); // Necessary to allow dropping
    });

    area.addEventListener("drop", (event) => {
      event.preventDefault();

      const data = event.dataTransfer!.getData("text/plain");
      const draggedElement = document.getElementById(data);

      if (draggedElement) {
        area.appendChild(draggedElement);
      }
    });
  }
};
