const express = require("express");
const {
  registerUser,
  authUser,
  allUsers, 
  verifyEmail,
  resendVerificationEmail
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);



// Add routes for email verification
router.get("/verify-email/:token", verifyEmail);  // Verify email with token

// New route for resending verification email
router.post("/resend-verification", resendVerificationEmail);

module.exports = router;
