import mongoose from "mongoose";

const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  cgpa: {
    type: String,
    required: true,
  },
  programme: {
    type: String,
    required: true,
  },
  year:{
    type: String,
    required: true,
  },
  branch:{
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model("user", user);