"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidator = void 0;
const zod_1 = require("zod");
// Validator for user auth (username and password)
exports.authValidator = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z
            .string({
            required_error: "Username is required",
        })
            .min(3, "Username must be at least 3 characters long")
            .max(30, "Username must not exceed 30 characters")
            .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
            .nonempty("Username is required"),
        password: zod_1.z
            .string({
            required_error: "Password is required",
        })
            .min(8, "Password must be at least 8 characters long")
            .max(128, "Password must not exceed 128 characters")
            .nonempty("Password is required"),
    }),
});
