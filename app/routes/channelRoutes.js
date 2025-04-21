const { Router } = require('express');
const controller = require('../controllers/channelController');
const { authenticateUser } = require('../middlewares/authMiddlewares');
const { hasSuperAdminPermissions } = require('../middlewares/adminMiddlewares');

const router = Router();

// GENERAL ROUTES //
router.get( '/', controller.getAllChannels );
// END OF GENERAL ROUTES //

// ADMIN ROUTES //
router.post( '/', authenticateUser, hasSuperAdminPermissions, controller.createChannel );
// END OF ADMIN ROUTES //

module.exports = router;