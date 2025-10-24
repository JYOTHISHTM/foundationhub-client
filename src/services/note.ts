// src/services/note.ts
import { Note, Block } from "@/types/notes";

const BASE_URL = "http://localhost:5000";

export async function getNote(slug: string): Promise<Note> {
  const res = await fetch(`${BASE_URL}/notes/${slug}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch note");
  return res.json();
  
  
}

export async function addBlock(slug: string, block: Block): Promise<Note> {
  const res = await fetch(`${BASE_URL}/notes/${slug}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(block),
  });
  if (!res.ok) throw new Error("Failed to add block");
  return res.json();
}

export async function updateBlock(slug: string, index: number, block: Block): Promise<Note> {
  const res = await fetch(`${BASE_URL}/notes/${slug}/${index}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(block),
  });
  if (!res.ok) throw new Error("Failed to update block");
  return res.json();
}
