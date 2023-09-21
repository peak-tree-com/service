const mongoose = require("mongoose");

const objectId = mongoose.Schema.Types.ObjectId;

const studentSchema = mongoose.Schema({
  _id: { type: objectId, auto: true },
  name: {
    required: true,
    type: String,
  },
  register_no: {
    required: true,
    type: Number,
  },
  email: {
    required: true,
    type: String,
    trim: true,
  },
  year: {
    required: true,
    type: Number,
    trim: true,
  },
  batch: {
    required: true,
    type: String,
    trim: true,
  },
  password: {
    required: true,
    type: String,
  },
});

const student = mongoose.model("Students", studentSchema);
module.exports = student;
