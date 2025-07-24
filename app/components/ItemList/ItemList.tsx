"use client";
import { useEffect, useState } from "react";
import { getItems, Item } from "../../lib/api";

const ItemList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    getItems()
      .then(setItems)
      .catch(() => alert("❌ Błąd przy pobieraniu danych"));
  }, []);

  const filtered = items.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(search.toLowerCase());
    const typeMatch = typeFilter
      ? item.tags[0]?.toLowerCase() === typeFilter.toLowerCase()
      : true;
    return nameMatch && typeMatch;
  });

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">📋 Lista rzeczy w domu</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Szukaj po nazwie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full md:w-1/2"
        />
        <input
          type="text"
          placeholder="Filtruj po typie..."
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full md:w-1/2"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-600">
              📍 Lokalizacja: {item.location}
            </p>
            <p className="text-sm text-gray-600">🏷️ Typ: {item.tags[0]}</p>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-4 text-gray-500">Brak wyników.</p>
      )}
    </div>
  );
};

export default ItemList;
