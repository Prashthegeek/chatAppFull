const mongoose = require("mongoose");

const userVerificationSchema = mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true, 
      ref: 'User' 
    },
    token: { 
      type: String, 
      required: true 
    },
    createdAt: { 
      type: Date, 
      default: Date.now, 
      expires: 3600  // Token expires after 1 hour
    }
  }
);

const UserVerify = mongoose.model("UserVerify", userVerificationSchema);

module.exports = UserVerify;
