import express from 'express';
import { getUserDetails, login, signup, updateUserDetails } from '../controllers/user-controller.js';

const router = express.Router();

router.get('/:username', getUserDetails)
router.post('/signup', signup)
router.post('/login', login )
router.put('/update/:username', updateUserDetails)
export default router;