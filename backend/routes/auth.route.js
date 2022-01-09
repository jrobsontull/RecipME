import express from 'express';
import AuthCtrl from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/register').post(AuthCtrl.apiRegisterUser);
router.route('/login').post(AuthCtrl.apiLoginUser);
router.route('/update-settings').put(AuthCtrl.apiUpdateSettings);
router.route('/verify').post(AuthCtrl.apiVerifyToken);

export default router;