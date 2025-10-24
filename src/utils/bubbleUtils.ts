// src/utils/bubbleUtils.ts
import { BubbleItem } from "@/components/bubble";

export function getNonOverlappingPosition(
  bubbles: BubbleItem[],
  size: number,
  containerWidth: number,
  containerHeight: number,
  padding: number
) {
  let tries = 0;
  while (tries < 200) {
    const left = Math.random() * (containerWidth - size - padding * 2);
    const top = Math.random() * (containerHeight - size - padding * 2);

    const overlaps = bubbles.some((b) => {
      const dx = left - parseFloat(b.left);
      const dy = top - parseFloat(b.top);
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < ((size + (b.size || 100)) / 2 + padding);
    });

    if (!overlaps) return { left: `${left}px`, top: `${top}px` };
    tries++;
  }
  return {
    left: `${Math.random() * 70 + 15}%`,
    top: `${Math.random() * 70 + 15}%`,
  };
}
