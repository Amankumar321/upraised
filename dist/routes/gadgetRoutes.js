"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gadget_1 = require("../api/gadget");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const gadgetSchema_1 = require("../validators/gadgetSchema");
const router = express_1.default.Router();
/**
 * @swagger
 * /gadgets:
 *   get:
 *     summary: Retrieve all gadgets
 *     description: Get a list of all gadgets, optionally filtered by status. Each gadget includes a randomly generated mission success probability.
 *     tags:
 *       - Gadgets
 *     parameters:
 *       - name: status
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: ["AVAILABLE", "DEPLOYED", "DESTROYED", "DECOMMISSIONED"]
 *         description: Filter gadgets by status.
 *     responses:
 *       200:
 *         description: Successfully retrieved gadgets.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   name:
 *                     type: string
 *                   status:
 *                     type: string
 *                     enum: ["AVAILABLE", "DEPLOYED", "Destroyed", "DECOMMISSIONED"]
 *                   missionSuccessProbability:
 *                     type: integer
 *                     description: Randomly generated mission success probability (0-100%).
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
router.get("/", auth_1.authenticateJWT, (0, validate_1.validateRequest)(gadgetSchema_1.getGadgetsValidator), gadget_1.getGadgets);
/**
 * @swagger
 * /gadgets:
 *   post:
 *     summary: Add a new gadget
 *     tags:
 *       - Gadgets
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "The Nightingale"
 *                 description: Optional name. If not provided, a codename will be generated.
 *     responses:
 *       201:
 *         description: Gadget added successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
router.post("/", auth_1.authenticateJWT, (0, validate_1.validateRequest)(gadgetSchema_1.createGadgetValidator), gadget_1.createGadget);
/**
 * @swagger
 * /gadgets/{id}:
 *   patch:
 *     summary: Update a gadget
 *     tags:
 *       - Gadgets
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: ["AVAILABLE", "DEPLOYED", "Destroyed", "DECOMMISSIONED"]
 *     responses:
 *       200:
 *         description: Gadget updated successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Gadget not found.
 */
router.patch("/:id", auth_1.authenticateJWT, (0, validate_1.validateRequest)(gadgetSchema_1.updateGadgetValidator), gadget_1.updateGadget);
/**
 * @swagger
 * /gadgets/{id}/decommission:
 *   post:
 *     summary: Decommission a gadget
 *     tags:
 *       - Gadgets
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gadget successfully DECOMMISSIONED.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Gadget not found.
 */
router.post("/:id/decommission", auth_1.authenticateJWT, (0, validate_1.validateRequest)(gadgetSchema_1.decommissionGadgetValidator), gadget_1.decommissionGadget);
/**
 * @swagger
 * /gadgets/{id}/self-destruct:
 *   post:
 *     summary: Self-destruct a gadget
 *     tags:
 *       - Gadgets
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gadget self-destructed.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Gadget not found.
 */
router.post("/:id/self-destruct", auth_1.authenticateJWT, (0, validate_1.validateRequest)(gadgetSchema_1.selfDestructGadgetValidator), gadget_1.selfDestructGadget);
exports.default = router;
