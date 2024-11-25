const express = require('express');
const { authenticate } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');
const {
  getAllUsers,
  getUserDetails,
  updateUserRole,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

// Get all users (Admin only)
router.get('/', authenticate, authorize(['Admin']), getAllUsers);

// Get details of the logged-in user
router.get('/me', authenticate, getUserDetails);

// Update a user's role (Admin only)
router.put('/role', authenticate, authorize(['Admin']), updateUserRole);

// Delete a user (Admin only)
router.delete('/:userId', authenticate, authorize(['Admin']), deleteUser);

module.exports = router;