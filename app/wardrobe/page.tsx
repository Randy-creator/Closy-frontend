"use client";

import { useEffect, useState } from "react";
import ClothingCard from "../components/ClothingCard";
import { ClothingItem, ClothingCategory } from "@/lib/type";

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Wardrobe</h1>

      <div className="mb-4 flex gap-2">
        {["ALL", "TOP", "BOTTOM", "SHOES", "ACCESSORY"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat as ClothingCategory | "ALL")}
            className={`px-3 py-1 rounded ${
              filter === cat
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <a
          href="/wardrobe/new"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add New
        </a>
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
