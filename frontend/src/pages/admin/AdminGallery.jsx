import { useEffect, useState } from "react";
import API from "../../services/api";
import ImageUpload from "../../components/ImageUpload";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";

export default function AdminGallery() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        title: "",
        type: "Wedding",
        imageUrl: "",
        description: "",
    });

    useEffect(() => {
        loadGallery();
    }, []);

    const loadGallery = async () => {
        try {
            const res = await API.get("/gallery");
            setItems(res.data);
        } catch (err) {
            console.error("Failed to load gallery", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!form.imageUrl) return alert("Image is required");

        try {
            await API.post("/gallery", form);
            setForm({ title: "", type: "Wedding", imageUrl: "", description: "" });
            loadGallery();
            alert("Image added to gallery!");
        } catch (err) {
            alert("Failed to add image");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this image?")) return;
        try {
            await API.delete(`/gallery/${id}`);
            loadGallery();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Gallery Manager</h1>
                <p className="text-gray-600">Manage images in the Home Page carousel</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* ADD FORM */}
                <Card className="lg:col-span-1 h-fit">
                    <h2 className="text-xl font-bold mb-4">Add New Image</h2>
                    <form onSubmit={handleAdd} className="space-y-4">
                        <Input
                            label="Title"
                            placeholder="e.g. Royal Wedding"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            required
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select
                                className="w-full px-4 py-2 rounded-xl border border-gray-200"
                                value={form.type}
                                onChange={(e) => setForm({ ...form, type: e.target.value })}
                            >
                                <option>Wedding</option>
                                <option>Concert</option>
                                <option>Corporate</option>
                                <option>Party</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <Input
                            label="Description (Optional)"
                            placeholder="Short description..."
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                            <ImageUpload
                                onUpload={(url) => setForm({ ...form, imageUrl: url })}
                                existingImage={form.imageUrl}
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            Add to Gallery
                        </Button>
                    </form>
                </Card>

                {/* LIST */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold mb-4">Current Images ({items.length})</h2>

                    {loading ? (
                        <p className="animate-pulse">Loading...</p>
                    ) : items.length === 0 ? (
                        <p className="text-gray-500 italic">No images in gallery yet.</p>
                    ) : (
                        <div className="grid sm:grid-cols-2 gap-4">
                            {items.map(item => (
                                <div key={item._id} className="group relative rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                                        <Button variant="danger" size="sm" onClick={() => handleDelete(item._id)}>
                                            Delete
                                        </Button>
                                    </div>
                                    <div className="p-3 bg-white">
                                        <h3 className="font-bold text-gray-900">{item.title}</h3>
                                        <p className="text-xs text-amber-600 font-bold uppercase">{item.type}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
