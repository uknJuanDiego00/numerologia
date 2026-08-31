import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    endpoint: {
      type: String,
      required: true,
      trim: true
    },
    method: {
      type: String,
      required: true,
      enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    },
    status_code: {
      type: Number,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null 
    }
  }
);

export default mongoose.model("auditLogs", auditLogSchema)