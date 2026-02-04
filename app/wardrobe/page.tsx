"use client";

import { useEffect, useState } from "react";
import ClothingCard from "../components/ClothingCard";
import { ClothingItem, ClothingCategory } from "@/lib/type";
import { Button } from "@/components/ui/button";

export default function WardrobePage() {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ClothingCategory | "ALL">("ALL");

  const fetchItems = async () => {
    setLoading(true);
    let url = "http://localhost:8080/api/clothing-items";
    if (filter !== "ALL") url += `?category=${filter}`;
    const res = await fetch(url);
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, [filter]);

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8080/api/clothing-items/${id}`, {
      method: "DELETE",
    });
    fetchItems(); // refresh
  };

  return (
    <div className="p-6 w-[60vw] border border-solid rounded-lg shadow-lg bg-gray-50 ml-auto mr-auto mt-40">
      <h1 className="text-2xl font-bold mb-4">Closy - My Wardrobe manager </h1>

      <div className="mb-4 flex gap-2">
        {["ALL", "TOP", "BOTTOM", "SHOES", "ACCESSORY"].map((cat) => (
          <Button
            key={cat}
            variant={filter === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(cat as ClothingCategory | "ALL")}
            className="hover:shadow-lg transition-transform transform hover:scale-105 ease-in-out"
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="mb-4">
        <Button
          variant="outline"
          className="hover:shadow-lg transition-transform transform hover:scale-105 ease-in-out"
        >
          <a href="/wardrobe/new">Add New</a>
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>Your wardrobe is empty 😢</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <ClothingCard key={item.id} item={item} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
