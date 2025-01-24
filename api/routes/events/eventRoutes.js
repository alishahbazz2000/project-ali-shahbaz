import {
  createEventController,
  deleteEventController,
  getAllEventsController,
  getEventController,
  updatePostController,
} from "../../controllers/events/eventController";
import express from "express";


export const eventRoute = express.Router();

// Retrieve all events
/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Retrieve all events
 *     tags:
 *       - Events
 *     responses:
 *       200:
 *         description: A list of all events.
 *       500:
 *         description: Internal server error.
 */
eventRoute.get("/", getAllEventsController);

// Create a new event
/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the event.
 *                 example: "Annual Meetup"
 *               description:
 *                 type: string
 *                 description: Detailed description of the event.
 *                 example: "This is a detailed description of the event."
 *               cardDescription:
 *                 type: string
 *                 description: Short description for display cards.
 *                 example: "A short description."
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Date of the event.
 *                 example: "2025-01-22T10:00:00Z"
 *               location:
 *                 type: string
 *                 description: Location of the event.
 *                 example: "New York City"
 *               image:
 *                 type: string
 *                 description: Image URL for the event.
 *                 example: "https://example.com/event-image.jpg"
 *     responses:
 *       201:
 *         description: Event created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
eventRoute.post("/", createEventController);

// Retrieve an event by ID
/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Retrieve an event by ID
 *     tags:
 *       - Events
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "63d9f0e1e1b2f7a1e0a9c123"
 *         description: The unique ID of the event.
 *     responses:
 *       200:
 *         description: Event details retrieved successfully.
 *       404:
 *         description: Event not found.
 *       500:
 *         description: Internal server error.
 */
eventRoute.get("/:id", getEventController);

// Update an event
/**
 * @swagger
 * /api/events/update/{id}:
 *   put:
 *     summary: Update an event
 *     tags:
 *       - Events
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "63d9f0e1e1b2f7a1e0a9c123"
 *         description: The unique ID of the event to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Updated title of the event.
 *               description:
 *                 type: string
 *                 description: Updated detailed description of the event.
 *               cardDescription:
 *                 type: string
 *                 description: Updated short description for display cards.
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Updated date of the event.
 *               location:
 *                 type: string
 *                 description: Updated location of the event.
 *               image:
 *                 type: string
 *                 description: Updated image URL for the event.
 *     responses:
 *       200:
 *         description: Event updated successfully.
 *       404:
 *         description: Event not found.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
eventRoute.put("/update/:id", updatePostController);

// Delete an event
/**
 * @swagger
 * /api/events/delete/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags:
 *       - Events
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "63d9f0e1e1b2f7a1e0a9c123"
 *         description: The unique ID of the event to delete.
 *     responses:
 *       204:
 *         description: Event deleted successfully.
 *       404:
 *         description: Event not found.
 *       500:
 *         description: Internal server error.
 */
eventRoute.delete("/delete/:id", deleteEventController);

