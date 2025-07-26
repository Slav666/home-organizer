"use client";

import React, { useEffect, useState } from "react";
import { getItems, deleteItems, Item } from "../../lib/api";
import SearchAndFilter from "../SearchAndFilter/SearchAndFilter";
import ItemCard from "./ItemCard";

const ItemList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedItem, setEditedItem] = useState<Partial<Item>>({});

  useEffect(() => {
    getItems()
      .then(setItems)
      .catch(() => alert("❌ Error while downloading data"));
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteItems(id);
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      alert("❌ Failed to delete item.");
    }
  };

  const handleEdit = (id: string | null) => {
    setEditingId(id);
    if (id) {
      const itemToEdit = items.find((item) => item.id === id);
      setEditedItem(itemToEdit || {});
    } else {
      setEditedItem({});
    }
  };

  const filtered = items.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(search.toLowerCase());
    const typeMatch = typeFilter
      ? item.tags[0]?.toLowerCase() === typeFilter.toLowerCase()
      : true;
    return nameMatch && typeMatch;
  });

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">📋 List of things at home</h2>

      <SearchAndFilter
        search={search}
        setSearch={setSearch}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onDelete={handleDelete}
            onEdit={handleEdit}
            isEditing={editingId === item.id}
            editedItem={editedItem}
            setEditedItem={setEditedItem}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-4 text-gray-500">No results.</p>
      )}
    </div>
  );
};

export default ItemList;
