import { useSyncExternalStore } from "react";

let open = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function openQuoteModal() {
  if (open) return;
  open = true;
  emit();
}

export function closeQuoteModal() {
  if (!open) return;
  open = false;
  emit();
}

export function useQuoteModalOpen() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => open,
    () => false,
  );
}
