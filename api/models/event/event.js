import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
    },
    cardDescription: {
      type: String,
      default: "",
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Event date is required"],
    },
    location: {
      type: String,
      required: [true, "Event location is required"],
    },
    image: {
      type: String,
      default: "https://placehold.co/600x400",
    },
  },
  {
    timestamps: true,
  }
);

// Compile and export the model
export const Event = mongoose.model("Event", eventSchema);
