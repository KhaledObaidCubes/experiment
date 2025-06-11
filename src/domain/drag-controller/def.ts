import type { DraggableNode } from "./meta";

export class DragDropController {
  root: DraggableNode;
  draggingNode: DraggableNode | null = null;

  constructor(root: DraggableNode) {
    this.root = root;
  }

  startDrag(targetId: string) {
    console.log(targetId);

    if (!this.draggingNode || this.draggingNode.id === targetId) return;

    const targetNode = this.findNode(this.root, targetId);
    if (!targetNode || this.isDescendant(this.draggingNode, targetNode)) return;

    this.removeNode(this.root, this.draggingNode.id);
    targetNode.children.push(this.draggingNode);
    this.draggingNode = null;
  }

  dropOver(targetId: string) {
    console.log("Dropping over target ID:", targetId);
    if (!this.draggingNode || this.draggingNode.id === targetId) return;

    const targetNode = this.findNode(this.root, targetId);
    if (!targetNode || this.isDescendant(this.draggingNode, targetNode)) return;

    // Remove from old parent
    this.removeNode(this.root, this.draggingNode.id);

    // Add as child
    targetNode.children.push(this.draggingNode);
    this.draggingNode = null;
  }

  findNode(current: DraggableNode, id: string): DraggableNode | null {
    if (current.id === id) return current;

    for (const child of current.children) {
      const found = this.findNode(child, id);
      if (found) return found;
    }

    return null;
  }

  removeNode(parent: DraggableNode, id: string): boolean {
    const index = parent.children.findIndex((child) => child.id === id);
    if (index !== -1) {
      parent.children.splice(index, 1);
      return true;
    }
    for (const child of parent.children) {
      if (this.removeNode(child, id)) return true;
    }
    return false;
  }

  isDescendant(node: DraggableNode, possibleAncestor: DraggableNode): boolean {
    if (node === possibleAncestor) return true;
    for (const child of possibleAncestor.children) {
      if (this.isDescendant(node, child)) return true;
    }
    return false;
  }
}
