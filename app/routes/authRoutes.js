const { Router } = require('express');
const controller = require('../controllers/authController');
const { authenticateUser } = require('../middlewares/authMiddlewares');

const router = Router();

// USER ROUTES //
router.post( '/register/user', controller.registerUser );
router.post( '/login/user', controller.loginUser );
// END OF USER ROUTES //

// GENERAL ROUTES //
router.post( '/register/security', controller.setSecurityPin );
// END OF GENERAL ROUTES //

// ADMIN ROUTES //
router.post( '/register/admin', controller.registerAdmin );
router.post( '/register/super', controller.registerSuperAdmin );
router.post( '/login/admin', controller.loginAdmin );
// END OF ADMIN ROUTES //

module.exports = router;