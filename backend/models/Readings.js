import mongoose, { Schema } from "mongoose";

const readingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    prompt: {
      type: String,
      required: true,
      trim: true
    },
    response: {
      type: String,
      required: true,
      trim: true
    },
    reading_type: {
      type: String,
      required: true,
      enum: ['diaria', 'general', 'anual'],
      lowercase: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);
