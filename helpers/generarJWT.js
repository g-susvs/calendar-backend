import jwt from 'jsonwebtoken';

export const generarJWT = (uid, name) => {
	return new Promise((resolve, reject) => {
		const payload = { uid, name };

		jwt.sign(
			payload,
			process.env.SECRECT_KEY,
			{
				expiresIn: '2h',
			},
			(err, token) => {
				if (err) {
					console.log('No se pudo generar JWT');
					console.log(err);
					reject(err);
				}

				resolve(token);
			}
		);
	});
};
