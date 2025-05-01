import React, { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { useFieldArray, useForm } from "react-hook-form";
import { useAddCarMutation } from "../../../redux/features/cars/carsApi";
import Swal from "sweetalert2";
import heic2any from "heic2any";
import imageCompression from "browser-image-compression";

const AddCar = () => {
  const { register, handleSubmit, control, setValue, reset } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });
  const [mediaFiles, setMediaFiles] = useState([]);
  const [coverImageIndex, setCoverImageIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [addCar] = useAddCarMutation();

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    const validFiles = [];

    for (const file of files) {
      if (file.size > maxFileSize) {
        alert(`File "${file.name}" is too large. Maximum size is 5MB.`);
        continue;
      }

      const isHEIC =
        file.type === "image/heic" ||
        file.type === "image/heif" ||
        file.name.toLowerCase().endsWith(".heic") ||
        file.name.toLowerCase().endsWith(".heif");
      console.log("File Details:", {
        name: file.name,
        type: file.type,
        size: file.size,
      });

      try {
        let processedFile = file;

        // Convert HEIC to PNG if necessary
        if (isHEIC) {
          const convertedBlob = await heic2any({
            blob: file,
            toType: "image/png",
          });
          processedFile = new File(
            [convertedBlob],
            file.name.replace(/\.[^/.]+$/, ".png"),
            {
              type: "image/png",
            }
          );
        }

        // Compress the image
        const compressedFile = await imageCompression(processedFile, {
          maxSizeMB: 0.15, // Target size in MB (200KB)
          maxWidthOrHeight: 800, // Resize to a max width/height of 800px
          useWebWorker: true, // Use a web worker for better performance
        });

        console.log("Original File Size:", processedFile.size);
        console.log("Compressed File Size:", compressedFile.size);

        validFiles.push(compressedFile);
      } catch (error) {
        console.error("Error processing file:", error);
        alert(`Failed to process "${file.name}".`);
      }
    }

    setMediaFiles(validFiles);
    setValue("media", validFiles); // Update the form value for media
  };

  const handleCoverImageChange = (index) => {
    setCoverImageIndex(index);
  };

  const getFileName = (file) => {
    if (file instanceof File) {
      return file.name;
    } else if (typeof file === "string") {
      const urlParts = file.split("/");
      return urlParts[urlParts.length - 1];
    } else {
      console.error("Invalid file type:", file);
      return "Unknown File";
    }
  };

  const onSubmit = async (data) => {
    if (mediaFiles.length === 0) {
      const confirm = await Swal.fire({
        title: "No Media Files",
        text: "You have not uploaded any media files. Do you want to continue?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, continue",
        cancelButtonText: "No, cancel",
      });

      if (!confirm.isConfirmed) {
        return;
      }
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("price", data.price);
    formData.append("make", data.make);
    formData.append("model", data.model);
    formData.append("year", data.year);
    formData.append("type", data.type);
    formData.append("color", data.color);
    formData.append("engine", data.engine);
    formData.append("mileage", data.mileage);
    formData.append("trim", data.trim);
    formData.append("category", data.category);
    formData.append("coverImageIndex", coverImageIndex);
    data.features.forEach((feature, index) => {
      formData.append(`features[${index}]`, feature.value);
    });
    mediaFiles.forEach((file, index) => {
      formData.append("media[]", file);
    });

    try {
      await addCar(formData).unwrap();
      Swal.fire({
        title: "Car Added",
        text: "Car has been added successfully",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      reset();
      setMediaFiles([]);
      setCoverImageIndex(null);
    } catch (error) {
      console.error("Error adding car:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to add car. Please try again.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    //<div className="max-w-2xl mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md overflow-visible">
    <div className="max-w-2xl mx-auto md:p-6 p-3 mb-3 bg-white rounded-lg shadow-md overflow-visible">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Vehicle</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {/* Other form fields */}
        <InputField
          label="Make"
          name="make"
          type="text"
          placeholder="Make"
          register={register}
        />
        <InputField
          label="Model"
          name="model"
          type="text"
          placeholder="Model"
          register={register}
        />
        <InputField
          label="Year"
          name="year"
          type="number"
          placeholder="Year"
          register={register}
        />
        <InputField
          label="Type"
          name="type"
          type="text"
          placeholder="Type"
          register={register}
        />
        <InputField
          label="Color"
          name="color"
          type="text"
          placeholder="Color"
          register={register}
        />
        <InputField
          label="Engine"
          name="engine"
          type="text"
          placeholder="Engine"
          register={register}
        />
        <InputField
          label="Mileage"
          name="mileage"
          type="number"
          placeholder="Mileage"
          register={register}
        />
        <InputField
          label="Price"
          name="price"
          type="number"
          placeholder="Price"
          register={register}
        />
        <InputField
          label="Trim"
          name="Trim"
          type="text"
          placeholder="Trim"
          register={register}
        />
        <SelectField
          label="Category"
          name="category"
          options={[
            { value: "", label: "Choose A Category" },
            { value: "Coupe", label: "Coupe" },
            { value: "Sedan", label: "Sedan" },
            { value: "Pickup Truck", label: "Pickup Truck" },
            { value: "Crossover", label: "Crossover" },
            { value: "Minivan", label: "Minivan" },
            { value: "Hatchback", label: "Hatchback" },
            { value: "Convertible", label: "Convertible" },
            { value: "Sports Car", label: "Sports Car" },
            { value: "Station Wagon", label: "Station Wagon" },
            { value: "EV", label: "EV" },
            { value: "Hybrid", label: "Hybrid" },
          ]}
          register={register}
        />

        {/* Features Input */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Features
          </label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center mb-2">
              <input
                type="text"
                {...register(`features.${index}.value`)}
                className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
                placeholder="Feature"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="ml-2 text-red-600 hover:text-red-900"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ value: "" })}
            className="mt-2 text-blue-600 hover:text-blue-900"
          >
            Add Feature
          </button>
        </div>

        {/* Trending Checkbox */}
        {/* <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            {...register('trending')}
                            className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
                    </label>
                </div> */}

        {/* Media Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Media
          </label>
          <input
            type="file"
            name="media[]" // Ensure the name matches
            accept="image/*,video/*"
            multiple
            onChange={handleFileChange}
            className="mb-2 w-full"
          />
          {mediaFiles.length > 0 && (
            <div className="text-sm text-gray-500">
              {mediaFiles.map((file, index) => (
                <div
                  key={index}
                  className="mb-2 p-2 border rounded-md bg-gray-100"
                >
                  <p className="font-semibold">Selected: {file.name}</p>
                  <label className="inline-flex items-center mt-2">
                    <input
                      type="radio"
                      name="coverImage"
                      value={index}
                      checked={coverImageIndex === index}
                      onChange={() => handleCoverImageChange(index)}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-sm font-semibold text-gray-700">
                      Set as Cover Image
                    </span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
        >
          {isLoading ? <span>Adding.. </span> : <span>Add Car</span>}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
