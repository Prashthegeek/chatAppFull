const cloudinary = require('cloudinary').v2;
const BackblazeB2 = require('backblaze-b2');

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Backblaze B2 Configuration
const b2 = new BackblazeB2({
  applicationKeyId: process.env.B2_APP_KEY_ID,
  applicationKey: process.env.B2_APP_KEY,
});

module.exports = { cloudinary, b2 };
