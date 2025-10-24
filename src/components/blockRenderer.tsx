


"use client";
import { useState } from "react";
import { Block, HeadingColor } from "@/types/notes";
import { updateBlock } from "@/services/note";

export default function BlockRenderer({
  block,
  index,
  slug,
  onUpdated,
}: {
  block: Block;
  index: number;
  slug: string;
  onUpdated: (blocks: Block[]) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const [value, setValue] = useState(
    typeof block.value === "string"
      ? block.value
      : Array.isArray(block.value)
        ? block.value.join("\n")
        : ""
  );

  const [color, setColor] = useState<HeadingColor>(block.color || "white");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof block.value === "string") {
      navigator.clipboard.writeText(block.value).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleSave = async () => {
    let finalValue: string | string[];

    if (block.type === "points") {
      finalValue = value
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0);
    } else {
      finalValue = value;
    }

    const updatedBlock: Block = {
      type: block.type,
      value: finalValue,
    };

    const updatedNote = await updateBlock(slug, index, updatedBlock);
    onUpdated(updatedNote.blocks);
    setIsEditing(false);
  };

  const handleColorChange = async (newColor: HeadingColor) => {
    setColor(newColor);
    setShowColorPicker(false);

    const updatedBlock: Block = {
      type: block.type,
      value: block.value,
      color: newColor,
    };

    const updatedNote = await updateBlock(slug, index, updatedBlock);
    onUpdated(updatedNote.blocks);
  };

  const getColorClass = (color?: HeadingColor) => {
    switch (color) {
      case "yellow":
        return "text-yellow-400";
      case "green":
        return "text-green-400";
      default:
        return "text-white";
    }
  };

  // If user is editing this block
  // if (isEditing) {
  //   return (
  //     <div className="border  border-gray-400 p-4 rounded">
  //       <textarea
  //         value={value}
  //         onChange={(e) => setValue(e.target.value)}
  //         className="w-full border p-2 rounded resize-none text-white"
  //         rows={block.type === "points" ? 8 : 4}
  //         placeholder={
  //           block.type === "points"
  //             ? "Enter each point on a new line"
  //             : "Enter text"
  //         }
  //       />

  //       {block.type === "points" && (
  //         <p className="text-sm text-gray-600 mt-1">
  //           Tip: Each line will become a separate bullet point
  //         </p>
  //       )}

  //       <div className="flex gap-2 mt-2">
  //         <button
  //           onClick={handleSave}
  //           className="bg-black text-white px-3 py-1 rounded"
  //         >
  //           Save
  //         </button>
  //         <button
  //           onClick={() => setIsEditing(false)}
  //           className="bg-gray-300 text-black px-3 py-1 rounded"
  //         >
  //           Cancel
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }
if (isEditing) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] text-white w-[90%] max-w-3xl p-6 rounded-2xl shadow-xl relative">
        <h2 className="text-lg font-semibold mb-4 capitalize">
          Editing {block.type}
        </h2>

        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full border border-gray-600 bg-[#2c2c2c] p-3 rounded resize-none text-white"
          rows={block.type === "points" ? 15 : 10}
          placeholder={
            block.type === "points"
              ? "Enter each point on a new line"
              : "Enter text"
          }
        />

        {block.type === "points" && (
          <p className="text-sm text-gray-400 mt-1">
            Tip: Each line will become a separate bullet point.
          </p>
        )}

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

  // Normal display mode
  switch (block.type) {
    case "mainHeading":
      return (
        <div className="relative group">
          <h2 className={`text-2xl font-bold ${getColorClass(block.color)}`}>
            {block.value}
          </h2>
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="opacity-0 group-hover:opacity-100 bg-purple-500 text-white px-2 py-1 text-sm rounded"
            >
              🎨 Color
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="opacity-0 group-hover:opacity-100 bg-yellow-400 text-black px-2 py-1 text-sm rounded"
            >
              Edit
            </button>
          </div>

          {showColorPicker && (
            <div className="absolute top-12 right-2 bg-white border rounded shadow-lg p-3 z-10">
              <div className="flex gap-2">
                <button
                  onClick={() => handleColorChange("white")}
                  className="w-10 h-10 rounded border-2 border-gray-300 bg-white hover:border-blue-500"
                  title="White"
                />
                <button
                  onClick={() => handleColorChange("yellow")}
                  className="w-10 h-10 rounded border-2 border-gray-300 bg-yellow-400 hover:border-blue-500"
                  title="Yellow"
                />
                <button
                  onClick={() => handleColorChange("green")}
                  className="w-10 h-10 rounded border-2 border-gray-300 bg-green-400 hover:border-blue-500"
                  title="Green"
                />
              </div>
            </div>
          )}
        </div>
      );

    case "sideHeading":
      return (
        <div className="relative group">
          <h3 className={`text-xl font-semibold ${getColorClass(block.color)}`}>
            {block.value}
          </h3>
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="opacity-0 group-hover:opacity-100 bg-purple-500 text-white px-2 py-1 text-sm rounded"
            >
              🎨 Color
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="opacity-0 group-hover:opacity-100 bg-yellow-400 text-black px-2 py-1 text-sm rounded"
            >
              Edit
            </button>
          </div>

          {showColorPicker && (
            <div className="absolute top-12 right-2 bg-white border rounded shadow-lg p-3 z-10">
              <div className="flex gap-2">
                <button
                  onClick={() => handleColorChange("white")}
                  className="w-10 h-10 rounded border-2 border-gray-300 bg-white hover:border-blue-500"
                  title="White"
                />
                <button
                  onClick={() => handleColorChange("yellow")}
                  className="w-10 h-10 rounded border-2 border-gray-300 bg-yellow-400 hover:border-blue-500"
                  title="Yellow"
                />
                <button
                  onClick={() => handleColorChange("green")}
                  className="w-10 h-10 rounded border-2 border-gray-300 bg-green-400 hover:border-blue-500"
                  title="Green"
                />
              </div>
            </div>
          )}
        </div>
      );

    case "text":
      return (
        <div className="relative group">
          <p style={{ fontSize: "20px" }}>{block.value}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-yellow-400 text-black px-2 py-1 text-sm rounded"
          >
            Edit
          </button>
        </div>
      );

    case "practical":
      return (
        <div className="relative bg-gray-900 text-white p-4 rounded group">
          <pre className="whitespace-pre-wrap">{block.value}</pre>
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 bg-white text-black px-2 py-1 text-sm rounded hover:bg-gray-200"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-2 right-16 opacity-0 group-hover:opacity-100 bg-yellow-400 text-black px-2 py-1 text-sm rounded"
          >
            Edit
          </button>
        </div>
      );

    case "image":
      return (
        <div className="relative group flex justify-center my-4">
          {typeof block.value === "string" ? (
            <img
              src={block.value}
              alt="User Added"
              className="rounded-lg max-w-full max-h-80"
            />
          ) : null}
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-yellow-400 text-black px-2 py-1 text-sm rounded"
          >
            Edit
          </button>
        </div>
      );

    case "points":
      return (
        <div className="relative group">
          <ul className="list-disc pl-6 space-y-1">
            {Array.isArray(block.value)
              ? block.value.map((point: string, i: number) => (
                <li key={i}>{point}</li>
              ))
              : null}
          </ul>
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-yellow-400 text-black px-2 py-1 text-sm rounded"
          >
            Edit
          </button>
        </div>
      );

    default:
      return null;
  }
}