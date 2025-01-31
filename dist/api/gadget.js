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
exports.selfDestructGadget = exports.decommissionGadget = exports.updateGadget = exports.createGadget = exports.getGadgets = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const client_1 = require("@prisma/client");
// Generate a random mission success probability
const getSuccessProbability = () => `${Math.floor(Math.random() * 100)}%`;
// Generate a random codename
const generateCodename = () => {
    const codenames = [
        "The Nightingale",
        "The Kraken",
        "Phantom Shadow",
        "Ghost Viper",
        "Iron Specter",
        "Shadowfang",
        "Echo Phantom",
        "Nova Serpent",
        "Silent Wraith",
        "Aether Blade",
        "Storm Harbinger",
        "Void Stalker",
        "Obsidian Falcon",
        "Cyber Revenant",
        "Neon Mirage",
        "Titan Whisper",
        "Omega Striker",
        "Black Phoenix",
        "Spectral Harbinger",
        "Eclipse Phantom",
        "Venom Shroud",
        "Hyper Chimera",
        "Onyx Ghost",
        "Sentinel Hawk",
        "Vortex Reaper"
    ];
    return codenames[Math.floor(Math.random() * codenames.length)];
};
// GET: Retrieve all gadgets (with optional status filter)
const getGadgets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = req.query;
    try {
        const gadgets = yield prisma_1.default.gadget.findMany({
            where: status ? { status: status } : {},
        });
        const gadgetsWithProbability = gadgets.map((gadget) => (Object.assign(Object.assign({}, gadget), { missionSuccessProbability: getSuccessProbability() })));
        res.json(gadgetsWithProbability);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getGadgets = getGadgets;
// POST: Add a new gadget (with optional name)
const createGadget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const gadget = yield prisma_1.default.gadget.create({
            data: {
                name: name || generateCodename(),
            },
        });
        res.status(201).json(gadget);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.createGadget = createGadget;
// PATCH: Update a gadget
const updateGadget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, status } = req.body;
    try {
        // Check if gadget exists
        const existingGadget = yield prisma_1.default.gadget.findUnique({ where: { id } });
        if (!existingGadget) {
            res.status(404).json({ error: "Gadget not found" });
            return;
        }
        // Check if gadget is not DECOMMISSIONED
        else if (existingGadget.status === client_1.Status.DECOMMISSIONED) {
            res.status(400).json({ error: "Cannot update a decommissioned gadget" });
            return;
        }
        const updatedGadget = yield prisma_1.default.gadget.update({
            where: { id },
            data: { name, status, decommissionedAt: status === client_1.Status.DECOMMISSIONED ? new Date() : null },
        });
        res.json(updatedGadget);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateGadget = updateGadget;
// DELETE: Decommission a gadget
const decommissionGadget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Check if gadget exists
        const existingGadget = yield prisma_1.default.gadget.findUnique({ where: { id } });
        if (!existingGadget) {
            res.status(404).json({ error: "Gadget not found" });
            return;
        }
        // Check if gadget is not DECOMMISSIONED
        else if (existingGadget.status === client_1.Status.DECOMMISSIONED) {
            res.status(400).json({ error: "Gadget is already decommissioned" });
            return;
        }
        const decommissionedGadget = yield prisma_1.default.gadget.update({
            where: { id },
            data: { status: client_1.Status.DECOMMISSIONED, decommissionedAt: new Date() },
        });
        res.json(decommissionedGadget);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.decommissionGadget = decommissionGadget;
// POST: Self-destruct a gadget (confirmation code required)
const selfDestructGadget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Check if gadget exists
        const existingGadget = yield prisma_1.default.gadget.findUnique({ where: { id } });
        if (!existingGadget) {
            res.status(404).json({ error: "Gadget not found" });
            return;
        }
        // Check if gadget is not DECOMMISSIONED
        else if (existingGadget.status === client_1.Status.DECOMMISSIONED) {
            res.status(400).json({ error: "Cannot self-destruct a decommissioned gadget" });
            return;
        }
        // Generate confirmation code
        const confirmationCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        const updatedGadget = yield prisma_1.default.gadget.update({
            where: { id },
            data: { status: client_1.Status.DESTROYED },
        });
        res.json({
            message: `Gadget ${id} has been self-destructed.`,
            confirmationCode: confirmationCode,
            gadget: updatedGadget,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.selfDestructGadget = selfDestructGadget;
