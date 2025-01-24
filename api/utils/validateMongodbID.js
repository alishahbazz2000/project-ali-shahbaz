import mongoose from "mongoose";

export const validateMongodbID = async (id) => {
  const isValid = await mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("user id is not valid or found");
};
