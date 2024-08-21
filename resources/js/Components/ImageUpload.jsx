import React, { useState, useRef } from 'react';

const ImageUpload = ({ onImageUpload, source,className }) => {
    const [imagePreview, setImagePreview] = useState(null);
    const imageRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files?.[0] || null;
        if (!file) {
            return;
        }
        onImageUpload(file);
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setImagePreview(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    };

    return (
        <div
            className={`h-24 aspect-video border-2 rounded-lg border-dashed border-gray-300 flex justify-center items-center cursor-pointer ${className}`}
            onClick={() => imageRef.current?.click()}
        >
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
                ref={imageRef}
            />
            {imagePreview && (
                <img
                    className="w-full h-full object-contain"
                    src={imagePreview}
                    alt="Image Preview"
                />
            )}
            {!source && !imagePreview && (
                <h3 className="text-gray-400 text-sm font-bold">انتخاب عکس</h3>
            )}
            {source && !imagePreview && (
                <img
                    className="h-24 object-contain"
                    src={`${source}`}
                    alt="Uploaded Image"
                />
            )}
        </div>
    );
};

export default ImageUpload;
