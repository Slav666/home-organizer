import { useForm } from "react-hook-form";
import { useState } from "react";
import { addItem, ItemPayload } from "../lib/api";

export const useAddItemForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemPayload>();
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ItemPayload) => {
    setLoading(true);
    try {
      const result = await addItem(data);
      setSuccess(`✅ Item added (ID: ${result.id})`);
      reset();
    } catch (error) {
      alert("❌ Error adding items");
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    success,
    loading,
  };
};
