import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

if (!baseUrl) {
  throw new Error("Missing NEXT_PUBLIC_API_URL in environment variables");
}

export type ItemPayload = {
  name: string;
  location: string;
  type: string;
};

export type Item = {
  id: string;
  name: string;
  location: string;
  tags: string[];
};

export const addItem = async ({ name, location, type }: ItemPayload) => {
  const response = await axios.post(
    baseUrl,
    {
      name,
      location,
      type,
    }
  );
  return response.data;
};

export const getItems = async (): Promise<Item[]> => {
  const res = await axios.get(
    baseUrl
  );
  return res.data;
};

export const deleteItems = async (id: string) => {
  const res = await axios.delete(
    `${baseUrl}/${id}`
  );
  return res.data;
};
