import axios from "axios";
import { mockItems } from "./mock/items";

export type Item = {
  id: string;
  name: string;
  location: string;
  tags: string[]; // pierwszy tag to typ
};

export type ItemPayload = {
  name: string;
  location: string;
  type: string;
};

// ✅ PRZEŁĄCZNIK MOCKÓW
const USE_MOCK = true;

export const getItems = async (): Promise<Item[]> => {
  if (USE_MOCK) {
    // Udajemy ładujące się dane
    return new Promise((resolve) => setTimeout(() => resolve(mockItems), 300));
  } else {
    const res = await axios.get("http://localhost:8000/items");
    return res.data;
  }
};

export const addItem = async ({ name, location, type }: ItemPayload) => {
  if (USE_MOCK) {
    console.warn("Mock addItem: symulacja zapisu:", { name, location, type });
    return { id: Math.random().toString(), message: "Mock item added" };
  } else {
    const res = await axios.post("http://localhost:8000/items", {
      name,
      location,
      tags: [type],
    });
    return res.data;
  }
};
