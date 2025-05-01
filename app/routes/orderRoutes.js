const { Router } = require('express');
const controller = require('../controllers/orderController');
const { authenticateUser } = require('../middlewares/authMiddlewares');
const { hasAdminPermissions } = require('../middlewares/adminMiddlewares');

const router = Router();

// USER ROUTES //
router.get( '/user', authenticateUser, controller.userGetAllOrders );
router.put( '/user/:orderId', authenticateUser, controller.confirmOrder );
// END OF USER ROUTES //

// ADMIN ROUTES //
router.get( '/admin', authenticateUser, hasAdminPermissions, controller.adminGetAllOrders );
router.post( '/admin', authenticateUser, hasAdminPermissions, controller.createNewOrder );
// END OF ADMIN ROUTES //

module.exports = router;