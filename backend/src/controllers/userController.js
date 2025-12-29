const User = require("../models/User");

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = req.body.name || user.name;
        user.phone = req.body.phone || user.phone;
        // Email updates are restricted or require re-verification usually, so sticking to name and phone for now.

        if (req.body.password) {
            // Assuming user model handles hashing in pre-save hook?
            // Let's check User model later, but standard practice is usually yes.
            // But for this task, user only asked for "profile" update mainly for phone.
            // I'll skip password update logic here to avoid complexity unless requested.
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            role: updatedUser.role,
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
};
