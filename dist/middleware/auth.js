"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    //Check if token is provided
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        req.user = decoded;
        // Authentication passed, proceed to next middleware
        next();
    }
    catch (error) {
        res.status(403).json({ error: "Invalid token" });
        return;
    }
};
exports.authenticateJWT = authenticateJWT;
