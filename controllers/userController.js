const User = require('../models/User');

// Get all users (Admin-only functionality)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude passwords from response
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get user details (Accessible to the logged-in user)
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id, '-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update user role (Admin-only functionality)
exports.updateUserRole = async (req, res) => {
  const { userId, newRole } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.role = newRole;
    await user.save();

    res.status(200).json({ success: true, message: 'User role updated', user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a user (Admin-only functionality)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};