const { Router } = require('express');
const controller = require('../controllers/userController');
const { authenticateUser } = require('../middlewares/authMiddlewares');
const { hasAdminPermissions } = require('../middlewares/adminMiddlewares');

const router = Router();

// GENERAL ROUTES //
router.get( '/profile', authenticateUser, controller.getUserProfile );
router.delete( '/profile/delete', authenticateUser, controller.deleteSelf );
router.delete( '/profile/delete/:userId', authenticateUser, hasAdminPermissions, controller.deleteUser );
router.get( '/referrals/personal', authenticateUser, controller.getUserReferrals );
router.post( '/referrals/generate', authenticateUser, controller.generateReferralCode );
router.post( '/referrals/validate/:referralCode', controller.validateReferralCode );
// END OF GENERAL ROUTES //

module.exports = router;