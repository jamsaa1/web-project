
import { pool } from "./db.js";

// Hakee tietyn ryhmän kaikki viestit
export async function getGroupMessages(groupId) {
  const result = await pool.query(
    `SELECT
       gm.message_id,
       gm.group_id,
       gm.user_id,
       gm.message_text,
       gm.created_at,
       u.user_name
     FROM groupmessages_db gm
     JOIN users_db u ON gm.user_id = u.user_id
     WHERE gm.group_id = $1
     ORDER BY gm.created_at ASC, gm.message_id ASC`,
    [groupId]
  );

  return result.rows;
}

// Tallentaa uuden viestin tietokantaan
export async function createGroupMessage(groupId, userId, messageText) {
  const result = await pool.query(
    `INSERT INTO groupmessages_db
       (group_id, user_id, message_text)
     VALUES ($1, $2, $3)
     RETURNING
       message_id,
       group_id,
       user_id,
       message_text,
       created_at,
       (SELECT user_name FROM users_db WHERE user_id = $2) AS user_name`,
    [groupId, userId, messageText]
  );

  return result.rows[0];
}


 // Tarkistaa kuuluuko käyttäjä ryhmään
export async function isGroupMember(groupId, userId) {
  const result = await pool.query(
    `SELECT 1
     FROM groupmembers_db
     WHERE group_id = $1 AND user_id = $2
     LIMIT 1`,
    [groupId, userId]
  );

  return result.rows.length > 0;
}
