import mongoose from 'mongoose';

export const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGO_CNN, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('db online');
	} catch (error) {
		console.log(error);
		throw new Error('Error en la conexión');
	}
};
