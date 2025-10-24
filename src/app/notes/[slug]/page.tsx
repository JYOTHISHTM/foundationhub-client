"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import { Block } from "@/types/notes";
import { getNote } from "@/services/note";
import BlockRenderer from "@/components/blockRenderer";
import AddBlockForm from "@/components/addBlockForm";

export default function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params); // unwrap the Promise

  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    getNote(slug)
      .then((note) => setBlocks(note.blocks || []))
      .catch(() => setBlocks([]));
  }, [slug]);

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center relative p-8">
      {/* Centered content container */}
      <div className="w-full max-w-7xl  ">
        <h1 className="text-3xl font-bold text-center capitalize mb-8">
          {slug.replace("-", " ")}
        </h1>

        {/* Blocks list */}
        <div className="space-y-6 ">
         {blocks.map((block, index) => (
  <BlockRenderer
    key={index}
    block={block}
    index={index}
    slug={slug}
    onUpdated={setBlocks}
  />
))}

        </div>
      </div>

      {/* Floating AddBlockForm */}
      <div className="fixed bottom-6 right-6 z-50">
        <AddBlockForm slug={slug} onAdded={setBlocks} />
      </div>
    </div>


  );
}
