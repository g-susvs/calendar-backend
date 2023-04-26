import { Router } from 'express';
import {
	crearUsuario,
	loginUsuario,
	revalidarToken,
} from '../controllers/auth.js';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validateFields.js';
import { validarJWT } from '../helpers/validarJWT.js';

const router = Router();

router.post(
	'/new',
	[
		check('name', 'El nombre es obligatorio').notEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		check('password', 'El password debe tener 6 caracteres mínimo').isLength({
			min: 6,
		}),
		validateFields,
	],
	crearUsuario
);
router.post(
	'/',
	[
		check('email', 'El email es obligatorio').isEmail(),
		check('password', 'El password debe tener 6 caracteres mínimo').isLength({
			min: 6,
		}),
		validateFields,
	],
	loginUsuario
);
router.get('/renew', validarJWT, revalidarToken);

export default router;
