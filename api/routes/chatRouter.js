
import express from "express";
import {
  getMessages,
  sendMessage
} from "../controllers/chatController.js";

const router = express.Router();

// Haetaan ryhmän viestit
router.get("/:groupId/messages", getMessages);

// Lähetetään uusi viesti ryhmään
router.post("/:groupId/messages", sendMessage);

export default router;
