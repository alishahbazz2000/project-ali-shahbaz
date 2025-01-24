import express from "express";
import {
  accountVerificationController,
  blockUserController,
  deleteUsersCtrl,
  FetchUserDetailsController,
  fetchUsersCtrl,
  followingUserController,
  forgetPasswordToken,
  generateVerificationToken,
  isAdminUserController,
  passwordResetController,
  PhotoUploadController,
  unBlockUserController,
  unFollowingUserController,
  updateUserController,
  updateUserPasswordController,
  userLoginUserCtrl,
  userProfileController,
  userRegisterController,
} from "../../controllers/users/usersController";
import { authMiddleware } from "../../middleware/auth/authMiddleware";
import {
  imageUpload,
  imageUploadResize,
} from "../../middleware/upload/imageUpload";

export const userRoutes = express.Router();
// !=================================================================
// Get list of users
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 */
userRoutes.get("/", authMiddleware, fetchUsersCtrl);
// !=================================================================
// Register a new user
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Bad Request (e.g., missing fields)
 */
userRoutes.post("/register", userRegisterController);
// !=================================================================
// User login
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: User logged in successfully, returns a JWT.
 *       401:
 *         description: Unauthorized (invalid credentials)
 */
userRoutes.post("/login", userLoginUserCtrl);
// !=================================================================
// Forget password
/**
 * @swagger
 * /api/users/forget-password-token:
 *   post:
 *     summary: Generate forget password token
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Password reset token generated.
 *       400:
 *         description: Bad Request
 */
userRoutes.post("/forget-password-token", forgetPasswordToken);
// !=================================================================
// Reset password
userRoutes.put("/reset-password", passwordResetController);
// !=================================================================
// Generate verification token for email
/**
 * @swagger
 * /api/users/generate-verify-email-token:
 *   post:
 *     summary: Generate verification token for email
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Verification token generated successfully.
 *       401:
 *         description: Unauthorized
 */
userRoutes.post(
  "/generate-verify-email-token",
  authMiddleware,
  generateVerificationToken
);
// !=================================================================
// Verify email
/**
 * @swagger
 * /api/users/generate-verify-email-token:
 *   put:
 *     summary: Verify user email
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Email verified successfully.
 *       400:
 *         description: Bad Request (invalid token)
 *       401:
 *         description: Unauthorized
 */
userRoutes.put(
  "/generate-verify-email-token",
  authMiddleware,
  accountVerificationController
);
// !=================================================================
// Profile upload
userRoutes.put(
  "/profile-upload",
  authMiddleware,
  imageUpload.single("image"),
  imageUploadResize,
  PhotoUploadController
);
// !=================================================================
// Update user password
/**
 * @swagger
 * /api/users/password/{id}:
 *   put:
 *     summary: Edit user password
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *       401:
 *         description: Unauthorized
 */
userRoutes.put("/password/:id", authMiddleware, updateUserPasswordController);
// !=================================================================
// Follow a user
/**
 * @swagger
 * /api/users/follow:
 *   put:
 *     summary: Follow a user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User followed successfully.
 *       401:
 *         description: Unauthorized
 */
userRoutes.put("/follow", authMiddleware, followingUserController);
// !=================================================================
// Unfollow a user
/**
 * @swagger
 * /api/users/unfollow:
 *   put:
 *     summary: Unfollow a user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User unfollowed successfully.
 *       401:
 *         description: Unauthorized
 */
userRoutes.put("/unfollow", authMiddleware, unFollowingUserController);
// !=================================================================
// isAdmin a user
/**
 * @swagger
 * /api/users/isAdmin:
 *   put:
 *     summary: isAdmin a user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User isAdmin successfully.
 *       401:
 *         description: Unauthorized
 */
userRoutes.put("/isAdmin", authMiddleware, isAdminUserController);
// !=================================================================
// Fetch user details by ID
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Fetch user details by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user object containing user details.
 *       404:
 *         description: User not found.
 *       401:
 *         description: Unauthorized access.
 */
userRoutes.get("/:id", FetchUserDetailsController);
// !=================================================================
// Retrieve user profile by ID
/**
 * @swagger
 * /api/users/profile/{id}:
 *   get:
 *     summary: Retrieve user profile by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the user whose profile to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user profile object containing user details.
 *       404:
 *         description: User profile not found.
 *       401:
 *         description: Unauthorized access.
 */
userRoutes.get("/profile/:id", authMiddleware, userProfileController);
// !=================================================================
// Block a user
/**
 * @swagger
 * /api/users/block-user/{id}:
 *   put:
 *     summary: Block a user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User blocked successfully.
 *       401:
 *         description: Unauthorized
 */
userRoutes.put("/block-user/:id", authMiddleware, blockUserController);
// !=================================================================
// Unblock a user
/**
 * @swagger
 * /api/users/unblock-user/{id}:
 *   put:
 *     summary: Unblock a user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User unblocked successfully.
 *       401:
 *         description: Unauthorized
 */
userRoutes.put("/unblock-user/:id", authMiddleware, unBlockUserController);
// !=================================================================
// Delete user
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: User deleted successfully.
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
userRoutes.delete("/:id", deleteUsersCtrl);
// !=================================================================
// Update user details
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user details
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details updated successfully.
 *       401:
 *         description: Unauthorized
 */
userRoutes.put("/:id", authMiddleware, updateUserController);
// !=================================================================
