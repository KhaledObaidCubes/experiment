import type { DirectiveBinding } from "vue";
import type { DragDropController } from "../domain/drag-controller/def";

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<DragDropController>) {
    const controller = binding.value;

    if (!controller || typeof controller.onStart !== "function") {
      console.warn(
        "v-drag-drop directive requires a valid DragDropController instance."
      );
      return;
    }

    const start = (e: MouseEvent | TouchEvent) => controller.onStart(e);
    const move = (e: MouseEvent | TouchEvent) => controller.onMove(e);
    const end = (e: MouseEvent | TouchEvent) => controller.onEnd(e);

    el.addEventListener("mousedown", start);
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", end);

    el.addEventListener("touchstart", start);
    document.addEventListener("touchmove", move);
    document.addEventListener("touchend", end);

    el.__dragHandlers__ = { start, move, end };
  },

  unmounted(el: HTMLElement) {
    const handlers = el.__dragHandlers__;
    if (!handlers) return;

    el.removeEventListener("mousedown", handlers.start);
    document.removeEventListener("mousemove", handlers.move);
    document.removeEventListener("mouseup", handlers.end);

    el.removeEventListener("touchstart", handlers.start);
    document.removeEventListener("touchmove", handlers.move);
    document.removeEventListener("touchend", handlers.end);
  },
};
