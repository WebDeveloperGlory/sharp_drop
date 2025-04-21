const { Router } = require('express');
const controller = require('../controllers/userController');
const { authenticateUser } = require('../middlewares/authMiddlewares');

const router = Router();

// GENERAL ROUTES //
router.post( '/profile', authenticateUser, controller.getUserProfile );
// END OF GENERAL ROUTES //

module.exports = router;