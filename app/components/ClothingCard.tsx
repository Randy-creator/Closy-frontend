"use client";

import { Button } from "@/components/ui/button";
import { ClothingItem } from "@/lib/type";

interface Props {
  item: ClothingItem;
  onDelete: (id: number) => void;
}

export default function ClothingCard({ item, onDelete }: Props) {
  return (
    <div className="border rounded-lg shadow p-7 bg-white hover:shadow-lg transition-transform transform hover:scale-105 ease-in-out ">
      <h3 className="font-bold text-lg">{item.name}</h3>
      <p className="text-sm text-gray-600">{item.brand}</p>
      <p className="text-sm">{item.category}</p>
      <p className="text-sm">Color: {item.color}</p>
      {item.size && <p className="text-sm">Size: {item.size}</p>}

      <div className="mt-2 flex gap-2">
        <Button asChild variant="default" size="sm"
        className="hover:transition-transform transform hover:scale-105 ease-in-out"
        >
          <a href={`/wardrobe/${item.id}`}>Edit</a>
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => item.id && onDelete(item.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
