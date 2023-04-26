import { request } from 'express';
import Event from '../models/event.js';
const getEventos = async (req, res) => {
	try {
		const events = await Event.find().populate('user', 'name');

		return res.status(200).json({
			ok: true,
			msg: 'getEventos',
			events,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		});
	}
};

const crearEventos = async (req, res) => {
	try {
		const body = req.body;
		const uid = req.uid;

		const event = new Event(body);

		event.user = uid;

		await event.save();

		return res.status(200).json({
			ok: true,
			msg: 'crearEvento',
			event,
		});
	} catch (error) {
		console.log(error);
		return req.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		});
	}
};

const actualizarEvento = async (req = request, res) => {
	try {
		const eventoId = req.params.id;

		const evento = await Event.findById(eventoId);

		if (!evento) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe evento con id ' + eventoId,
			});
		}

		const uid = req.uid;
		if (evento.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: 'No tiene privilegios para modificar el evento',
			});
		}

		const nuevoEvento = {
			...req.body,
			user: uid,
		};
		const eventoActualizado = await Event.findByIdAndUpdate(
			eventoId,
			nuevoEvento,
			{ new: true }
		);

		return res.status(200).json({
			ok: true,
			msg: 'actualizarEvento',
			evento: eventoActualizado,
		});
	} catch (error) {
		console.log(error);
		return req.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		});
	}
};
const eliminarEvento = async (req, res) => {
	try {
		const eventoId = req.params.id;

		const evento = await Event.findById(eventoId);

		if (!evento) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe evento con id ' + eventoId,
			});
		}

		const uid = req.uid;
		if (evento.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: 'No tiene privilegios para modificar el evento',
			});
		}

		await Event.findByIdAndDelete(eventoId);

		return res.status(200).json({
			ok: true,
			msg: 'eliminarEvento',
		});
	} catch (error) {
		console.log(error);
		return req.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		});
	}
};

export { getEventos, crearEventos, actualizarEvento, eliminarEvento };
