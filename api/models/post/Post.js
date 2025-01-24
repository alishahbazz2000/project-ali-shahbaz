import mongoose from "mongoose";
import slugify from "slugify";
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
      trim: true,
      unique: true,
    },
    url: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
    },
    //Created by only category
    category: {
      type: String,
      required: [true, "Post category is required"],
      default: "All",
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisLiked: {
      type: Boolean,
      default: false,
    },
    numViews: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    disLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: [true, "Please Author is required"],
    },
    description: {
      type: String,
      required: [true, "Post description is required"],
    },
    cardDescription: {
      type: String,
      required: [true, "Post cardDescription is required"],
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);
postSchema.pre("save", async function (next) {
  if (this.isModified("title") || !this.slug) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
    });

    let slugExists = await mongoose.models.Post.findOne({ slug: this.slug });
    let count = 1;

    while (slugExists) {
      this.slug = `${slugify(this.title, {
        lower: true,
        strict: true,
      })}-${count}`;
      count++;
      slugExists = await mongoose.models.Post.findOne({ slug: this.slug });
    }
  }
  next();
});

//compile
export const Post = mongoose.model("Post", postSchema);
