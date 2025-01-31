import { Request, Response } from "express";
import prisma from "../prisma";
import { Gadget, Status } from "@prisma/client";


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
export const getGadgets = async (req: Request, res: Response) => {
  const { status } = req.query;

  try {
    const gadgets: Gadget[] = await prisma.gadget.findMany({
      where: status ? { status: status as Status } : {},
    });
  
    const gadgetsWithProbability = gadgets.map((gadget) => ({
      ...gadget,
      missionSuccessProbability: getSuccessProbability(),
    }));
  
    res.json(gadgetsWithProbability);
  }
  catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


// POST: Add a new gadget (with optional name)
export const createGadget = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const gadget = await prisma.gadget.create({
      data: {
        name: name || generateCodename(),
      },
    });
    res.status(201).json(gadget);
  }
  catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


// PATCH: Update a gadget
export const updateGadget = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, status } = req.body;
  
  try {
    // Check if gadget exists
    const existingGadget = await prisma.gadget.findUnique({ where: { id } });
    if (!existingGadget) {
      res.status(404).json({ error: "Gadget not found" });
      return;
    }
    // Check if gadget is not DECOMMISSIONED
    else if (existingGadget.status === Status.DECOMMISSIONED) {
      res.status(400).json({ error: "Cannot update a decommissioned gadget" });
      return;
    }

    const updatedGadget = await prisma.gadget.update({
      where: { id },
      data: { name, status, decommissionedAt: status === Status.DECOMMISSIONED ? new Date() : null },
    });

    res.json(updatedGadget);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


// DELETE: Decommission a gadget
export const decommissionGadget = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Check if gadget exists
    const existingGadget = await prisma.gadget.findUnique({ where: { id } });
    if (!existingGadget) {
      res.status(404).json({ error: "Gadget not found" });
      return;
    }
    // Check if gadget is not DECOMMISSIONED
    else if (existingGadget.status === Status.DECOMMISSIONED) {
      res.status(400).json({ error: "Gadget is already decommissioned" });
      return;
    }

    const decommissionedGadget = await prisma.gadget.update({
      where: { id },
      data: { status: Status.DECOMMISSIONED, decommissionedAt: new Date() },
    });

    res.json(decommissionedGadget);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


// POST: Self-destruct a gadget (confirmation code required)
export const selfDestructGadget = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Check if gadget exists
    const existingGadget = await prisma.gadget.findUnique({ where: { id } });
    if (!existingGadget) {
      res.status(404).json({ error: "Gadget not found" });
      return;
    }
    // Check if gadget is not DECOMMISSIONED
    else if (existingGadget.status === Status.DECOMMISSIONED) {
      res.status(400).json({ error: "Cannot self-destruct a decommissioned gadget" });
      return;
    }

    // Generate confirmation code
    const confirmationCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const updatedGadget = await prisma.gadget.update({
      where: { id },
      data: { status: Status.DESTROYED },
    });

    res.json({
      message: `Gadget ${id} has been self-destructed.`,
      confirmationCode: confirmationCode,
      gadget: updatedGadget,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

