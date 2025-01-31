"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../prisma")); // Import Prisma client
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Login functionality
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Check if user exists
        const user = yield prisma_1.default.user.findUnique({
            where: { username },
        });
        // Check if user exists and password matches
        if (!user) {
            res.status(401).json({ error: "Invalid username or password" });
            return;
        }
        // Compare the password with the stored hash
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid username or password" });
            return;
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ username }, process.env.JWT_SECRET, {
            expiresIn: "1h", // Token expiry time
        });
        // Send the token as response
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.login = login;
// Signup functionality
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Check if the username already exists
        const existingUser = yield prisma_1.default.user.findUnique({
            where: { username },
        });
        if (existingUser) {
            res.status(400).json({ error: "Username is already taken" });
            return;
        }
        // Hash the password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Create new user
        const user = yield prisma_1.default.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ username }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.status(201).json({ token, user: { id: user.id, username: user.username } });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.signup = signup;
