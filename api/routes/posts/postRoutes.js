import express from "express";
import {
  allPostController,
  createPostController,
  deletePostController,
  fetchSinglePostController,
  toggleAddDisLikeToPostController,
  toggleAddLikeToPostController,
  updatePostController,
} from "../../controllers/posts/postController";
import { authMiddleware } from "../../middleware/auth/authMiddleware";
import {
  imageUpload,
  postUploadResize,
} from "../../middleware/upload/imageUpload";

export const postRoute = express.Router();

/**
 * @swagger
 * /api/Posts:
 *   get:
 *     summary: Get all Posts
 *     description: Fetch all Posts with authentication
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched all Posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 */
postRoute.get("/", authMiddleware, allPostController);

/**
 * @swagger
 * /api/Posts:
 *   post:
 *     summary: Create a new todo
 *     description: Create a todo with an image upload, authentication required
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Todo successfully created
 */
postRoute.post(
  "/",
  authMiddleware,
  imageUpload.single("image"),
  postUploadResize,
  createPostController
);

/**
 * @swagger
 * /api/Posts/likes:
 *   put:
 *     summary: Toggle like on a todo
 *     description: Add or remove a like on a todo
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               todoId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Todo liked successfully
 */
postRoute.put("/likes", authMiddleware, toggleAddLikeToPostController);

/**
 * @swagger
 * /api/Posts/dislikes:
 *   put:
 *     summary: Toggle dislike on a todo
 *     description: Add or remove a dislike on a todo
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               todoId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Todo disliked successfully
 */
postRoute.put("/dislikes", authMiddleware, toggleAddDisLikeToPostController);

/**
 * @swagger
 * /api/Posts/{id}:
 *   get:
 *     summary: Get a single todo by ID
 *     description: Fetch details of a specific todo
 *     tags:
 *       - Posts
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the todo to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched todo details
 */
postRoute.get("/:id", authMiddleware, fetchSinglePostController);

/**
 * @swagger
 * /api/Posts/update/{id}:
 *   put:
 *     summary: Update an existing todo
 *     description: Update the title, description, or other details of an existing todo
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the todo to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Todo updated successfully
 */
postRoute.put("/update/:id", authMiddleware, updatePostController);

/**
 * @swagger
 * /api/Posts/delete/{id}:
 *   delete:
 *     summary: Delete a todo
 *     description: Delete a todo by its ID
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the todo to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 */
postRoute.delete("/delete/:id", authMiddleware, deletePostController);
