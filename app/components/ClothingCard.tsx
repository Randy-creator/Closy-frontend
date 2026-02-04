"use client";

import { ClothingItem } from "@/lib/type";

interface Props {
  item: ClothingItem;
  onDelete: (id: number) => void;
}

export default function ClothingCard({ item, onDelete }: Props) {
  return (
    <div className="border rounded-lg shadow p-4 bg-white hover:shadow-lg transition">
      <h3 className="font-bold text-lg">{item.name}</h3>
      <p className="text-sm text-gray-600">{item.brand}</p>
      <p className="text-sm">{item.category}</p>
      <p className="text-sm">Color: {item.color}</p>
      {item.size && <p className="text-sm">Size: {item.size}</p>}

      <div className="mt-2 flex gap-2">
        <a
          href={`/wardrobe/${item.id}`}
          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </a>
        <button
          onClick={() => item.id && onDelete(item.id)}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
