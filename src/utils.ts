export const humanizeDurationMins = (duration: number): string => {
  const mins = Math.round(duration);
  const secs = Math.round((duration % 1) * 60);
  return `${mins} mins ${secs} sec`;
};

export const plural = (quantity: number): string => (quantity == 1 ? "" : "s");
