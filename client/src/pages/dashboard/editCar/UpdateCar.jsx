import React, { useState, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useUpdateCarMutation, useFetchCarByIdQuery } from '../../../redux/features/cars/carsApi';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import InputField from '../addCar/InputField';
import SelectField from '../addCar/SelectField';

const UpdateCar = () => {
    const { id } = useParams();
    const { data: car, isLoading: isFetching } = useFetchCarByIdQuery(id);
    const { register, handleSubmit, control, setValue, reset } = useForm();
    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: 'features'
    });
    const [mediaFiles, setMediaFiles] = useState([]);
    const [coverImageIndex, setCoverImageIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [updateCar] = useUpdateCarMutation();

    useEffect(() => {
        if (car) {
            reset(car);
            setMediaFiles(car.media || []);
            setCoverImageIndex(car.coverImageIndex || null);
            if (car.features && car.features.length > 0) {
                replace(car.features.map(feature => ({ value: feature })));
            } else {
                replace([]);
            }
        }
    }, [car, reset, setValue, replace]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const maxFileSize = 5 * 1024 * 1024; // 5MB
        const validFiles = [];
    
        files.forEach((file) => {
            if (file.size <= maxFileSize) {
                validFiles.push(file);
            } else {
                alert(`File "${file.name}" is too large. Maximum size is 5MB.`);
            }
        });
    
        setMediaFiles(validFiles);
        setValue('media', validFiles); // Update the form value for media
    };

    const handleCoverImageChange = (index) => {
        setCoverImageIndex(index);
    };

    const getFileName = (file) => {
        if (file instanceof File) {
            return file.name;
        } else {
            const urlParts = file.split('/');
            return urlParts[urlParts.length - 1];
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
                cancelButtonText: "No, cancel"
            });

            if (!confirm.isConfirmed) {
                return;
            }
        }
        setIsLoading(true);
        const formData = new FormData();
        formData.append('price', data.price);
        formData.append('make', data.make);
        formData.append('model', data.model);
        formData.append('year', data.year);
        formData.append('type', data.type);
        formData.append('color', data.color);
        formData.append('engine', data.engine);
        formData.append('mileage', data.mileage);
        formData.append('trim', data.trim);
        formData.append('category', data.category);
        formData.append('status', data.status);
        formData.append('coverImageIndex', coverImageIndex);
        data.features
            .filter(feature => feature.value) // Filter out empty features
            .forEach((feature, index) => {
                formData.append(`features[${index}]`, feature.value);
            });
        mediaFiles.forEach((file, index) => {
            formData.append('media[]', file); // Use 'media[]' to match the input name
        });

        try {
            await updateCar({ id, formData }).unwrap();
            Swal.fire({
                title: "Car Updated",
                text: "Car has been updated successfully",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
            });
        } catch (error) {
            console.error('Error updating car:', error);
            Swal.fire({
                title: "Error",
                text: "Failed to update car. Please try again.",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Vehicle</h2>
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
                    name="trim"
                    type="text"
                    placeholder="Trim"
                    register={register}
                />
                <SelectField
                    label="Category"
                    name="category"
                    options={[
                        { value: '', label: 'Choose A Category' },
                        { value: 'Coupe', label: 'Coupe' },
                        { value: 'Sedan', label: 'Sedan' },
                        { value: 'Pickup Truck', label: 'Pickup Truck' },
                        { value: 'Crossover', label: 'Crossover' },
                        { value: 'Minivan', label: 'Minivan' },
                        { value: 'Hatchback', label: 'Hatchback' },
                        { value: 'Convertible', label: 'Convertible' },
                        { value: 'Sports Car', label: 'Sports Car' },
                        { value: 'Station Wagon', label: 'Station Wagon' },
                        { value: 'EV', label: 'EV' },
                        { value: 'Hybrid', label: 'Hybrid' },
                    ]}
                    register={register}
                />
                <SelectField
                    label="Status"
                    name="status"
                    options={[
                        { value: 'available', label: 'Available' },
                        { value: 'sold', label: 'Sold' },
                        { value: 'maintenance', label: 'Maintenance' },
                    ]}
                    register={register}
                />

                {/* Features Input */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">Features</label>
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center mb-2">
                            <input
                                type="text"
                                {...register(`features.${index}.value`)}
                                className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="ml-2 text-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => append({ value: '' })}
                        className="mt-2 text-blue-500"
                    >
                        Add Feature
                    </button>
                </div>

                {/* Media Files Input */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Media</label>
                    <input
                        type="file"
                        name="media[]"
                        accept="image/*,video/*"
                        multiple
                        onChange={handleFileChange}
                        className="mb-2 w-full"
                    />
                    {mediaFiles.length > 0 && (
                        <div className="text-sm text-gray-500">
                            {mediaFiles.map((file, index) => (
                                <div key={index} className="mb-2 p-2 border rounded-md bg-gray-100">
                                    <p className="font-semibold">Selected: {getFileName(file)}</p>
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

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    disabled={isLoading}
                >
                    {isLoading ? 'Updating...' : 'Update Car'}
                </button>
            </form>
        </div>
    );
};

export default UpdateCar;