import { User } from "../db/models/User.js";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import HttpError from "../helpers/HttpError.js";

const { SECRET_KEY } = process.env;
export const register = async (req, res, next) => {
	try {
		const { email, name } = req.body;
		const user = await User.findOne({ email });

		if (user) {
			throw HttpError(409, "User already exist");
		}

		const avatarURL = gravatar.url(email);

		const newUser = new User({ ...req.body, avatar: avatarURL });
		await newUser.hashPassword();
		await newUser.save();
		const payload = {
			id: newUser._id,
		};

		const token = jwt.sign(payload, SECRET_KEY);
		await User.findByIdAndUpdate(newUser._id, { token });
		res.status(201).json({
			token,
			user: {
				name,
				email,
				avatarURL,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			throw HttpError(401, "email or password is wrong");
		}
		const passwordCorrect = await user.comparePassword(password);
		console.log("passwordCorrect", passwordCorrect);
		if (!passwordCorrect) {
			throw HttpError(401, "email or password is wrong");
		}
		const payload = {
			id: user._id,
		};
		const token = jwt.sign(payload, SECRET_KEY);
		await User.findByIdAndUpdate(user._id, { token });
		res.status(200).json({
			token,
			user: {
				name: user.name,
				email,
				avatarURL: user.avatarURL,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const getCurrent = (req, res) => {
	const { email, name, avatarURL } = req.user;
	res.status(200).json({ email, name, avatarURL });
};

export const logout = async (req, res) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: "" });

	res.sendStatus(204);
};