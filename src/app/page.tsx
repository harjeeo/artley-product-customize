"use client";

import { useMemo, useState } from "react";
import { MOCKUP_DEFINITIONS } from "@/data/mockups";
import { DEFAULT_PLACEMENT, MockupState, Placement } from "@/types/mockup";
import ArtworkForm from "@/components/ArtworkForm";
import ProductCard from "@/components/ProductCard";
import EditMockupModal from "@/components/EditMockupModal";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [artworkUrl, setArtworkUrl] = useState<string | null>(null);

  const [mockups, setMockups] = useState<MockupState[]>(() =>
    MOCKUP_DEFINITIONS.map((def) => ({
      ...def,
      enabled: true,
      placement: { ...DEFAULT_PLACEMENT },
    }))
  );

  const [editingId, setEditingId] = useState<string | null>(null);

  const editingMockup = useMemo(
    () => mockups.find((m) => m.id === editingId) ?? null,
    [mockups, editingId]
  );

  const handleImageChange = (file: File | null) => {
    if (!file) {
      setArtworkUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setArtworkUrl(url);
  };

  const handleToggleEnabled = (id: string) => {
    setMockups((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m))
    );
  };

  const handleUpdatePlacement = (id: string, placement: Placement) => {
    setMockups((prev) => prev.map((m) => (m.id === id ? { ...m, placement } : m)));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <ArtworkForm
          title={title}
          description={description}
          artworkUrl={artworkUrl}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          onImageChange={handleImageChange}
        />

        <h2 className="mb-4 mt-10 text-xl font-semibold text-gray-900">Product Preview</h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {mockups.map((mockup) => (
            <ProductCard
              key={mockup.id}
              mockup={mockup}
              artworkUrl={artworkUrl}
              onEdit={() => setEditingId(mockup.id)}
              onToggleEnabled={() => handleToggleEnabled(mockup.id)}
            />
          ))}
        </div>
      </div>

      {editingMockup && (
        <EditMockupModal
          key={editingMockup.id}
          mockup={editingMockup}
          artworkUrl={artworkUrl}
          onClose={() => setEditingId(null)}
          onUpdate={(placement) => handleUpdatePlacement(editingMockup.id, placement)}
        />
      )}
    </div>
  );
}
