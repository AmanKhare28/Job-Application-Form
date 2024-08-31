import mongoose from "mongoose";

const applicantSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email Should Be Unique"],
    },
    phone: {
      type: Number,
      required: true,
      unique: [true, "Phone Should Be Unique"],
    },
    state: {
      type: String,
      required: true,
    },
    pin: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    skills: [
      {
        type: String,
      },
    ],
    resume: {
      type: Buffer,
      required: true,
    },
  },
  { timestamps: true }
);

const Applicant = mongoose.model("Applicant", applicantSchema);
export default Applicant;
