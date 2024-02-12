import express from "express";
import {
	getCurrent,
	login,
	logout,
	register,
} from "../controllers/usersControllers.js";
import validateBody from "../helpers/validateBody.js";
import { loginSchema, registerSchema } from "../schemas/userSchemas.js";
import { authenticate } from "../middlewares/authenticate.js";

export const usersRouter = express.Router();

usersRouter.post("/signup", validateBody(registerSchema), register);

usersRouter.post("/login", validateBody(loginSchema), login);

usersRouter.get("/current", authenticate, getCurrent);

usersRouter.post("/logout", authenticate, logout);
export default usersRouter;