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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const zod_1 = require("zod");
/**
 * Middleware to validate request body, query, and params
 * @param validator - The Zod validation schema to use
 */
const validateRequest = (validator) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Parse the request body, query, and params using the validator schema
        yield validator.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        // Validation passed, proceed to next middleware
        next();
    }
    catch (error) {
        // Handle Zod validation errors
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({ msg: error.issues[0].message });
            return;
        }
        // Handle general server errors
        res.status(500).json({ msg: "Internal Error" });
        return;
    }
});
exports.validateRequest = validateRequest;
