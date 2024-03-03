import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";

import { User } from "../db/models/User.js";
const { SECRET_KEY } = process.env;

export const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  
  // Логирование токена из заголовка запроса
  console.log("Токен из заголовка:", token);

  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    // Логирование ID из токена
    console.log("ID из токена:", id);

    const user = await User.findById(id);

    // Логирование токена из базы данных
    console.log("Токен из базы данных:", user.token);

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Not authorized"));
    }
    
    // Логирование успешной аутентификации
    console.log("Аутентификация успешна");

    req.user = user;
    next();
  } catch (error) {
    // Логирование ошибок при аутентификации
    console.error("Ошибка при аутентификации:", error);
    next(HttpError(401));
  }
};