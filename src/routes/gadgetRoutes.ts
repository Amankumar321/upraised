import express from "express";
import { getGadgets, createGadget, updateGadget, decommissionGadget, selfDestructGadget } from "../api/gadget";
import { authenticateJWT } from "../middleware/auth";
import { validateRequest } from "../middleware/validate";
import { getGadgetsValidator, createGadgetValidator, updateGadgetValidator, selfDestructGadgetValidator, decommissionGadgetValidator } from "../validators/gadgetSchema";

const router = express.Router();

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
router.get("/", authenticateJWT, validateRequest(getGadgetsValidator), getGadgets);

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
router.post("/", authenticateJWT, validateRequest(createGadgetValidator), createGadget);

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
router.patch("/:id", authenticateJWT, validateRequest(updateGadgetValidator), updateGadget);

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
router.post("/:id/decommission", authenticateJWT, validateRequest(decommissionGadgetValidator), decommissionGadget);

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
router.post("/:id/self-destruct", authenticateJWT, validateRequest(selfDestructGadgetValidator), selfDestructGadget);

export default router;
