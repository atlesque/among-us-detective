/**
 * Lightweight, strictly-typed debounce utility supporting cancel and flush operations.
 *
 * @param fn The callback function to debounce.
 * @param delay Milliseconds to wait before invoking the function.
 * @returns Debounced function augmented with .cancel() and .flush() methods.
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) & { cancel: () => void; flush: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<T> | null = null

  const debounced = (...args: Parameters<T>) => {
    lastArgs = args
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      const argsToCall = lastArgs
      timeoutId = null
      lastArgs = null
      if (argsToCall !== null) {
        fn(...argsToCall)
      }
    }, delay)
  }

  debounced.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    lastArgs = null
  }

  debounced.flush = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    if (lastArgs !== null) {
      const argsToCall = lastArgs
      lastArgs = null
      fn(...argsToCall)
    }
  }

  return debounced
}
