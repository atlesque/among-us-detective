/**
 * Attaches auto-sizing behavior to a textarea element.
 * Called onMounted with the textarea ref.
 */
export function useAutosize() {
  function setupAutosize(el: HTMLTextAreaElement | null) {
    if (!el) return;
    el.style.height = el.scrollHeight + "px";
    el.style.overflowY = "hidden";
    const handler = () => {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    };
    el.addEventListener("input", handler);
    // Store cleanup on element itself for onBeforeUnmount
    (el as any).__autosizeCleanup = () =>
      el.removeEventListener("input", handler);
  }

  function cleanupAutosize(el: HTMLTextAreaElement | null) {
    if (!el) return;
    (el as any).__autosizeCleanup?.();
  }

  return { setupAutosize, cleanupAutosize };
}
