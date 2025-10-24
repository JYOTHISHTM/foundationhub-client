"use client";

import { useRouter } from "next/navigation";

export interface BubbleItem {
  _id: number;
  name: string;
  slug: string;
  src: string;
  size?: number;
  left?: string ;
  top?: string;
}

export default function Bubble({
  _id,
  name,
  slug,
  src,
  size = 100,
  left = "10%",
  top = "10%",
}: BubbleItem) {
  const router = useRouter();

  const handleClick = () => router.push(`/ndsddsdsadsdotes/${slug}`);

  return (
    <div
      onClick={handleClick}
      className="group absolute rounded-full overflow-hidden shadow-xl border-2 border-white/60 cursor-pointer transition-transform duration-300 hover:scale-110"
      style={{ width: `${size}px`, height: `${size}px`, left, top }}
    >
      {/* Circle Image */}
      <img
        src={src}
        alt={name}
        className="object-cover w-full h-full rounded-full"
        draggable={false}
      />

      {/* Hover Name Overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm font-medium rounded-full transition-opacity">
        {name}
      </div>
    </div>
  );
}
