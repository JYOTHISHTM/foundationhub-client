// export type BlockType =
//   | "sideHeading"
//   | "mainHeading"
//   | "text"
//   | "practical"
//   | "image"
//   | "points";

// export interface Block {
//   type: BlockType;
//   value: string | string[]; 
// }

// export interface Note {
//   slug: string;
//   blocks: Block[];
// }


// src/types/notes.ts

export type BlockType =
  | "sideHeading"
  | "mainHeading"
  | "text"
  | "practical"
  | "image"
  | "points";

export type HeadingColor = "white" | "yellow" | "green";

export interface Block {
  type: BlockType;
  value: string | string[];
  color?: HeadingColor; // Optional color property for headings
}

export interface Note {
  slug: string;
  blocks: Block[];
}