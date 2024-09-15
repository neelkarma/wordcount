export function humanizeDurationMins(duration: number): string {
  const mins = Math.round(duration);
  const secs = Math.round((duration % 1) * 60);
  return `${mins} mins ${secs} sec`;
}

export const plural = (quantity: number): string => (quantity === 1 ? "" : "s");

export function debounce(fn: Function, ms = 300) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}
