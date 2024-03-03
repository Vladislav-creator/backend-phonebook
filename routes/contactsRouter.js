import express from "express";
import {
	getAllContacts,
	deleteContact,
	createContact,
} from "../controllers/contactsControllers.js";
import { authenticate } from "../middlewares/authenticate.js";
import { createContactSchema } from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";
import isValidId from "../middlewares/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, getAllContacts);

contactsRouter.delete("/:contactId", authenticate, isValidId, deleteContact);

contactsRouter.post(
	"/",
	authenticate,
	validateBody(createContactSchema),
	createContact
);

export default contactsRouter;