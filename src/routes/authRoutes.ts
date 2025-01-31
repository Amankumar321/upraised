import express from "express";
import { login, signup } from "../api/auth";
import { validateRequest } from "../middleware/validate";
import { authValidator } from "../validators/authSchema";

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to get a JWT token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *                 description: Username for login
 *               password:
 *                 type: string
 *                 example: "strongPassword123"
 *                 description: Password for login
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated user
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */
router.post("/login", validateRequest(authValidator), login);

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *                 description: Username for login
 *               password:
 *                 type: string
 *                 example: "strongPassword123"
 *                 description: Password for login
 *     responses:
 *       201:
 *         description: Successfully created a new user, returns JWT token.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
router.post("/signup", validateRequest(authValidator), signup);

export default router;
