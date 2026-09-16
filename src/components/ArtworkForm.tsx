"use client";

import { ChangeEvent } from "react";

export default function ArtworkForm({
  title,
  description,
  artworkUrl,
  onTitleChange,
  onDescriptionChange,
  onImageChange,
}: {
  title: string;
  description: string;
  artworkUrl: string | null;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onImageChange: (file: File | null) => void;
}) {
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onImageChange(file);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-xl font-semibold text-gray-900">Upload Artwork</h1>

      <div className="grid gap-5 sm:grid-cols-[160px_1fr]">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Artwork Image</label>
          <label className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:border-gray-400">
            {artworkUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={artworkUrl} alt="Artwork preview" className="h-full w-full object-contain" />
            ) : (
              <span className="px-2 text-center text-xs text-gray-500">Click to upload image</span>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </label>
        </div>

        <div className="flex flex-col gap-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="e.g. Sunset Dreams"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
            />
          </label>

          <label className="block flex-1">
            <span className="mb-1 block text-sm font-medium text-gray-700">Description</span>
            <textarea
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              placeholder="Describe your artwork..."
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
