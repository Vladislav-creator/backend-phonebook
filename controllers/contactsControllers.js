// import contactsService from "../services/contactsServices.js";

import { Contact } from "../db/models/Contact.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
	try {
		const { _id: owner } = req.user;
		const result = await Contact.find({ owner });
		res.json(result);
	} catch (error) {
		console.log(error);
	}
};

export const deleteContact = async (req, res) => {
	const { _id: owner } = req.user;
	const { contactId } = req.params;

	const result = await Contact.findOneAndDelete({ owner, _id: contactId });
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.status(200).json({
		message: "Contact deleted",
	});
};

export const createContact = async (req, res) => {
	try {
		const { _id: owner } = req.user;
		const result = await Contact.create({ ...req.body, owner });
		res.status(201).json(result);
	} catch (error) {
		console.log(error);
	}
};