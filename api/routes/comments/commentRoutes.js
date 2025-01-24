import express from "express";
import { authMiddleware } from "../../middleware/auth/authMiddleware";
import {
  createCommentController,
  deleteCommentController,
  fetchAllCommentController,
  fetchCommentsByPostController,
  fetchSingleCommentController,
  updateCommentController,
} from "../../controllers/comments/commentController";

export const commentRoute = express.Router();

// create comment
/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Create a new comment
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Comment created successfully.
 *       400:
 *         description: Bad Request
 */
commentRoute.post("/", authMiddleware, createCommentController);

commentRoute.get("/post/:postId", fetchCommentsByPostController);

// get all comments
/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Retrieve all comments
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all comments.
 */
commentRoute.get("/", authMiddleware, fetchAllCommentController);

// get single comment
/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     summary: Retrieve a single comment by ID
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the comment to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single comment object.
 *       404:
 *         description: Comment not found.
 */
commentRoute.get("/:id", authMiddleware, fetchSingleCommentController);

// update comment
/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     summary: Update a comment by ID
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the comment to update.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment updated successfully.
 *       404:
 *         description: Comment not found.
 */
commentRoute.put("/:id", authMiddleware, updateCommentController);

// delete comment
/**
 * @swagger
 * /api/comments/delete/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the comment to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Comment deleted successfully.
 *       404:
 *         description: Comment not found.
 */
commentRoute.delete("/delete/:id", authMiddleware, deleteCommentController);
