"use client";
import { useAddItemForm } from "../../../app/hooks/useAddItemForm";

const AddItemForm = () => {
  const { register, handleSubmit, errors, success, loading } = useAddItemForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 shadow rounded-lg"
    >
      <h2 className="text-xl font-semibold">➕ Dodaj nową rzecz</h2>

      <div>
        <label className="block font-medium mb-1">Nazwa rzeczy</label>
        <input
          className="w-full border border-gray-300 p-2 rounded"
          {...register("name", { required: "To pole jest wymagane" })}
        />
        {errors.name && (
          <p className="text-red-600 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Typ</label>
        <input
          className="w-full border border-gray-300 p-2 rounded"
          {...register("type", { required: "Podaj typ rzeczy" })}
        />
        {errors.type && (
          <p className="text-red-600 text-sm">{errors.type.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Lokalizacja</label>
        <input
          className="w-full border border-gray-300 p-2 rounded"
          {...register("location", {
            required: "Gdzie znajduje się ta rzecz?",
          })}
        />
        {errors.location && (
          <p className="text-red-600 text-sm">{errors.location.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Dodawanie..." : "Dodaj"}
      </button>

      {success && <p className="text-green-600 mt-2">{success}</p>}
    </form>
  );
};

export default AddItemForm;
