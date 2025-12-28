import { useState } from "react";
import API from "../services/api";

export default function ImageUpload({ onUpload, existingImage }) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(existingImage || "");

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        setUploading(true);

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            const { data } = await API.post("/upload", formData, config);

            // Backend now returns the full Cloudinary URL in data.imageUrl
            const fullUrl = data.imageUrl;

            setPreview(fullUrl);
            onUpload(fullUrl);
        } catch (error) {
            console.error("Upload failed", error);
            alert("Image upload failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">
                Profile Image
            </label>

            <div className="flex items-center gap-4">
                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-lg border border-gray-700"
                    />
                )}

                <label className="cursor-pointer bg-gray-800 border border-gray-700 hover:border-amber-500 text-white px-4 py-2 rounded-lg transition flex items-center gap-2">
                    {uploading ? (
                        <span>Uploading...</span>
                    ) : (
                        <>
                            <span>📷 Upload Photo</span>
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={uploading}
                            />
                        </>
                    )}
                </label>
            </div>
        </div>
    );
}
