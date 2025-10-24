
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type BubbleItem = {
  slug: string;
  name: string;
  size: number;
  top: string;
  left: string;
};

const bubbles: BubbleItem[] = [
  { slug: "js", name: "JS", size: 100, top: "15%", left: "10%" },
  { slug: "beta", name: "Beta", size: 80, top: "40%", left: "25%" },
  { slug: "gamma", name: "Gamma", size: 120, top: "25%", left: "55%" },
  { slug: "delta", name: "Delta", size: 90, top: "60%", left: "70%" },
  { slug: "epsilon", name: "Epsilon", size: 75, top: "35%", left: "80%" },
];

export default function BubblesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-white">
        <h1 className="text-2xl md:text-2xl font-light text-gray-900 tracking-tight">
          Revise Foundation
        </h1>
        <span className="text-sm text-gray-600">my name is</span>
      </div>

      {/* Bubble Area */}
      <div className="relative w-full max-w-5xl h-[500px] mx-auto mt-12 mb-20 bg-gray-50 rounded-lg shadow-inner border border-gray-200 overflow-hidden">
        {bubbles.map((bubble, idx) => (
          <Link
            key={bubble.slug}
            href={`/notes/${bubble.slug}`}
            className="absolute"
            style={{ top: bubble.top, left: bubble.left }}
          >
            <motion.div
              className="rounded-full border border-gray-300 bg-white shadow-md overflow-hidden group flex items-center justify-center cursor-pointer"
              style={{
                width: bubble.size,
                height: bubble.size,
              }}
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 4 + idx,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Default Image */}
              <Image
                src="data:image/png;base64,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" // replace with your image
                alt={bubble.name}
                width={bubble.size}
                height={bubble.size}
                className="object-cover rounded-full"
              />

              {/* Hover Name */}
              <span className="absolute text-xs font-medium text-gray-800 opacity-0 group-hover:opacity-100 bg-white/90 px-2 py-1 rounded shadow-md transition">
                {bubble.name}
              </span>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-green-100 py-4 text-center text-sm text-slate-700 mt-auto border-t border-gray-200">
        © {new Date().getFullYear()} Revise Foundation. All rights reserved.
      </div>
    </div>
  );
}
