const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const UserVerify = require("../models/userVerify.models.js");

//for email verification
const crypto = require("crypto");
const nodemailer = require("nodemailer");


//@description     Get or Search all users
//@route           GET /api/user?search={some person to search}
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;
  
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please enter all the fields");
    }
  
    // Check if user already exists
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      if (!userExists.isVerified) {
                // If the user exists but hasn't verified their email, resend verification email
                await sendVerificationEmail(userExists, req, res);
        
                return res.status(200).json({  //just return from here only, else agar next lines me gaya, then phir se sendVerificationEmail funciton call ho jaayega
                  message: "User already exists but email is not verified. Verification email resent. Please verify your email.",
                  email: userExists.email,  // Include email in the response
                });
        
      } else {
        // User exists and is verified
        res.status(400);
        throw new Error("User already exists");
      }
    }
  
    // Create a new user
    const user = await User.create({
      name,
      email,
      password,
      pic,
    });
  
    if (user) {
      // Send verification email after successful registration
      await sendVerificationEmail(user, req, res);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
        message: "Registration successful. Please verify your email.",
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  });

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    if (!user.isVerified) {
      res.status(401);
      throw new Error("Please verify your email to log in.");  //becoz, sometimes user try to login without verifying the email.
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});



//@description     Send verification email
//@route           POST /api/user/send-verification-email
//@access          Public
const sendVerificationEmail = asyncHandler(async (user, req, res) => {
  const token = crypto.randomBytes(32).toString("hex");
  

  await UserVerify.create({
    userId: user._id,
    token: token,
  });

  // Send email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,  // Your email
      pass: process.env.EMAIL_PASS,  // Your email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Email Verification",
    html: `<h2>Please verify your email</h2>
           <p>Click <a href="http://localhost:5000/api/user/verify-email/${token}">here</a> to verify your email.</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Email could not be sent" });
    } else {
      res.status(200).json({ message: "Verification email sent" });
    }
  });
});



//@description     Verify user email
//@route           GET /api/user/verify-email/:token
//@access          Public
const verifyEmail = asyncHandler(async (req, res) => {
  console.log("hello");
  const { token } = req.params;
  console.log(token);
  console.log("hellow");

  // Find the verification record based on the token
  const verifyRecord = await UserVerify.findOne({token});
  console.log(verifyRecord);

  if (!verifyRecord) {
    // If the token is invalid or expired, redirect to the NotSucEmail page
    console.log("verifyRecord me c");
    console.log(`${process.env.FRONTEND_URL}`);
    res.redirect(`${process.env.FRONTEND_URL}/NotSucEmail`);
  }
  console.log(`.env wala is ${process.env.FRONTEND_URL}`);
  // Find the user associated with the token
  const user = await User.findById(verifyRecord.userId);
  console.log(`user is ${user}`);

  if (!user) {
    // If the user is not found, redirect to the NotSucEmail page
    res.redirect(`${process.env.FRONTEND_URL}/NotSucEmail`);
    console.log("incorrect tha");
  }

  // Mark the user as verified
  user.isVerified = true;
  await user.save();

  // Delete the verification record
  await UserVerify.findByIdAndDelete(verifyRecord._id);

  // Redirect to the SuccessEmail page
  console.log("abhi redirect karne wala hu");
  res.redirect(`${process.env.FRONTEND_URL}/SuccessEmail`);
});




//@description     Resend verification email
//@route           POST /api/user/resend-verification
//@access          Public

const resendVerificationEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;  //this is the reason , we passed the email(in the signup page while redirecting and then , useLocation used in the EmailVerificaiton.js and sent the email object to this api call )

  if (!email) {
    return res.status(400).json({ message: "Please provide an email" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  if (user.isVerified) {
    return res.status(400).json({ message: "This account is already verified." });
  }

  try {
    await sendVerificationEmail(user, req, res);
    return res.status(200).json({  //use return in each response
      message: "Verification email has been resent. Please check your inbox.",
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to send verification email" });  //use return in each response, so that, ek controller multiple responses send na kar de(for a request, aisa hone se error aata hai and the app can crash)
  }
});


module.exports = { allUsers, registerUser, authUser, sendVerificationEmail, verifyEmail , resendVerificationEmail};

