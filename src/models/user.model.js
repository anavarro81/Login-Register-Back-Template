import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String },
    dni: { type: String },
    name: { type: String },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
  },
  {
    timestamps: true,
  },
);

const user = mongoose.model("Users", userSchema);

export default user;
