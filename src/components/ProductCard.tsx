"use client";

import { MockupState } from "@/types/mockup";
import MockupFrame from "./MockupFrame";

export default function ProductCard({
  mockup,
  artworkUrl,
  onEdit,
  onToggleEnabled,
}: {
  mockup: MockupState;
  artworkUrl: string | null;
  onEdit: () => void;
  onToggleEnabled: () => void;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <div
        className={`relative aspect-square w-full overflow-hidden rounded-lg bg-gray-50 ${
          mockup.enabled ? "" : "opacity-40 grayscale"
        }`}
      >
        <MockupFrame mockup={mockup} artworkUrl={artworkUrl} />
        {!mockup.enabled && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
              Disabled
            </span>
          </div>
        )}
      </div>

      <p className="mt-2 text-center text-sm font-medium text-gray-800">{mockup.name}</p>

      <div className="mt-3 flex gap-2">
        <button
          onClick={onEdit}
          className="flex-1 rounded-full border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
        >
          Edit
        </button>
        <button
          onClick={onToggleEnabled}
          className={`flex-1 rounded-full px-3 py-1.5 text-xs font-medium ${
            mockup.enabled
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {mockup.enabled ? "Enabled" : "Disabled"}
        </button>
      </div>
    </div>
  );
}
