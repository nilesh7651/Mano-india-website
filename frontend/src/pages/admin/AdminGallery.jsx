import { useEffect, useState } from "react";
import API from "../../services/api";
import ImageUpload from "../../components/ImageUpload";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import { useToast } from "../../components/ui/ToastProvider";

export default function AdminGallery() {
    const { notify } = useToast();
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
        if (!form.imageUrl) {
            notify({ type: "warning", title: "Missing image", message: "Please upload an image first." });
            return;
        }

        try {
            await API.post("/gallery", form);
            setForm({ title: "", type: "Wedding", imageUrl: "", description: "" });
            loadGallery();
            notify({ type: "success", title: "Added", message: "Image added to gallery." });
        } catch (err) {
            notify({
                type: "error",
                title: "Add failed",
                message: err.response?.data?.message || "Failed to add image.",
            });
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
        <div className="space-y-8 bg-black min-h-screen p-6">
            <div className="border-b border-gray-800 pb-6">
                <h1 className="text-3xl font-bold text-white">Gallery Manager</h1>
                <p className="text-gray-400">Manage images in the Home Page carousel</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* ADD FORM */}
                <Card className="lg:col-span-1 h-fit bg-gray-900 border-gray-800 text-white">
                    <h2 className="text-xl font-bold mb-4 text-white">Add New Image</h2>
                    <form onSubmit={handleAdd} className="space-y-4">
                        <Input
                            label="Title"
                            placeholder="e.g. Royal Wedding"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            required
                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-amber-500"
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Type</label>
                            <select
                                className="w-full px-4 py-2 rounded-xl border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-amber-500"
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
                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-amber-500"
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Upload Image</label>
                            <ImageUpload
                                onUpload={(url) => setForm({ ...form, imageUrl: url })}
                                existingImage={form.imageUrl}
                            />
                        </div>

                        <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                            Add to Gallery
                        </Button>
                    </form>
                </Card>

                {/* LIST */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold mb-4 text-white">Current Images ({items.length})</h2>

                    {loading ? (
                        <p className="animate-pulse text-gray-500">Loading...</p>
                    ) : items.length === 0 ? (
                        <div className="text-center py-12 bg-gray-900 rounded-xl border border-gray-800 border-dashed">
                            <p className="text-gray-500 italic">No images in gallery yet.</p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 gap-6">
                            {items.map(item => (
                                <div key={item._id} className="group relative rounded-xl overflow-hidden border border-gray-800 shadow-lg bg-gray-900 hover:border-amber-500/50 transition-all duration-300">
                                    <div className="h-48 overflow-hidden relative">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                                            <Button variant="danger" size="sm" onClick={() => handleDelete(item._id)} className="bg-red-600 hover:bg-red-700 transform scale-110">
                                                Delete Image
                                            </Button>
                                        </div>
                                        <div className="absolute top-2 left-2">
                                            <span className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-amber-500 border border-amber-500/30 uppercase tracking-wider">
                                                {item.type}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-gray-900">
                                        <h3 className="font-bold text-white text-lg mb-1">{item.title}</h3>
                                        <p className="text-sm text-gray-400 line-clamp-2">{item.description || "No description provided."}</p>
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
