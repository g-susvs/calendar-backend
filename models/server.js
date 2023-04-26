import express from 'express';
import cors from 'cors';
import { authRoutes, eventsRoutes } from '../router/index.js';
import { dbConnection } from '../db/dbConnection.js';

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT || 8080;

		this.db();
		this.middlewares();
		this.routes();
	}

	async db() {
		await dbConnection();
	}

	middlewares() {
		this.app.use(cors());
		this.app.use(express.static('public'));
		this.app.use(express.json());
	}

	routes() {
		this.app.use('/api/auth', authRoutes);
		this.app.use('/api/event', eventsRoutes);
	}

	listen() {
		this.app.listen(this.port, () =>
			console.log(`http://localhost:${this.port}`)
		);
	}
}

export default Server;
