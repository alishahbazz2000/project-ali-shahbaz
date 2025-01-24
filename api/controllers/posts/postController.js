import { Filter } from "bad-words";
import { validateMongodbID } from "../../utils/validateMongodbID";
import { User } from "../../models/user/User";
import { cloudinaryUploadImage } from "../../utils/cloudinary";
import { Post } from "../../models/post/Post";
import fs from "node:fs";
// !====================================================
// create post
// !====================================================
export const allPostController = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("user");
    res.json(posts);
  } catch (error) {
    res.json(error);
  }
};
// !====================================================
// create post
// !====================================================
export const createPostController = async (req, res) => {
  const { id } = req.user;
  // validateMongodbID(req.body.user);
  // check for bad worlds
  const filter = new Filter();
  const isProfane = filter.isProfane(req.body.title, req.body.description);
  // block user
  if (isProfane) {
    const user = await User.findByIdAndUpdate(id, {
      isBlocked: true,
    });
    res.json(user);
  }

  const localPath = `public/images/posts/${req?.file?.filename}`;
  const imageUploaded = await cloudinaryUploadImage(localPath);

  try {
    const post = await Post.create({
      ...req.body,
      image: imageUploaded?.url,
      user: id,
    });

    if (fs.existsSync(localPath)) {
      await fs.promises.unlink(localPath);
      console.log("File deleted successfully");
    } else {
      console.warn("File does not exist:", localPath);
    }
    res.json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "An error occurred", error });
  }
};
// !====================================================
// fetch a single post
// !====================================================
export const fetchSinglePostController = async (req, res) => {
  console.log("🚀 ~ fetchSinglePostController ~ req.params:", req.params);

  const { id } = req.params;
  console.log("🚀 ~ fetchSinglePostController ~ id:", id);
  try {
    const post = await Post.findById(id)
      .populate("user")
      .populate("disLikes")
      .populate("likes");
    await Post.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
};

// !====================================================
// update post
// !====================================================
export const updatePostController = async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);
  try {
    const updatedPostData = {
      title: req.body.title || "",
      url: req.body.url || "",
      description: req.body.description || "",
      cardDescription: req.body.cardDescription || "",
      category: req.body.category || "",
      user: req.user?.id || "",
    };

    const data = await Post.findByIdAndUpdate(id, updatedPostData, {
      new: true,
    });
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};
// !====================================================
// delete post
// !====================================================
export const deletePostController = async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);
  try {
    const data = await Post.findByIdAndDelete(id);
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};
// !====================================================
// handle links
// !====================================================
export const toggleAddLikeToPostController = async (req, res) => {
  const { postId } = req.body;
  const post = await Post.findById(postId);

  // find the login user
  const loginUserId = req?.user?.id;

  // find is this user has likes this post
  const isLiked = post?.isLiked;
  // check if this user has dislikes
  const alreadyDisliked = post?.disLikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );

  if (alreadyDisliked) {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    return res.json(updatedPost);
  }

  if (isLiked) {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    return res.json(updatedPost);
  } else {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    return res.json(updatedPost);
  }
};
// !====================================================
// handle disLinks
// !====================================================
export const toggleAddDisLikeToPostController = async (req, res) => {
  const { postId } = req.body;
  console.log("🚀 ~ toggleAddDisLikeToPostController ~ postId:", postId);

  const post = await Post.findById(postId);
  console.log("🚀 ~ toggleAddDisLikeToPostController ~ post:", post);

  // find the login user
  const loginUserId = req?.user?.id;
  // find is this user has likes this post
  const isDisLiked = post?.isDisLiked;
  // check if this user has dislikes
  const alreadyLiked = post?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );

  if (alreadyLiked) {
    // remove the user from dislikes array if exists
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    return res.json(updatedPost);
  }

  if (isDisLiked) {
    // remove the user if he has like
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    return res.json(updatedPost);
  } else {
    // add to likes
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { disLikes: loginUserId },
        isDisLiked: true,
      },
      { new: true }
    );
    return res.json(updatedPost);
  }
};
