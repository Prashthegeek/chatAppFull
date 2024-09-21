// const express = require("express");
// const {
//   allMessages,
//   sendMessage,
// } = require("../controllers/messageControllers");
// const { protect } = require("../middleware/authMiddleware");

// const router = express.Router();

// router.route("/:chatId").get(protect, allMessages);
// router.route("/").post(protect, sendMessage);

// module.exports = router;


// const express = require("express");
// const {
//   allMessages,
//   sendMessage,
//   uploadFile
// } = require("../controllers/messageControllers");

// const multer = require("multer");
// const { protect } = require("../middleware/authMiddleware");

// const router = express.Router();
// const upload = multer({ dest: 'uploads/' }); // Store files in the 'uploads' directory


// router.route("/:chatId").get(protect, allMessages);
// router.route("/").post(protect, sendMessage);
// router.route("/upload").post(protect, upload.single("file"), uploadFile); // New route for file uploads


// module.exports = router;



// const express = require("express");
// const {
//   allMessages,
//   sendMessage,
// } = require("../controllers/messageControllers");

// const multer = require("multer");
// const path = require("path");
// const { protect } = require("../middleware/authMiddleware");

// const router = express.Router();

// // Multer configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Store files in the 'uploads' directory
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// // Routes
// router.route("/:chatId").get(protect, allMessages);
// router.route("/").post(protect, sendMessage);
// router.post('/api/message', upload.single('file'), sendMessage);// Route for file uploads

// module.exports = router;



// const express = require("express");
// const { allMessages, sendMessage } = require("../controllers/messageControllers");
// const multer = require("multer");
// const path = require("path");
// const { protect } = require("../middleware/authMiddleware");

// const router = express.Router();

// // Multer configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Store files in the 'uploads' directory
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// // Routes
// router.route("/:chatId").get(protect, allMessages);
// router.route("/").post(protect, upload.single('file'), sendMessage); // Modified route to include multer middleware

// module.exports = router;




// const express = require("express");
// const { allMessages, sendMessage } = require("../controllers/messageControllers");
// const multer = require("multer");
// const { protect } = require("../middleware/authMiddleware");

// const router = express.Router();

// // Multer configuration
// const storage = multer.memoryStorage(); // Store file in memory temporarily

// const upload = multer({ storage: storage });

// // Routes
// router.route("/:chatId").get(protect, allMessages);
// router.route("/").post(protect, upload.single('file'), sendMessage); // Upload single file

// module.exports = router;



const express = require("express");
const { allMessages, sendMessage } = require("../controllers/messageControllers");
const multer = require("multer");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Multer configuration
const storage = multer.memoryStorage(); // Store file in memory temporarily
const upload = multer({ storage: storage });

// Routes
router.route("/:chatId").get(protect, allMessages);

// Route for sending messages with a file
router.route("/").post(protect, upload.single('file'), sendMessage);

module.exports = router;
