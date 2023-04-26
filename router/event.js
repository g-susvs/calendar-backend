import { Router } from 'express';
import {
	actualizarEvento,
	crearEventos,
	eliminarEvento,
	getEventos,
} from '../controllers/event.js';
import { validarJWT } from '../helpers/validarJWT.js';
import { param, body } from 'express-validator';
import { validateFields } from '../middlewares/validateFields.js';
import { isDate } from '../helpers/isDate.js';

const router = Router();

// Validaciones por token

router.use(validarJWT);

router.get('/', getEventos);
router.post(
	'/',
	[
		body('title', 'El title es obligatorio').notEmpty(),
		body('start', 'start - Fecha invalida').custom(isDate),
		body('end', 'end - Fecha invalida').custom(isDate),
		validateFields,
	],
	crearEventos
);
router.put(
	'/:id',
	[param('id', 'No es un id valido').isMongoId(), validateFields],
	actualizarEvento
);
router.delete(
	'/:id',
	[param('id', 'No es un id valido').isMongoId(), validateFields],
	eliminarEvento
);

export default router;
