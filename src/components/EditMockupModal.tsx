"use client";

import { useState } from "react";
import { DEFAULT_PLACEMENT, MockupState, Placement } from "@/types/mockup";
import MockupFrame from "./MockupFrame";

export default function EditMockupModal({
  mockup,
  artworkUrl,
  onClose,
  onUpdate,
}: {
  mockup: MockupState;
  artworkUrl: string | null;
  onClose: () => void;
  onUpdate: (placement: Placement) => void;
}) {
  const [draft, setDraft] = useState<Placement>(mockup.placement);

  const handleUpdate = () => {
    onUpdate(draft);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Edit placement — {mockup.name}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="mx-auto mb-6 aspect-square w-48 rounded-lg border border-gray-200 bg-gray-50">
          <MockupFrame mockup={{ ...mockup, placement: draft }} artworkUrl={artworkUrl} />
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="mb-1 flex justify-between text-sm font-medium text-gray-700">
              Left / Right <span className="text-gray-400">{draft.x}</span>
            </span>
            <input
              type="range"
              min={-50}
              max={50}
              value={draft.x}
              onChange={(e) => setDraft((d) => ({ ...d, x: Number(e.target.value) }))}
              className="w-full accent-black"
            />
          </label>

          <label className="block">
            <span className="mb-1 flex justify-between text-sm font-medium text-gray-700">
              Up / Down <span className="text-gray-400">{draft.y}</span>
            </span>
            <input
              type="range"
              min={-50}
              max={50}
              value={draft.y}
              onChange={(e) => setDraft((d) => ({ ...d, y: Number(e.target.value) }))}
              className="w-full accent-black"
            />
          </label>

          <label className="block">
            <span className="mb-1 flex justify-between text-sm font-medium text-gray-700">
              Scale <span className="text-gray-400">{draft.scale.toFixed(2)}x</span>
            </span>
            <input
              type="range"
              min={0.5}
              max={2}
              step={0.05}
              value={draft.scale}
              onChange={(e) => setDraft((d) => ({ ...d, scale: Number(e.target.value) }))}
              className="w-full accent-black"
            />
          </label>
        </div>

        <div className="mt-6 flex justify-between gap-3">
          <button
            onClick={() => setDraft(DEFAULT_PLACEMENT)}
            className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Reset
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
