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

            // Backend returns relative path: /uploads/filename.jpg
            // We prepend the server origin for display if needed, but for now we store the relative path
            // Actually, let's store the full URL if possible or just the relative one.
            // The current frontend displays images directly from the URL string.
            // If we store "/uploads/...", we need to make sure the img src handles it.
            // Let's prepend the localhost:5000 for now to make it a full URL, 
            // or handle it in the Card components. 
            // For simplicity, let's store the full URL in the DB so existing external URLs still work.

            const fullUrl = `http://localhost:5000${data.imageUrl}`;

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
