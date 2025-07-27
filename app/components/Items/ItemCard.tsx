import React from "react";
import Button from "../Button/button";
import { Item } from "../../lib/api";

interface ItemCardProps {
  item: Item;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  isEditing: boolean;
  editedItem: Partial<Item>;
  setEditedItem: React.Dispatch<React.SetStateAction<Partial<Item>>>;
  onSave: () => void;
  onCancel: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onDelete,
  onEdit,
  isEditing,
  editedItem,
  setEditedItem,
  onSave,
  onCancel,
}) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      {isEditing ? (
        <>
          <input
            className="mb-2 p-1 border w-full"
            value={editedItem.name || ""}
            onChange={(e) =>
              setEditedItem({ ...editedItem, name: e.target.value })
            }
          />
          <input
            className="mb-2 p-1 border w-full"
            value={editedItem.location || ""}
            onChange={(e) =>
              setEditedItem({ ...editedItem, location: e.target.value })
            }
          />
          <input
            className="mb-2 p-1 border w-full"
            value={editedItem.tags?.[0] || ""}
            onChange={(e) =>
              setEditedItem({ ...editedItem, tags: [e.target.value] })
            }
          />
          <div className="flex justify-end gap-2">
            <Button
              onClick={onSave}
              className="px-3 py-1 text-white bg-green-600 rounded"
              label="Save"
            />
            <Button
              onClick={onCancel}
              className="px-3 py-1 text-gray-700 border rounded"
              label="Cancel"
            />
          </div>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-600">📍 Location: {item.location}</p>
          <p className="text-sm text-gray-600">🏷️ Type: {item.tags[0]}</p>
          <div className="flex justify-end gap-4 mt-2">
            <Button
              onClick={() => onEdit(item.id)}
              className="text-blue-600 hover:text-blue-800 text-sm"
              label="✏️ Edit"
            />
            <Button
              onClick={() => onDelete(item.id)}
              className="text-red-600 hover:text-red-800 text-sm"
              label="🗑️ Delete"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ItemCard;
