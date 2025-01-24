import express from "express";
import { authMiddleware } from "../../middleware/auth/authMiddleware";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  getSingleCategoryController,
  updateCategoryController,
} from "../../controllers/category/categoryController";

export const categoryRoutes = express.Router();

// create category
/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Category created successfully.
 *       400:
 *         description: Bad Request
 */
categoryRoutes.post("/", authMiddleware, createCategoryController);

// get all categories
/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Retrieve all categories
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all categories.
 */
categoryRoutes.get("/", authMiddleware, getAllCategoriesController);

// get single category
/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Retrieve a single category by ID
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the category to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single category object.
 *       404:
 *         description: Category not found.
 */
categoryRoutes.get("/:id", authMiddleware, getSingleCategoryController);

// update category
/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the category to update.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *       404:
 *         description: Category not found.
 */
categoryRoutes.put("/:id", authMiddleware, updateCategoryController);

// delete category
/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the category to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Category deleted successfully.
 *       404:
 *         description: Category not found.
 */
categoryRoutes.delete("/:id", authMiddleware, deleteCategoryController);
