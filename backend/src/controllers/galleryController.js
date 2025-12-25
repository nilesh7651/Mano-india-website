const Gallery = require("../models/Gallery");

// GET ALL GALLERY ITEMS (PUBLIC)
const getGallery = async (req, res) => {
    try {
        const items = await Gallery.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ADD GALLERY ITEM (ADMIN)
const addGalleryItem = async (req, res) => {
    try {
        const { title, type, imageUrl, description } = req.body;

        if (!title || !imageUrl) {
            return res.status(400).json({ message: "Title and Image are required" });
        }

        const newItem = await Gallery.create({
            title,
            type,
            imageUrl,
            description,
        });

        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE GALLERY ITEM (ADMIN)
const deleteGalleryItem = async (req, res) => {
    try {
        const item = await Gallery.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: "Gallery item not found" });
        }

        await item.deleteOne();
        res.json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getGallery,
    addGalleryItem,
    deleteGalleryItem,
};
