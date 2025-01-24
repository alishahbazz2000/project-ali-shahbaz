import * as mongoose from "mongoose";
import crypto from "node:crypto";
// create schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is a required field"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is a required field"],
    },
    url: {
      type: String,
      default:
        "https://img.freepik.com/free-psd/3d-illustration-person-with-long-hair_23-2149436197.jpg?ga=GA1.1.2032648458.1716892076&semt=ais_siglip",
    },
    email: {
      type: String,
      required: [true, "E-mail is a required field"],
    },
    password: {
      type: String,
      required: [true, "Password is a required field"],
    },
    profilePhoto: {
      type: String,
    },
    bio: { type: String, default: "" },
    postCount: { type: Number, default: 0 },
    isBlocked: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    role: { type: String, enum: ["Admin", "Guest", "Blogger"] },
    isFollowing: { type: Boolean, default: false },
    isUnFollowing: { type: Boolean, default: false },
    isAccountVerified: { type: Boolean, default: false },
    accountVerificationToken: String,
    accountVerificationTokenExpires: Date,
    ViewedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// virtual method to populate created post
userSchema.virtual("posts", {
  ref: "Post",
  foreignField: "user",
  localField: "_id",
});

// hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await Bun.password.hash(this.password, {
    algorithm: "bcrypt",
    cost: 4,
  });
  await next();
});

// match password
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  console.log(await Bun.password.verify(enteredPassword, this.password));
  return await Bun.password.verify(enteredPassword, this.password);
};

// verify account
userSchema.methods.createAccountVerificationToken = async function () {
  // create token
  const verificationToken = crypto.randomBytes(32).toString("hex");
  this.accountVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  this.accountVerificationTokenExpires = Date.now() + 30 * 60 * 1000;
  return verificationToken;
};

// password reset
userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000;
  return resetToken;
};

// Correct the model export name to 'User'
export const User = mongoose.model("User", userSchema);
