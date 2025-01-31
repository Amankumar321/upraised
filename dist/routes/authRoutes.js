"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../api/auth");
const validate_1 = require("../middleware/validate");
const authSchema_1 = require("../validators/authSchema");
const router = express_1.default.Router();
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
router.post("/login", (0, validate_1.validateRequest)(authSchema_1.authValidator), auth_1.login);
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
router.post("/signup", (0, validate_1.validateRequest)(authSchema_1.authValidator), auth_1.signup);
exports.default = router;
