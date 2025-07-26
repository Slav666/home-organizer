"use client";
import { useAddItemForm } from "../../../app/hooks/useAddItemForm";
import Button from "../Button/button";

const AddItemForm = () => {
  const { register, handleSubmit, errors, success, loading } = useAddItemForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 shadow rounded-lg"
    >
      <h2 className="text-xl font-semibold">➕ Add new item</h2>

      <div>
        <label className="block font-medium mb-1">Name</label>

        <input
          className="w-full border border-gray-300 p-2 rounded"
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && (
          <p className="text-red-600 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Type</label>
        <input
          className="w-full border border-gray-300 p-2 rounded"
          {...register("type", { required: "Specify the type of thing" })}
        />
        {errors.type && (
          <p className="text-red-600 text-sm">{errors.type.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Location</label>
        <input
          className="w-full border border-gray-300 p-2 rounded"
          {...register("location", {
            required: "Where is this thing located?",
          })}
        />
        {errors.location && (
          <p className="text-red-600 text-sm">{errors.location.message}</p>
        )}
      </div>
      <Button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        disabled={loading}
        label={loading ? "Saving..." : "Save"}
      />
      {success && <p className="text-green-600 mt-2">{success}</p>}
    </form>
  );
};

export default AddItemForm;
