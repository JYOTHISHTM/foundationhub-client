// src/services/bubbleService.ts
import { BubbleItem } from "@/components/bubble";

const API_BASE = "http://localhost:5000/bubbles";

export async function getAllBubbles(): Promise<BubbleItem[]> {
  const res = await fetch(`${API_BASE}/all`);
  if (!res.ok) throw new Error("Failed to fetch bubbles");
  return res.json();
}

export async function addBubble(newBubble: BubbleItem) {
  const res = await fetch(`${API_BASE}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newBubble),
  });
  if (!res.ok) throw new Error("Failed to save bubble");
  return res.json();
}
