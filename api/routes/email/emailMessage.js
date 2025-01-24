import express from "express";
import { sendEmailMessageController } from "../../controllers/email/emailMessage";
import { authMiddleware } from "../../middleware/auth/authMiddleware";

export const emailRoutes = express.Router();

/**
 * @swagger
 * /api/email:
 *   post:
 *     summary: Send an email message
 *     tags:
 *       - Email
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Email message sent successfully.
 *       400:
 *         description: Bad request (e.g., missing required fields).
 */
emailRoutes.post("/", authMiddleware, sendEmailMessageController);
