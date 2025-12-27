
export function useDndEvents() {
    const onDragstart = (e: DragEvent) => {
        if (!e.dataTransfer) return;
    }

    return {
        onDragstart
    }
}