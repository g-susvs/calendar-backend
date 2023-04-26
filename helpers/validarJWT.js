import { request } from 'express';
import jwt from 'jsonwebtoken';

export const validarJWT = (req = request, res, next) => {
	const token = req.header('x-token');
	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: 'No hay token en la petición',
		});
	}

	try {
		// const tokenVerify = jwt.verify(token, process.env.SECRECT_KEY, (e, token) => {
		//     if(e){
		//         console.log('============')
		//         console.log(e)
		//         console.log('============')
		//         return res.status(500).json({
		//             ok: false,
		//             msg: 'token no valido'
		//         })
		//     }
		//     return token
		// })
		// const {uid, name} = tokenVerify
		// req.uid = uid
		// req.name = name

		jwt.verify(token, process.env.SECRECT_KEY, (err, data) => {
			if (err) {
				throw err;
			}
			const { uid, name } = data;
			req.uid = uid;
			req.name = name;
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'token no valido',
			error,
		});
	}

	next();
};
