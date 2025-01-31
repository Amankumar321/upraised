"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decommissionGadgetValidator = exports.selfDestructGadgetValidator = exports.updateGadgetValidator = exports.createGadgetValidator = exports.getGadgetsValidator = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client"); // Import Prisma Status Enum
// Validator for the GET /gadgets route (query validation for status filter)
exports.getGadgetsValidator = zod_1.z.object({
    query: zod_1.z.object({
        // Optional status filter for retrieving gadgets by status
        status: zod_1.z.nativeEnum(client_1.Status).optional(), // Status is optional for update, but if provided, it must be a valid status
    }),
});
// Validator for the POST /gadgets route (body validation for name)
exports.createGadgetValidator = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(4, "Name must be at least 4 characters long")
            .optional(), // Name is optional for update, but if provided, it must meet the length condition
    }),
});
exports.updateGadgetValidator = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z
            .string()
            .uuid("Invalid UUID format"),
    }),
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(4, "Name must be at least 4 characters long")
            .optional(), // Name is optional for update, but if provided, it must meet the length condition
        status: zod_1.z
            .nativeEnum(client_1.Status, {
            invalid_type_error: "Status must be one of the valid values",
        })
            .optional(), // Status is optional for update, but if provided, it must be a valid status
    }).partial(), // Allow partial updates (name, status can be updated independently)
});
// Validator for the POST /gadgets/:id/self-destruct route (params validation for id)
exports.selfDestructGadgetValidator = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z
            .string({
            required_error: "ID is required",
        })
            .uuid("Invalid UUID format"),
    }),
});
// Validator for the DELETE /gadgets/:id/decommission route (params validation for id)
exports.decommissionGadgetValidator = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z
            .string({
            required_error: "ID is required",
        })
            .uuid("Invalid UUID format"),
    }),
});
