import { generateToken } from "../../config/token/generateToken";
import { User } from "../../models/user/User";
import { validateMongodbID } from "../../utils/validateMongodbID";
import { Resend } from "resend";
import crypto from "node:crypto";
import { cloudinaryUploadImage } from "../../utils/cloudinary";
import process from "node:process";

const resend = new Resend(process.env.RESEND_API_KEY);
// ---------------------
// ! register function post
// ---------------------
export const userRegisterController = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      res.status(400).json({ error: "User already exists" });
      return;
    }
    const user = await User.create({ ...req.body });
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "User registration failed", details: error.message });
  }
};
// --------------------
// ! login user
// --------------------
export const userLoginUserCtrl = async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });
  if (userFound && (await userFound.isPasswordMatched(password))) {
    res.json({
      ...userFound.toObject(),
      token: await generateToken(userFound?.id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Login Credentials");
  }
};
// --------------------
// ! users
// --------------------
export const fetchUsersCtrl = async (req, res) => {
  console.log(req.headers);
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
};
// --------------------
// ! Delete users
// --------------------
export const deleteUsersCtrl = async (req, res) => {
  const { id } = req.params;
  // check if user id is validateMongodbID
  validateMongodbID(id);
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    res.json(error);
  }
};
// ---------------------
// ! user details
// ---------------------
export const FetchUserDetailsController = async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
};
// ------------------------
// ! user profile
// ------------------------
export const userProfileController = async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);
  try {
    const myProfile = await User.findById(id).populate("posts");
    res.json(myProfile);
  } catch (error) {
    res.json(error);
  }
};
// ------------------------
// ! update user profile
// ------------------------
export const updateUserController = async (req, res) => {
  const { id } = req.params;
  try {
    validateMongodbID(id);
  } catch (error) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  // Perform the update
  const user = await User.findByIdAndUpdate(
    id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      url: req.body.url,
      bio: req.body.bio,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.json(user);
};
// ------------------------
// ! update user password
// ------------------------
export const updateUserPasswordController = async (req, res) => {
  const { id } = req.user;
  const { password } = req.body;
  const user = await User.findById(id);
  if (password) {
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.json(user);
  }
};
// ------------------------
// ! Following User
// ------------------------
export const followingUserController = async (req, res) => {
  const { followId, loginUserId } = req.body;
  console.log("🚀 ~ followingUserController ~ followId:", followId)
  // const loginUserId = req?.user?.id;

  // find the toggle user check
  const targetUser = await User.findById(followId);
  const alreadyFollowing = targetUser?.followers?.find(
    (user) => user?.toString() === loginUserId.toString()
  );
  if (alreadyFollowing) {
    throw new Error("You Have already followed this user");
  }

  await User.findByIdAndUpdate(
    followId,
    {
      $push: { followers: loginUserId },
      isFollowing: true,
    },
    { new: true }
  );
  await User.findByIdAndUpdate(
    loginUserId,
    {
      $push: { following: followId },
    },
    { new: true }
  );
  res.json("flowing api");
};
// ------------------------
// ! Following User
// ------------------------
export const unFollowingUserController = async (req, res) => {
  const { followId, loginUserId } = req.body;

  // const loginUserId = req?.user?.id;
  await User.findByIdAndUpdate(
    followId,
    {
      $pull: { followers: loginUserId },
      isFollowing: false,
    },
    { new: true }
  );

  await User.findByIdAndUpdate(
    loginUserId,
    {
      $pull: { following: followId },
    },
    { new: true }
  );

  res.json(`you have success unFollow ${followId} - ${loginUserId}`);
};
// ------------------------
// ! Block User
// ------------------------
export const blockUserController = async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);
  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    { new: true }
  );
  res.json(user);
};
// ------------------------
// ! isAdmin
// ------------------------
export const isAdminUserController = async (req, res) => {
  const { id } = req.body;
  validateMongodbID(id);
  const user = await User.findByIdAndUpdate(
    id,
    {
      isAdmin: true,
    },
    { new: true }
  );
  res.json(user);
};
// ------------------------
// ! unBlock User
// ------------------------
export const unBlockUserController = async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);
  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: false,
    },
    { new: true }
  );
  res.json(user);
};
// ------------------------
// ! email verification generate email verification
// ------------------------
export const generateVerificationToken = async (req, res) => {
  const { id } = req.body;
  const user = await User.findById(id);
  console.log("🚀 ~ generateVerificationToken ~ user:", user);
  try {
    // generate token
    const verificationToken = await user.createAccountVerificationToken();
    await user.save();
    const resetURL = `if you were requested to verify account , verify now within 10 minutes, otherwise ignore this message <a href="http://localhost:3000/verify-account/${verificationToken}">click here...</a>`;
    const data = await resend.emails.send({
      from: "RedBlog <onboarding@resend.dev>",
      to: ["mr.redmasterr@gmail.com"],
      subject: "Hello from Bun + Resend + React Email 🫓💌",
      html: resetURL,
    });
    return res.json(verificationToken);
  } catch (error) {
    return res.json(error);
  }
};
// ------------------------
// ! verification account finally
// ------------------------
export const accountVerificationController = async (req, res) => {
  const { id ,token } = req.body;
  const hashToken = crypto.createHash("sha256").update(token).digest("hex");
  console.log("🚀 ~ accountVerificationController ~ hashToken:", hashToken);
  // find this user by token
  const userFound = await User.findById(id);
  if (!userFound) {
    throw new Error("Token expire , try again!!!");
  }
  userFound.isAccountVerified = true;
  userFound.accountVerificationToken = undefined;
  userFound.accountVerificationTokenExpires = undefined;
  await userFound.save();
  res.json(userFound);
};
// ------------------------
// ! Forget password generate
// ------------------------
export const forgetPasswordToken = async (req, res) => {
  // find the user by email
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("the email not fount");
  }
  try {
    const token = await user.createPasswordResetToken();
    console.log("🚀 ~ forgetPasswordToken ~ token:", token);
    await user.save();
    const resetURL = `if you were requested to reset password , verify now within 10 minutes, otherwise ignore this message <a href="http://localhost:5173/auth/forgetpassword/${token}">click here for reset password...</a>`;
    const msg = await resend.emails.send({
      from: "RedBlog <onboarding@resend.dev>",
      // to: [`${email}`],
      to: ["mr.redmasterr@gmail.com"],
      subject: "Reset the password click here ...",
      html: resetURL,
    });
    return res.json({
      msg: `A verification message is successfully sent to ${User?.email}. Rest now within 10 minutes ${resetURL}`,
    });
  } catch (error) {
    throw new Error(error);
  }
};
// ------------------------
// ! password reset
// ------------------------
export const passwordResetController = async (req, res) => {
  const { token, password } = req.body;
  const hashToken = crypto.createHash("sha256").update(token).digest("hex");
  // find use by token
  const user = await User.findOne({
    passwordResetToken: hashToken,
    passwordResetExpires: { $gt: new Date() },
  });
  if (!user) {
    throw new Error("the user not found , hashToken not exists");
  }
  user.password = password;
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;
  await user.save();
  res.json(user);
};
// ------------------------
// ! file profile image controller
// ------------------------
export const PhotoUploadController = async (req, res) => {
  // find the login user
  const { id } = req.user;

  //1. Get the path to the image
  const localPath = `public/images/profile/${req.file.filename}`;
  // 2. upload to cloudinary
  const imageUploader = await cloudinaryUploadImage(localPath);

  const foundUser = await User.findByIdAndUpdate(
    id,
    {
      profilePhoto: imageUploader?.url,
    },
    { new: true }
  );
  res.json(foundUser);
};
