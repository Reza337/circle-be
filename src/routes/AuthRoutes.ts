import { Router } from "express";
import AuthControllers from "../controllers/AuthControllers";
import { authenticate } from "../middlewares/Auth";
// import { jwtAuth } from "../middlewares/jwtAuth";

const AuthRoutes = Router();

// POST | /register
AuthRoutes.post("/auth/register", AuthControllers.register);
// POST | /login
AuthRoutes.post("/auth/login", AuthControllers.login);
//GET | /check
AuthRoutes.get("/auth/check", authenticate, AuthControllers.check);

export default AuthRoutes;
