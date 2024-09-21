const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const path = require('path');
const fs = require('fs');
const { cloudinary, b2 } = require("../config/cloudStorage");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {   //get all the messages for a particular chat
  try {
    const messages = await Message.find({ chat: req.params.chatId })  //so , the person clicked on the user he wanna talk to ( and the ChatId is chatId) (if previous chats with him exist, then simply return all the messages after populating it  )
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);  //return the json data with the frontend(way to communicate)  //find method returns an array
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
// const sendMessage = asyncHandler(async(req, res) => {  //This sendMessage function is responsible for creating(storing in the db) and sending a new message in a chat. It handles the process of storing the message in the database, populating related data (like the sender and chat information), and updating the chat with the latest message.(finally in short -> after loggedin user jo message send kiya hai (after pressing enter) , i called this controller from the frontend (by making the api call using from singleChat.js , and I passed the chatId and content(to store  the message logged in user sent by clicking enter) in the config part ) , the logged in user jo message sent kiya wo statement hoga, but, we cann't just store that messages directly in the db,we have already defined the structure to store those messages in the model part , so, to store a message(we need to have sendername, chatId and content with it also, so,firstly created an object with thse payloads and then added that object in the messages collection in the db) , again  , with further modifications in the instance of this stored message , i can again store this message inside the chats collection->this particular chat document(found using chatId)->latestMessage field (to do modification we will populate the things so that ,it can have the same structure it requires to store this thing in the latestmessage field(as defined by us in the model ) ) )
//   const { content, chatId } = req.body;  //content: The actual message text that the user wants to send.  chatId: The ID of the chat where the message will be sent.

//   if (!content || !chatId) {    //from the frontend ,we can have both the content and chatId using the config part (where  we give the header authorization , content type etc)
//     console.log("Invalid data passed into request");
//     return res.sendStatus(400);
//   }

//   var newMessage = {  //created an object with these payloads (so , that i can add this part directly in the messages collection in the db) 
//     sender: req.user._id,
//     content: content,
//     chat: chatId,
//   };

//   try {
//     //add the newmessage object in the messages collection of the db
//     var message = await Message.create(newMessage);  //created the new message in the Message (name of the model we exported)(added a new message in the messages collection in the db) and created the same copy of it in a varible named message

// // Populate the necessary fields (so that it fits well in the latestmessage field of the particular chat(will find using chatId ) inside the chats collection)
// message = await message
// .populate("sender", "name pic")  
// .populate({  ////populate the chat (so , instead of having chatId , we made all the informations of the chats be populated . but, users array inside chats still contains userId, which i will populate in next line  , see the whatsapp (14.08.24))
//   path: "chat",
//   populate: {  
//     path: "users", //means, populate the users path and populate the name,pic and email field of the users //users is an array, but, by just writing populate, it ensures each users in the arary is populated ,we don'w need to run a loop for it.
//     select: "name pic email",
//   },
// })
// .execPopulate();  //when did not write , then chat field was not getting populated., when consoled. was getting just chatid (so, thik se populate nhi hua tha), now it is fine(In newer version of mongoose, we don't need to use execPopulate(), but, for this project , it was necessary, since, everything here is older version)


//     //update the latestmessage field of this chat(found using chatId) insdie the chats collection
//     await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });  //Now, in the chats collection(Not the messages) , we will find the chat with the chatId and then I will update the latest message with the (new)    message variable i created after populating (why did i populate? so that , the message varible that i want to store in the latest message field of this chat (found using the chatId) fits well in the latestMessage field(or , we populated the message varible such that it has the same structure it requires to fit in the latestMessage field of this chat(found using chatId ) inside the chats collection))

//     res.json(message);  //res.json(message): The fully populated message is sent back as a JSON response to the frontend(or, in short send the message variable we fitted inside the latest message field of this chat(foundn using chatId) to the frontend(or in fact , send the latest message of this chat to the frontend))
//   } catch (error) {
//     res.status(400);
//     throw new Error(error.message);
//   }
// });



// const sendMessage = asyncHandler(async (req, res) => {
//   console.log('Request Body:', req.body);
//   console.log('Request File:', req.file);
//   const { chatId, content } = req.body;
//   if (!chatId) {
//     console.log("Invalid data passed into req");
//     return res.sendStatus(400);
//   }

//   let filePath = null;
//   if (req.file) {
//     filePath = req.file.filename; // Assuming multer is saving the file and adding req.file
//   }

//   if (!content && !filePath) {
//     console.log("Invalid data passed into request");
//     return res.sendStatus(400);
//   }

//   const newMessage = {
//     sender: req.user._id,
//     chat: chatId,
//     content: content || filePath,
//     type: filePath ? "file" : "text",
//   };

//   try {
//     let message = await Message.create(newMessage);

//     message = await message
//       .populate("sender", "name pic")
//       .populate({
//         path: "chat",
//         populate: {
//           path: "users",
//           select: "name pic email",
//         },
//       })
//       .execPopulate();

//     await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

//     res.json(message);
//   } catch (error) {
//     res.status(400);
//     throw new Error(error.message);
//   }
// });


// const sendMessage = asyncHandler(async (req, res) => {
//   const { chatId, content } = req.body;
//   console.log(chatId);
//   console.log(content);
//   if (!chatId) {
//     console.log("Invalid data passed into request");
//     return res.sendStatus(400);
//   }

//   let newMessageData = {
//     sender: req.user._id,
//     chat: chatId,
//     content: content || "",
//     type: "text",
//     file: null // Initialize file as null
//   };

//   // Check if there's a file in the request
//   if (req.file) {
//     // Overwrite the content with the file path and set type to file
//     newMessageData.file = `/uploads/${req.file.filename}`;  // Ensure the path starts with /uploads
//     newMessageData.type = "file";  // Set type to file
//   }
//   if (!newMessageData.content && !req.file) {
//     console.log("Invalid data passed into request");
//     return res.sendStatus(400);
//   }

//   try {
//     let message = await Message.create(newMessageData);

//     message = await message
//       .populate("sender", "name pic")
//       .populate({
//         path: "chat",
//         populate: {
//           path: "users",
//           select: "name pic email",
//         },
//       })
//       .execPopulate();
      
//       console.log(message);

//     await Chat.findByIdAndUpdate(chatId, { latestMessage: message })

//     res.json(message);
//   } catch (error) {
//     res.status(400);
//     throw new Error(error.message);
//   }
// });










//just before this is just above


const sendMessage = asyncHandler(async (req, res) => {
  const { chatId, content } = req.body;

  // Debugging information to confirm the data being received
  console.log("req.body:", req.body); // ChatId and Content
  console.log("req.file:", req.file); // File Information

  if (!chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  let newMessageData = {
    sender: req.user._id,
    chat: chatId,
    content: content || "",
    type: "text",
    file: null, // Initialize file as null
  };

  // Check if a file was uploaded
  if (req.file) {
    const fileType = req.file.mimetype.split("/")[0]; // image, video, etc.
    let fileUrl = null;

    try {
      // Upload the file to Cloudinary
      if (fileType === "image" || fileType === "video") {
        const streamUpload = (file) => {
          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ resource_type: fileType }, (error, result) => {
              if (result) {
                resolve(result); // Resolve the promise with the result
              } else {
                reject(error); // Reject the promise with the error
              }
            });
            stream.end(file.buffer); // Pass the buffer to the stream
          });
        };

        const result = await streamUpload(req.file); // Wait for the upload to finish
        fileUrl = result.secure_url; // Store the Cloudinary URL
        console.log("File uploaded to Cloudinary:", fileUrl); // Debugging the uploaded URL , perfectly getting the correct url .
      } else if (fileType === "application" && req.file.mimetype === "application/pdf") {
        // Backblaze B2 Upload (as in your original implementation)
        await b2.authorize();
        const uploadUrl = await b2.getUploadUrl({ bucketId: process.env.B2_BUCKET_ID });
        const b2Upload = await b2.uploadFile({
          uploadUrl: uploadUrl.uploadUrl,
          uploadAuthToken: uploadUrl.authorizationToken,
          fileName: req.file.originalname,
          data: req.file.buffer,
        });
        fileUrl = b2Upload.data.fileUrl;
        console.log("File uploaded to Backblaze:", fileUrl);
      }

      // If a file was uploaded successfully, update the message data
      if (fileUrl) {
        newMessageData.file = fileUrl;
        newMessageData.type = "file";
      }
    } catch (error) {
      console.error("File upload failed:", error); // Log the exact error
      return res.status(500).json({ message: "File upload failed" });
    }
  }

  // If neither content nor file exists, return an error
  if (!newMessageData.content && !req.file) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  try {
    // Save the new message to the database
    let message = await Message.create(newMessageData);

    message = await message
      .populate("sender", "name pic")
      .populate({
        path: "chat",
        populate: {
          path: "users",
          select: "name pic email",
        },
      })
      .execPopulate();

    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    console.error("Message creation failed:", error);
    res.status(400);
    throw new Error(error.message);
  }
});



// const uploadFile = asyncHandler(async (req, res) => {
//   const { chatId } = req.body;
//   if (!chatId || !req.file) {
//     res.status(400);
//     throw new Error("Missing chatId or file.");
//   }
  

//   try {
//     const filePath = path.join(__dirname, '../uploads', req.file.filename);

//     const message = await Message.create({
//       sender: req.user._id,
//       content: req.file.filename, // Store just the filename
//       chat: chatId,
//       type: 'file',
//     });

    


//     // Populate the message
//     await message.populate('sender', 'name pic').execPopulate();
//     await message.populate('chat').execPopulate();
//     await User.populate(message, {
//       path: 'chat.users',
//       select: 'name pic email',
//     });

   

//     // Set the latest message in the chat
//     await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
 
//     res.json({
//       _id: message._id,
//       sender: {
//         _id: req.user._id,
//         name: req.user.name,
//         pic: req.user.pic,
//       },
//       content: message.content, // Return the filename
//       chat: message.chat,
//       type: 'file',
//       createdAt: message.createdAt,
//     });

//   } catch (error) {
//     res.status(500);
//     throw new Error("File upload failed.");
//   }
// });


module.exports = { allMessages, sendMessage};