import bcrypt from 'bcryptjs';
import Usuario from '../models/usuario.js';
import { generarJWT } from '../helpers/generarJWT.js';

const crearUsuario = async (req, res) => {
	const { email, password } = req.body;

	try {
		let usuario = await Usuario.findOne({ email });

		if (usuario) {
			return res.status(400).json({
				ok: false,
				msg: `Ya existe un usuario con el email ${email}`,
			});
		}

		usuario = new Usuario(req.body);

		const hash = bcrypt.genSaltSync(10);
		usuario.password = bcrypt.hashSync(password, hash);

		await usuario.save();

		const token = await generarJWT(usuario._id, usuario.name);

		res.status(201).json({
			ok: true,
			uid: usuario._id,
			name: usuario.name,
			token,
		});
	} catch (error) {
		console.log(500);
		res.status(500).json({
			ok: false,
			msg: 'Por favor hable con el administrador',
		});
	}
};
const loginUsuario = async (req, res) => {
	const { email, password } = req.body;

	try {
		const usuario = await Usuario.findOne({ email });

		if (!usuario) {
			return res.status(404).json({
				ok: false,
				msg: `No existe un usuario con el email ${email}`,
			});
		}

		const validatePassword = bcrypt.compareSync(password, usuario.password);

		if (!validatePassword) {
			return res.status(403).json({
				msg: 'La contraseña es incorrecta',
			});
		}

		// generar JWT
		const token = await generarJWT(usuario._id, usuario.name);

		res.json({
			ok: true,
			uid: usuario._id,
			name: usuario.name,
			token,
		});
	} catch (error) {
		console.log(500);
		res.status(500).json({
			ok: false,
			msg: 'Por favor hable con el administrador',
		});
	}
};
const revalidarToken = async (req, res) => {
	const { uid, name } = req;

	const token = await generarJWT(uid, name);

	res.json({
		ok: true,
		uid,
		name,
		token,
	});
};

export { crearUsuario, loginUsuario, revalidarToken };
