"use client";

import React, { useEffect, useState } from "react";
import { getItems, deleteItems, Item, updateItem } from "../../lib/api";
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
    const itemToEdit = items.find((item) => item.id === id);
    if (itemToEdit) {
      setEditingId(id);
      setEditedItem({
        id: itemToEdit.id,
        name: itemToEdit.name,
        location: itemToEdit.location,
        tags: [...itemToEdit.tags],
      });
    } else {
      setEditingId(null);
      setEditedItem({});
    }
  };

 const handleSave = async () => {
   if (
     !editedItem.id ||
     !editedItem.name ||
     !editedItem.location ||
     !editedItem.tags?.[0]
   ) {
     alert("⚠️ Please fill out all fields");
     return;
   }

   try {
     await updateItem({
       id: editedItem.id,
       name: editedItem.name,
       location: editedItem.location,
       type: editedItem.tags[0],
     });

     setItems((prev) =>
       prev.map((item) =>
         item.id === editedItem.id
           ? {
               ...item,
               name: editedItem.name!,
               location: editedItem.location!,
               tags: [editedItem.tags![0]],
             }
           : item
       )
     );

     setEditingId(null);
     setEditedItem({});
   } catch (error) {
     alert("❌ Failed to update item.");
   }
 };

 const handleCancel = () => {
   setEditingId(null);
   setEditedItem({});
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
            onSave={handleSave}
            onCancel={handleCancel}
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
