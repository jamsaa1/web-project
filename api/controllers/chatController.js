
import {
  getGroupMessages,
  createGroupMessage,
  isGroupMember
} from "../models/chatModel.js";

// Hakee ryhmän chatviestit
export async function getMessages(req, res) {
  try {
    const groupId = Number(req.params.groupId);
    const userId = req.session?.userId;

    // Tarkistetaan kirjautuminen
    if (!userId) {
      return res.status(401).json({
        error: "Kirjaudu sisään nähdäksesi viestit"
      });
    }

    // Tarkistetaan ryhmän tunniste
    if (!Number.isInteger(groupId) || groupId <= 0) {
      return res.status(400).json({
        error: "Virheellinen ryhmätunniste"
      });
    }

    // Tarkistetaan ryhmän jäsenyys
    const member = await isGroupMember(groupId, userId);

    if (!member) {
      return res.status(403).json({
        error: "Et kuulu tähän ryhmään"
      });
    }

    // Haetaan ryhmän viestit
    const messages = await getGroupMessages(groupId);

    return res.json(messages);

  } catch (error) {
    console.error("Get messages error:", error);

    return res.status(500).json({
      error: "Viestien hakeminen epäonnistui"
    });
  }
}

 // Lähettää uuden viestin ryhmän chattiin
export async function sendMessage(req, res) {
  try {
    const groupId = Number(req.params.groupId);
    const userId = req.session?.userId;
    const { messageText } = req.body ?? {};

    // Tarkistetaan kirjautuminen
    if (!userId) {
      return res.status(401).json({
        error: "Kirjaudu sisään lähettääksesi viestin"
      });
    }

    // Tarkistetaan ryhmän tunniste
    if (!Number.isInteger(groupId) || groupId <= 0) {
      return res.status(400).json({
        error: "Virheellinen ryhmätunniste"
      });
    }

    // Tarkistetaan viestin sisältö
    if (
      typeof messageText !== "string" ||
      !messageText.trim() ||
      messageText.length > 2000
    ) {
      return res.status(400).json({
        error: "Viestin tulee olla 1–2000 merkkiä pitkä"
      });
    }

    // Tarkistetaan ryhmän jäsenyys
    const member = await isGroupMember(groupId, userId);

    if (!member) {
      return res.status(403).json({
        error: "Et kuulu tähän ryhmään"
      });
    }

    // Tallennetaan viesti tietokantaan
    const message = await createGroupMessage(
      groupId,
      userId,
      messageText.trim()
    );

    return res.status(201).json(message);

  } catch (error) {
    console.error("Send message error:", error);

    return res.status(500).json({
      error: "Viestin lähettäminen epäonnistui"
    });
  }
}
