const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

//logged in user is req.user._id

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
const accessChat = asyncHandler(async (req, res) => {  //this function will come into play when i want to  i am searching for a user in the sidebar(drawer) , if i have ever talked to that user before (then , i will click on the person it will return the chats) else ,if not, then , it will create one on one chat with the user (by storing in the mongo) and at last will return this formed chat to you(from frontend we can have ui set up to talk to him )(but, i think, I should not just save this chat in the database just becoz , he searched and clicked on the user(I should only store it in the database if I have intitiated the conversation with him to save space in database)) 
  const { userId } = req.body;  //the person with whom i talked and want to access the Chats , i can ,,        const { data } = await axios.post(`/api/chat`, { userId }, config);   so, this is how we sent the userId in the req body from the frontend (without the postman) and yeah, both the frontend and backend working on this purpose has the same name (no clashes occurs with the same function name in the backend and in the frontend becoz, they both run in the different environment)

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({  //find method returns an array , now populate that and store it in some variable
    isGroupChat: false,  
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },  //users is an array inside the chats , and in the array i am searching for both the logged in user and the user whose chats he wants to see 
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password") //populate the field users (each element of the users) exluding the password
    .populate("latestMessage");

  isChat = await User.populate(isChat, {  
    path: "latestMessage.sender",
    select: "name pic email",
  })
 


  if (isChat.length > 0) { //if isChat array has element
    res.send(isChat[0]);  //returning the first element becoz, technically, it would have only one element , becoz, it's one on one chat,and chat is referring to a document(which we saved after populating)  , so , searching (from drawer) / viewing the user directly from left side apart from drawer , there is only one userId which he had talked to , multiple persons can have same name , but, can't have same userId
  } else {  //if chat doesn't exist, then simply , create the chat with him.
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {  //creating the chat here(it is also the part of else block.)
      const createdChat = await Chat.create(chatData);  //created the chat with the chatData(an object , creted previously)

      //After creating the Chat , I also want to intiate a conversation between them, so i am finding the chat(that i created now) and then i will populate /manipulate the object and then will send it to the frontend part where with these data , i can load up the chat page with this unknown person (with whom the logged in user never talked to )
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(  //The findOne method in Mongoose returns a single object (a document) that matches the query criteria, not an array.
        "users",
        "-password"
      );
      res.status(200).json(FullChat);  //Converted this object to the json and sent to the frontend where i can use this data , to load the chat to initiate the conversation with this unknown person(whom our logged in user never talked to)
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

//Note : seeing all the chats with a user on the right side is a part of different controller/func named allMessages (part of messageControllers) , since, obviously, chat involves messages.

//@description     Fetch all chats for a user  
//@route           GET /api/chat/
//@access          Protected
const fetchChats = asyncHandler(async (req, res) => {  //fetching all the chats of the logged in user(including the group Chats and one on one chats on the left side(not the drawer part)) + also need to show the latest message down to every Chat

  try {
    // Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })  //logged in user is req.user._id , find returns an array (containing the documents satisfying the conditions, now, manipulate/populate the array with the things you want) 
    //   .populate("users", "-password")
    //   .populate("groupAdmin", "-password")  //I think due to this, i am not seeing latest message down to the group I created (i think it is becoz, groupAdmin is not an array)
    //   .populate("latestMessage")
    //   .sort({ updatedAt: -1 })  //sort in reverse order (as per timeStamp, latest one will be at index 0 )
    //   .then(async (results) => {
    //     results = await User.populate(results, {
    //       path: "latestMessage.sender",
    //       select: "name pic email",
    //     });
    //     res.status(200).send(results);
    //   });

    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })   ////logged in user is req.user._id , find returns an array (containing the documents satisfying the conditions, now, manipulate/populate the array with the things you want to display on the AllChats left side page on the frontend) 
  .populate({
    path: 'users',
    select: '-password'
  })
  .populate({
    path: 'groupAdmin',
    select: '-password'
  })
  .populate({
    path: 'latestMessage',
    populate: {
      path: 'sender',
      select: 'name pic email'
    }
  })
  .sort({ updatedAt: -1 })  ////sort in reverse order (as per timeStamp, latest one will be at index 0 )
  .then((results) => {
    
    //find method returns an array (we can store that array in the variable and then can manually populate each things using a for each loop, see the code in the whatsapp), another way , we know find will return something (so , wo something ko directly send in the frontend using .then(to absorb whatever find returns /or whatever promise(new term) find returns))
    res.status(200).send(results);
  })
  .catch((error) => {  //.catch block for .then block
    res.status(400).send(error.message);
  });

  } catch (error) { //catch block for try block
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Group Chat
//@route           POST /api/chat/group
//@access          Protected
const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {  //req.body.name(name of the group ) and req.body.users(name of the users to add in the group) , but, req.user._id is the id of the logged in user  . 
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var users = JSON.parse(req.body.users);  //converts users into javascript array(why not object? Becoz, req.body.users is the list or the array of users whom i want to add in the group ), so , var users is an javascript array instead of an array

  if (users.length < 2) {  //object length
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.user); //push the logged in user in the group as well(so, users is an array and it has all the users whom logged in user wanna add + the loggedin user himself ) and since, users is an array ,so push method works here

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,  // manually(don't advised ) users : [user1,user2,....](actually don't know which all users he added )
      isGroupChat: true,
      groupAdmin: req.user,
    });

    // After creting the group , i want to show the interface to the frontend as well(by opening the ui for group chat, for that i would need all the information about the group members etc , to the frontend, so after creating the group , directly find this newly created group and after manipulation(/populate) return it as a response to the frontend)
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })  //findOne returns a single object , so store it in a variable after populating and last return the object as a response to the frontend as a json (since, communication happens only in json, frontend me axios directly changes it to javascript object)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);  //send this object as an json (way of communication)
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    Rename Group
// @route   PUT /api/chat/rename
// @access  Protected
const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;  //if postman me check karenge,then i need to specify, ki kaun sa chat(so need ChatId) ka name change karna hai and to what

  const updatedChat = await Chat.findByIdAndUpdate(  //Chat.findByIdAndUpdate: This method finds a chat document by its _id (which is chatId in this case) and updates it with the new chatName.
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,  //{ new: true }: Ensures that the method returns the updated document instead of the original one.
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");  //simultaneously populate the updated document(which is in the form of object ) (i am populating this all becoz, i need to return all these informations to the frontend as well, so , that it can do necessary changes in the frontend part as well)

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);  //send the updated populated document(no change in the actual mongodb document) (which is in the form of object ) to the frontend in the json form
  }
});

// @desc    Remove user from Group
// @route   PUT /api/chat/groupremove
// @access  Protected

const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,  //chatId: The ID of the chat where the update will occur.
    {
      $pull: { users: userId },  //: The $pull operator removes the userId from the users array in the chat document., The $pull operator is used to remove the specified user from the array.
    },
    {
      new: true,  // Ensures the function returns the updated document after the operation, rather than the original one.
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});

// @desc    Add user to Group / Leave
// @route   PUT /api/chat/groupadd
// @access  Protected
const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const added = await Chat.findByIdAndUpdate(
    chatId,  //The ID of the chat where the update will occur.
    {
      $push: { users: userId },  //The $push operator adds the userId to the users array in the chat document.
    },
    {
      new: true,  //Ensures the function returns the updated document after the operation, rather than the original one.
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
