import { Comment } from "../../models/comment/Comments";
import { validateMongodbID } from "../../utils/validateMongodbID";

// =======================================================
// create comment
// =======================================================
export const createCommentController = async (req, res) => {
  const user = req.user;
  const { postId, description } = req.body;
  try {
    const data = await Comment.create({
      user,
      post: postId,
      description,
    });
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};
// =======================================================
// fetch All comment
// =======================================================

export const fetchAllCommentController = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("post")
      .populate("user")
      .sort("-created");
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments for post:", error);
    res.status(500).json({ message: "An error occurred", error });
  }
};

// =======================================================
// fetch single comments
// =======================================================
export const fetchSingleCommentController = async (req, res) => {
  const { id } = req.params;
  console.log("🚀 ~ fetchSingleCommentController ~ id:", id);
  try {
    const comment = await Comment.findById(id)
      .populate("user")
      .sort("-createdAt");
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
};
// =======================================================
// create the controller to update comment
// =======================================================
export const updateCommentController = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true, runValidators: true }
    );
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
};
// =======================================================
// delete comment controller
// =======================================================
export const deleteCommentController = async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);
  try {
    const comment = await Comment.findByIdAndDelete(id);
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
};
// =======================================================
// fetch comments for a specific post
// =======================================================

export const fetchCommentsByPostController = async (req, res) => {
  const { postId } = req.params;
  console.log("🚀 ~ fetchCommentsByPostController ~ postId:", postId);

  try {
    const comments = await Comment.find({ post: postId })
      .populate("post")
      .populate("user");
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments for post:", error);
    res.status(500).json({ message: "An error occurred", error });
  }
};
