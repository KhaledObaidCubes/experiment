import type { IDragDropOptions } from "./meta";

export class DragDropController implements IDragDropOptions {
  draggableSelector: string;
  droppableSelector: string;
  dropTypeAttribute: string;

  constructor(options: IDragDropOptions) {
    this.draggableSelector = options.draggableSelector;
    this.droppableSelector = options.droppableSelector;
    this.dropTypeAttribute = options.dropTypeAttribute || "data-drop_type";
  }

  init() {
    const draggableElements = document.querySelectorAll<HTMLElement>(
      this.draggableSelector
    );
    const droppableElements = document.querySelectorAll<HTMLElement>(
      this.droppableSelector
    );

    draggableElements.forEach((el, index) => {
      if (!el.id) {
        el.id = `draggable-${index}`;
      }

      el.setAttribute("draggable", "true");

      el.addEventListener("dragstart", (event: DragEvent) => {
        if (event.dataTransfer) {
          event.dataTransfer.setData("text/plain", el.id);
        }
      });
    });

    droppableElements.forEach((area) => {
      area.addEventListener("dragover", (event: DragEvent) => {
        event.preventDefault();
      });

      area.addEventListener("drop", (event: DragEvent) => {
        event.preventDefault();
        const data = event.dataTransfer?.getData("text/plain");
        if (!data) return;

        const draggedElement = document.getElementById(data);
        if (!draggedElement) return;

        const dragType =
          draggedElement.getAttribute(this.dropTypeAttribute) || "";
        const dropType = area.getAttribute(this.dropTypeAttribute) || "";

        if (dragType === dropType || dropType === "any") {
          area.appendChild(draggedElement);
        } else {
          console.warn(
            `Invalid drop: '${dragType}' can't be dropped into '${dropType}'`
          );
        }
      });
    });
  }
}
