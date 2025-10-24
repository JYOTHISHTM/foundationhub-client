"use client";

import { useState } from "react";
import { BlockType, Block } from "@/types/notes";
import { addBlock } from "@/services/note";
import { FiPlus } from "react-icons/fi"; // plus icon

export default function AddBlockForm({
  slug,
  onAdded,
}: {
  slug: string;
  onAdded: (blocks: Block[]) => void;
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedType, setSelectedType] = useState<BlockType | "">("");
  const [value, setValue] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handleAdd = async () => {
    if (!selectedType || !value) return;

    const payload =
      selectedType === "points"
        ? { type: selectedType, value: value.split("\n").filter((p) => p.trim() !== "") }
        : { type: selectedType, value };

    const updated = await addBlock(slug, payload);
    onAdded(updated.blocks);

    setSelectedType("");
    setValue("");
    setExpanded(false);
    setShowPopup(false);
  };


  return (
<div className="relative mb-6">
  {/* Plus button */}
  <button
    onClick={() => setShowPopup(!showPopup)}
    className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-2xl"
  >
    <FiPlus />
  </button>

  {/* Popup */}
  {showPopup && (
  <div
  className={`absolute bottom-14 right-10 bg-white border border-black shadow-lg p-4 z-10 text-black
    transition-all duration-200
    ${expanded ? "h-[30rem] w-[60rem]" : "h-[16rem] w-[28rem]"}
    flex flex-col justify-between
  `}
>
  {!selectedType ? (
    <div className="space-y-2">
      <p className="font-bold text-center">Select Block Type</p>
      {["mainHeading", "sideHeading", "text", "practical", "image", "points"].map((type) => (
        <button
          key={type}
          onClick={() => setSelectedType(type as BlockType)}
          className="w-full border border-black rounded px-2 py-1 hover:bg-black hover:text-white transition"
        >
          {type.replace(/([A-Z])/g, " $1")}
        </button>
      ))}
    </div>
  ) : (
    <div className="flex flex-col flex-grow space-y-2 h-full">
      <p className="font-bold">{selectedType.replace(/([A-Z])/g, " $1")}</p>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={selectedType === "points" ? "Enter points (one per line)" : "Enter content..."}
        className="border border-black p-2 rounded resize-none flex-grow w-full max-h-[20rem]"
      />

      <div className="flex justify-between mt-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm underline"
        >
          {expanded ? "Shrink" : "Expand"}
        </button>
        <button
          onClick={handleAdd}
          className="bg-black text-white px-4 py-1 rounded"
        >
          Add
        </button>
      </div>

      <button
        onClick={() => {
          setSelectedType("");
          setValue("");
        }}
        className="text-sm text-red-600 underline mt-2"
      >
        Cancel
      </button>
    </div>
  )}
</div>

  )}
</div>

  );
}
