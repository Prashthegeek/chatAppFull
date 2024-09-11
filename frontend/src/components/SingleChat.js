// import { FormControl } from "@chakra-ui/form-control";
// import { Input } from "@chakra-ui/input";
// import { Box, Text } from "@chakra-ui/layout";
// import "./styles.css";
// import { IconButton, Spinner, useToast } from "@chakra-ui/react";
// import { getSender, getSenderFull } from "../config/ChatLogics";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { ArrowBackIcon, ArrowRightIcon,  AttachmentIcon } from "@chakra-ui/icons";
// import ProfileModal from "./miscellaneous/ProfileModal";
// import ScrollableChat from "./ScrollableChat";
// import Lottie from "react-lottie";
// import animationData from "../animations/typing.json";
// import moment from 'moment';


// import io from "socket.io-client";
// import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
// import { ChatState } from "../Context/ChatProvider";
// const ENDPOINT = "http://localhost:5000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment  //it is the link where our server/backend(and yeah, before deployment, we have the options to run the backend /server in the port we want(like 5000, in the server.js)) is running(so,at link we will have our server present/hosted and here we will make the request )
// var socket, selectedChatCompare;  //note ; socket is a variable , not the state.

// const SingleChat = ({ fetchAgain, setFetchAgain }) => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false); 
//   const [newMessage, setNewMessage] = useState("");
//   const [socketConnected, setSocketConnected] = useState(false);
//   const [typing, setTyping] = useState(false);  //when i am typing
//   const [istyping, setIsTyping] = useState(false);  //when other user is typing
//   const [file, setFile] = useState(null); // New state for file
//   const toast = useToast();

//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },
//   };
//   const { selectedChat, setSelectedChat, user, notification, setNotification } =
//     ChatState();


//    //** */ Function to handle file selection
//    const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };


//   const fetchMessages = async () => {
//     if (!selectedChat) return;

//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,  
//         },
//       };

//       setLoading(true);

//       const { data } = await axios.get(
//         `/api/message/${selectedChat._id}`,
//         config
//       );
//       setMessages(data);  //Messages is an array
//       setLoading(false);  //spinner will disappear

//       socket.emit("join chat", selectedChat._id);
//     } catch (error) {
//       toast({
//         title: "Error Occured!",
//         description: "Failed to Load the Messages",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//     }
//   };


//   //Send the Message(but, I don't just want to send a simple statement, I want all the informations about the users as well , so backend api me request kiya for some more information . (see the ChatController sendMessage funciton in backend))

//   const sendMessage = async (event) => {  //whenever enter key pressed , the new message goes to backend where it is stored in both the messages field of message collection ]] and latest message field of this chat(find using chatId) inside the chat collection
//     if (event.key === "Enter" && newMessage) { 
//       socket.emit("stop typing", selectedChat._id);
//       try {
//         const config = {
//           headers: {
//             "Content-type": "application/json",
//             Authorization: `Bearer ${user.token}`,
//           },
//         };
        
//         const { data } = await axios.post(   //data contains the latestMessage object received from backend after populating the message with the sender's name , pic, email etc
//           "/api/message",  //goes to sendMessage controller function of the message controller
//           {
//             content: newMessage,  //well sending both of them compulsory, becoz , sendMessage field me stated directly ki if a request comes wihtout either content and chatId , then say invlid request
//             chatId: selectedChat,
//           },
//           config
//         );
        
//         //here when i console.log(data) kiya , then in the frontend ka console(means web page ka console me data dekhne milega, when i send the message to anyone) ,so, to other user, i sent the message hello (and then opened the console of the web page, i got to see, data is an object(and has chat(contains the chat id), )) 
//         setNewMessage("");  //* it was written previously before. check this.
        
//         socket.emit("new message", data);  //Now, send this data (or the latest message object ) to the server/backend again so in the new message stream so that it can again emit/broadcast this latest message object(containing name of the sender, email, pic etc) to the other user in the group/other user if one on chat.
//         setMessages([...messages, data]);  //messages: Stores the array of messages in the current chat., appended this latest message in it also(at last index)
//       } catch (error) {
//         toast({
//           title: "Error Occured!",
//           description: "Failed to send the Message",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//           position: "bottom",
//         });
//       }
//     }
//   };


//   useEffect(() => {
//     socket = io(ENDPOINT);  //establish the connection with the server/backend , endpoint contains url where the server is either running /hosted
//     socket.emit("setup", user);  //whenever the logged in user selects a chat ,singlChat compoent is rendered , so content inside the useEffect is executed, and with this line, we are sending the information about the user(userId) to the backend saying this person is connected in one side(since, he selected a chat and single chat component is rendered) 
//     socket.on("connected", () => setSocketConnected(true));  // .on means i am listening to some stream/event named(connected, sent by the backend) and from the backend connected stream is emitted only when a person on the other side is connected(this code was obviously written by me )
//     socket.on("typing", () => setIsTyping(true));  //IsTyping represents the typing other person is doint , so when Istypin is true, other person is typing and we will show the typing animation
//     socket.on("stop typing", () => setIsTyping(false));

//     // eslint-disable-next-line
//   }, []);  //whenever the singlechat component is mounted (for the 1st time only) ya phir jab tak page refresh karte rahoge , then only for the 1st time  content inside the useEffect(or side effect) will be executed  , so , when i refreshed the page(life cycle of this component will start, so, at first mounted phase, so this time, content inside the useEffect will be executed, then during the other phases of the component(like maintaining and demounting , content of useEffect won't be executed again ,since, dependency array is empty) , agar phir se refresh karoge, then again life cycle of this component will start and similarly for the 1st time only(during the mounting phase), this useEffect will run )

//   useEffect(() => {
//     fetchMessages();

//     selectedChatCompare = selectedChat ; 
//     // eslint-disable-next-line
//   }, [selectedChat]);  // For the 1st time , when the component mounted, then fetchMessage func call , then jab jab selectedChat changes , call the func again.

//   useEffect(() => {
//     socket.on("message received", (newMessageRecieved) => {
//       //console.log karke dekh lo newMessageRecieved kya kya contain karta hai., it has createdAt(which is time stamp)(since, frontend me console kar rahe ho, then after sending message, webpage ka console me result dekhne milega.)
//       const formattedTimestamp = moment(newMessageRecieved.createdAt).format('MMMM Do YYYY, h:mm:ss a');  //newMessageRecieved already has a timeStamp field but, it is not formatted, do console.log and see(since, consoling in frontend codebase, so webpage ka console me dikhega after sending the message)
//       const messageWithTimestamp = { ...newMessageRecieved, createdAt: formattedTimestamp };  //updated the timeStamp field of the newMessageRecieved
//       console.log("messageWithTimestamp is :", messageWithTimestamp);
      
//       if (  //to show  notification
//         !selectedChatCompare || 
//         selectedChatCompare._id !== newMessageRecieved.chat._id
//       ) {
//         if (!notification.includes(messageWithTimestamp)) {
//           setNotification([messageWithTimestamp, ...notification]);
          
//           setFetchAgain(!fetchAgain); 
//         }
//       } else {
//         setMessages([...messages, messageWithTimestamp]);
//       }
//     })
  
//     return () => {
//       socket.off("message received");
//     };
//   }, [messages, notification, selectedChatCompare, fetchAgain, setFetchAgain, setNotification]);
  
  
//   const typingHandler = (e) => {
//     setNewMessage(e.target.value);

//     if (!socketConnected) return;

//     if (!typing) {
//       setTyping(true);
//       socket.emit("typing", selectedChat._id);
//     }
//     let lastTypingTime = new Date().getTime();
//     var timerLength = 3000;
//     setTimeout(() => {
//       var timeNow = new Date().getTime();
//       var timeDiff = timeNow - lastTypingTime;
//       if (timeDiff >= timerLength && typing) {
//         socket.emit("stop typing", selectedChat._id);
//         setTyping(false);
//       }
//     }, timerLength);
//   };

//   return (
//     <>
//       {selectedChat ? (
//         <>
//           <Text
//             fontSize={{ base: "28px", md: "30px" }}
//             pb={3}
//             px={2}
//             w="100%"
//             fontFamily="Work sans"
//             d="flex"
//             justifyContent={{ base: "space-between" }}
//             alignItems="center"
//           >
//             <IconButton
//               d={{ base: "flex", md: "none" }}   //show this only on the smaller screen(base) devices and not on the medium screens or larger
//               icon={<ArrowBackIcon />}  //Show it only on the smaller screen devices
//               onClick={() => setSelectedChat("")}  //clicking the arrow  icon will make the selectedchat empty, so , 1st line of this return functio will be changed and the else part will be shown(click on the chats to start)
//             />
//             {messages &&  //This checks if there are any messages. If there are no messages, the rest of the code inside this block will not be executed.
//               (!selectedChat.isGroupChat ? (  //if Not a group chat
//                 <>
//                   {getSender(user, selectedChat.users)}    {/* This function gets the name of the person you’re chatting with (the other user in the chat). */}
//                   <ProfileModal
//                     user={getSenderFull(user, selectedChat.users)}  // This component opens a modal displaying the full profile of the other user. The getSenderFull(user, selectedChat.users) function is used to get detailed information about the other user.

//                   />
//                 </>
//               ) : (
//                 <>
//                   {selectedChat.chatName}  {/*This displays the name of the group chat. */}
//                   <UpdateGroupChatModal  //This modal is for updating group chat details like the group name, adding/removing members, etc. The props fetchMessages, fetchAgain, and setFetchAgain are passed to this component to help it manage state and refresh the chat messages if needed.
//                     fetchMessages={fetchMessages}
//                     fetchAgain={fetchAgain}
//                     setFetchAgain={setFetchAgain}
//                   />
//                 </>
//               ))}
//           </Text>
//           <Box
//             d="flex"
//             flexDir="column"
//             justifyContent="flex-end"
//             p={3}
//             bg="#E8E8E8"
//             w="100%"
//             h="100%"
//             borderRadius="lg"
//             overflowY="hidden"  //This prevents the content from overflowing vertically, hiding any content that doesn't fit.
//           >
//             {loading ? (
//               <Spinner
//                 size="xl"
//                 w={20}
//                 h={20}
//                 alignSelf="center"
//                 margin="auto"
//               />
//             ) : (  //if , not loading then , The chat messages are displayed using a ScrollableChat component, which takes the messages as a prop and likely renders them in a scrollable view.
//               <div className="messages">
//                 <ScrollableChat messages={messages} />  {/*this part shows the messages, so, to change the ui of the messages, tackle this */}
//               </div>
//             )}

//             <FormControl
//               onKeyDown={sendMessage}  //This triggers the sendMessage function whenever a key is pressed in the input field. Usually, this would be used to send a message when the "Enter" key is pressed.
//               id="first-name"
//               isRequired  //id="first-name" and isRequired: These are standard form control attributes. isRequired means the input is required, though this might not be necessary since the user will always type something to send.
//               mt={3}  //This adds margin at the top of the input field.
//             >
//               {istyping ? (  //istyping ?: This checks if the other user is currently typing.
//                 <div>
//                   <Lottie  // A Lottie animation is displayed, which shows a typing indicator.
//                     options={defaultOptions}
//                     // height={50}
//                     width={70}
//                     style={{ marginBottom: 15, marginLeft: 0 }}
//                   />
//                 </div>
//               ) : (  
//                 <></>  //If false: Nothing is rendered (an empty fragment)
//               )}

//           <IconButton
//             icon={<AttachmentIcon />}
//             onClick={() => document.getElementById('fileInput').click()}
//             aria-label="Attach File"
//           />
//               <Input  //Input Field for Messages
//                 variant="filled"
//                 bg="#E0E0E0"
//                 placeholder="Enter a message.."
//                 value={newMessage}
//                 onChange={typingHandler}
//               />
//             </FormControl>
//           </Box>
//         </>
//       ) : (  //else part  
//         <Box d="flex" alignItems="center" justifyContent="center" h="100%">
//           <Text fontSize="3xl" pb={3} fontFamily="Work sans">
//             Click on a user to start chatting
//           </Text>
//         </Box>
//       )}
//     </>
//   );
// };

// export default SingleChat;





// import { FormControl } from "@chakra-ui/form-control";
// import { Input } from "@chakra-ui/input";
// import { Box, Text } from "@chakra-ui/layout";
// import "./styles.css";
// import { IconButton, Spinner, useToast } from "@chakra-ui/react";
// import { getSender, getSenderFull } from "../config/ChatLogics";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { ArrowBackIcon, ArrowRightIcon,  AttachmentIcon } from "@chakra-ui/icons";
// import ProfileModal from "./miscellaneous/ProfileModal";
// import ScrollableChat from "./ScrollableChat";
// import Lottie from "react-lottie";
// import animationData from "../animations/typing.json";
// import moment from 'moment';


// import io from "socket.io-client";
// import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
// import { ChatState } from "../Context/ChatProvider";
// const ENDPOINT = "http://localhost:5000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment  //it is the link where our server/backend(and yeah, before deployment, we have the options to run the backend /server in the port we want(like 5000, in the server.js)) is running(so,at link we will have our server present/hosted and here we will make the request )
// var socket, selectedChatCompare;  //note ; socket is a variable , not the state.

// const SingleChat = ({ fetchAgain, setFetchAgain }) => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false); 
//   const [newMessage, setNewMessage] = useState("");
//   const [socketConnected, setSocketConnected] = useState(false);
//   const [typing, setTyping] = useState(false);  //when i am typing
//   const [istyping, setIsTyping] = useState(false);  //when other user is typing
//   const [file, setFile] = useState(null); // New state for file
//   const toast = useToast();

//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },
//   };
//   const { selectedChat, setSelectedChat, user, notification, setNotification } =
//     ChatState();

// // Update handleFileChange function to handle multiple files
// const handleFileChange = (e) => {
//   setFile(e.target.files[0]);
// };

// const sendFile = async () => {
//   if (!file) return;

//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("chatId", selectedChat._id);

//   try {
//       const config = {
//           headers: {
//               Authorization: `Bearer ${user.token}`,
//           },
//       };

//       const { data } = await axios.post("/api/message/upload", formData, config);

//       setFile(null); // Clear the file after uploading
//       socket.emit("new message", data);
//       setMessages([...messages, data]);
//   } catch (error) {
//       toast({
//           title: "Error Occured!",
//           description: "Failed to upload the file",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//           position: "bottom",
//       });
//   }
// };

//   const fetchMessages = async () => {
//     if (!selectedChat) return;

//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,  
//         },
//       };

//       setLoading(true);

//       const { data } = await axios.get(
//         `/api/message/${selectedChat._id}`,
//         config
//       );
//       setMessages(data);  //Messages is an array
//       setLoading(false);  //spinner will disappear

//       socket.emit("join chat", selectedChat._id);
//     } catch (error) {
//       toast({
//         title: "Error Occured!",
//         description: "Failed to Load the Messages",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//     }
//   };


//   //Send the Message(but, I don't just want to send a simple statement, I want all the informations about the users as well , so backend api me request kiya for some more information . (see the ChatController sendMessage funciton in backend))

//   const sendMessage = async (event) => {  //whenever enter key pressed , the new message goes to backend where it is stored in both the messages field of message collection ]] and latest message field of this chat(find using chatId) inside the chat collection
//     if (event.key === "Enter" && newMessage) { 
//       socket.emit("stop typing", selectedChat._id);
//       try {
//         const config = {
//           headers: {
//             "Content-type": "application/json",
//             Authorization: `Bearer ${user.token}`,
//           },
//         };
        
//         const { data } = await axios.post(   //data contains the latestMessage object received from backend after populating the message with the sender's name , pic, email etc
//           "/api/message",  //goes to sendMessage controller function of the message controller
//           {
//             content: newMessage,  //well sending both of them compulsory, becoz , sendMessage field me stated directly ki if a request comes wihtout either content and chatId , then say invlid request
//             chatId: selectedChat,
//           },
//           config
//         );
        
//         //here when i console.log(data) kiya , then in the frontend ka console(means web page ka console me data dekhne milega, when i send the message to anyone) ,so, to other user, i sent the message hello (and then opened the console of the web page, i got to see, data is an object(and has chat(contains the chat id), )) 
//         setNewMessage("");  //* it was written previously before. check this.
        
//         socket.emit("new message", data);  //Now, send this data (or the latest message object ) to the server/backend again so in the new message stream so that it can again emit/broadcast this latest message object(containing name of the sender, email, pic etc) to the other user in the group/other user if one on chat.
//         setMessages([...messages, data]);  //messages: Stores the array of messages in the current chat., appended this latest message in it also(at last index)
//       } catch (error) {
//         toast({
//           title: "Error Occured!",
//           description: "Failed to send the Message",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//           position: "bottom",
//         });
//       }
//     }
//   };


//   useEffect(() => {
//     socket = io(ENDPOINT);  //establish the connection with the server/backend , endpoint contains url where the server is either running /hosted
//     socket.emit("setup", user);  //whenever the logged in user selects a chat ,singlChat compoent is rendered , so content inside the useEffect is executed, and with this line, we are sending the information about the user(userId) to the backend saying this person is connected in one side(since, he selected a chat and single chat component is rendered) 
//     socket.on("connected", () => setSocketConnected(true));  // .on means i am listening to some stream/event named(connected, sent by the backend) and from the backend connected stream is emitted only when a person on the other side is connected(this code was obviously written by me )
//     socket.on("typing", () => setIsTyping(true));  //IsTyping represents the typing other person is doint , so when Istypin is true, other person is typing and we will show the typing animation
//     socket.on("stop typing", () => setIsTyping(false));

//     // eslint-disable-next-line
//   }, []);  //whenever the singlechat component is mounted (for the 1st time only) ya phir jab tak page refresh karte rahoge , then only for the 1st time  content inside the useEffect(or side effect) will be executed  , so , when i refreshed the page(life cycle of this component will start, so, at first mounted phase, so this time, content inside the useEffect will be executed, then during the other phases of the component(like maintaining and demounting , content of useEffect won't be executed again ,since, dependency array is empty) , agar phir se refresh karoge, then again life cycle of this component will start and similarly for the 1st time only(during the mounting phase), this useEffect will run )

//   useEffect(() => {
//     fetchMessages();

//     selectedChatCompare = selectedChat ; 
//     // eslint-disable-next-line
//   }, [selectedChat]);  // For the 1st time , when the component mounted, then fetchMessage func call , then jab jab selectedChat changes , call the func again.

//   useEffect(() => {
//     socket.on("message received", (newMessageRecieved) => {
//       //console.log karke dekh lo newMessageRecieved kya kya contain karta hai., it has createdAt(which is time stamp)(since, frontend me console kar rahe ho, then after sending message, webpage ka console me result dekhne milega.)
//       const formattedTimestamp = moment(newMessageRecieved.createdAt).format('MMMM Do YYYY, h:mm:ss a');  //newMessageRecieved already has a timeStamp field but, it is not formatted, do console.log and see(since, consoling in frontend codebase, so webpage ka console me dikhega after sending the message)
//       const messageWithTimestamp = { ...newMessageRecieved, createdAt: formattedTimestamp };  //updated the timeStamp field of the newMessageRecieved
//       console.log("messageWithTimestamp is :", messageWithTimestamp);
      
//       if (  //to show  notification
//         !selectedChatCompare || 
//         selectedChatCompare._id !== newMessageRecieved.chat._id
//       ) {
//         if (!notification.includes(messageWithTimestamp)) {
//           setNotification([messageWithTimestamp, ...notification]);
          
//           setFetchAgain(!fetchAgain); 
//         }
//       } else {
//         setMessages([...messages, messageWithTimestamp]);
//       }
//     })
  
//     return () => {
//       socket.off("message received");
//     };
//   }, [messages, notification, selectedChatCompare, fetchAgain, setFetchAgain, setNotification]);
  
  
//   const typingHandler = (e) => {
//     setNewMessage(e.target.value);

//     if (!socketConnected) return;

//     if (!typing) {
//       setTyping(true);
//       socket.emit("typing", selectedChat._id);
//     }
//     let lastTypingTime = new Date().getTime();
//     var timerLength = 3000;
//     setTimeout(() => {
//       var timeNow = new Date().getTime();
//       var timeDiff = timeNow - lastTypingTime;
//       if (timeDiff >= timerLength && typing) {
//         socket.emit("stop typing", selectedChat._id);
//         setTyping(false);
//       }
//     }, timerLength);
//   };

//   return (
//     <>
//       {selectedChat ? (
//         <>
//           <Text
//             fontSize={{ base: "28px", md: "30px" }}
//             pb={3}
//             px={2}
//             w="100%"
//             fontFamily="Work sans"
//             d="flex"
//             justifyContent={{ base: "space-between" }}
//             alignItems="center"
//           >
//             <IconButton
//               d={{ base: "flex", md: "none" }}   //show this only on the smaller screen(base) devices and not on the medium screens or larger
//               icon={<ArrowBackIcon />}  //Show it only on the smaller screen devices
//               onClick={() => setSelectedChat("")}  //clicking the arrow  icon will make the selectedchat empty, so , 1st line of this return functio will be changed and the else part will be shown(click on the chats to start)
//             />
//             {messages &&  //This checks if there are any messages. If there are no messages, the rest of the code inside this block will not be executed.
//               (!selectedChat.isGroupChat ? (  //if Not a group chat
//                 <>
//                   {getSender(user, selectedChat.users)}    {/* This function gets the name of the person you’re chatting with (the other user in the chat). */}
//                   <ProfileModal
//                     user={getSenderFull(user, selectedChat.users)}  // This component opens a modal displaying the full profile of the other user. The getSenderFull(user, selectedChat.users) function is used to get detailed information about the other user.

//                   />
//                 </>
//               ) : (
//                 <>
//                   {selectedChat.chatName}  {/*This displays the name of the group chat. */}
//                   <UpdateGroupChatModal  //This modal is for updating group chat details like the group name, adding/removing members, etc. The props fetchMessages, fetchAgain, and setFetchAgain are passed to this component to help it manage state and refresh the chat messages if needed.
//                     fetchMessages={fetchMessages}
//                     fetchAgain={fetchAgain}
//                     setFetchAgain={setFetchAgain}
//                   />
//                 </>
//               ))}
//           </Text>
//           <Box
//             d="flex"
//             flexDir="column"
//             justifyContent="flex-end"
//             p={3}
//             bg="#E8E8E8"
//             w="100%"
//             h="100%"
//             borderRadius="lg"
//             overflowY="hidden"  //This prevents the content from overflowing vertically, hiding any content that doesn't fit.
//           >
//             {loading ? (
//               <Spinner
//                 size="xl"
//                 w={20}
//                 h={20}
//                 alignSelf="center"
//                 margin="auto"
//               />
//             ) : (  //if , not loading then , The chat messages are displayed using a ScrollableChat component, which takes the messages as a prop and likely renders them in a scrollable view.
//               <div className="messages">
//                 <ScrollableChat messages={messages} />  {/*this part shows the messages, so, to change the ui of the messages, tackle this */}
//               </div>
//             )}

//             <FormControl
//               onKeyDown={sendMessage}  //This triggers the sendMessage function whenever a key is pressed in the input field. Usually, this would be used to send a message when the "Enter" key is pressed.
//               id="first-name"
//               isRequired  //id="first-name" and isRequired: These are standard form control attributes. isRequired means the input is required, though this might not be necessary since the user will always type something to send.
//               mt={3}  //This adds margin at the top of the input field.
//             >
//               {istyping ? (  //istyping ?: This checks if the other user is currently typing.
//                 <div>
//                   <Lottie  // A Lottie animation is displayed, which shows a typing indicator.
//                     options={defaultOptions}
//                     // height={50}
//                     width={70}
//                     style={{ marginBottom: 15, marginLeft: 0 }}
//                   />
//                 </div>
//               ) : (  
//                 <></>  //If false: Nothing is rendered (an empty fragment)
//               )}

//           <IconButton
//             icon={<AttachmentIcon />}
//             onClick={() => document.getElementById('fileInput').click()}
//             aria-label="Attach File"
//           />
//               <Input
//         id="fileInput"
//         type="file"
//         style={{ display: 'none' }}
//         onChange={handleFileChange}
//     />
//     <IconButton
//         icon={<ArrowRightIcon />}
//         onClick={sendFile}
//         aria-label="Send File"
//     />
//               <Input  //Input Field for Messages
//                 variant="filled"
//                 bg="#E0E0E0"
//                 placeholder="Enter a message.."
//                 value={newMessage}
//                 onChange={typingHandler}
//               />
//             </FormControl>
//           </Box>
//         </>
//       ) : (  //else part  
//         <Box d="flex" alignItems="center" justifyContent="center" h="100%">
//           <Text fontSize="3xl" pb={3} fontFamily="Work sans">
//             Click on a user to start chatting
//           </Text>
//         </Box>
//       )}
//     </>
//   );
// };

// export default SingleChat;







// import { FormControl } from "@chakra-ui/form-control";
// import { Input } from "@chakra-ui/input";
// import { Box, Text } from "@chakra-ui/layout";
// import "./styles.css";
// import { IconButton, Spinner, useToast } from "@chakra-ui/react";
// import { getSender, getSenderFull } from "../config/ChatLogics";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { ArrowBackIcon, ArrowRightIcon,  AttachmentIcon  } from "@chakra-ui/icons";
// import ProfileModal from "./miscellaneous/ProfileModal";
// import ScrollableChat from "./ScrollableChat";
// import Lottie from "react-lottie";
// import animationData from "../animations/typing.json";
// import moment from 'moment';
// import data from '@emoji-mart/data'
// import Picker from '@emoji-mart/react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSmile } from '@fortawesome/free-solid-svg-icons';  // Smile icon from Font Awesome


// import io from "socket.io-client";
// import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
// import { ChatState } from "../Context/ChatProvider";
// const ENDPOINT = "http://localhost:5000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment  //it is the link where our server/backend(and yeah, before deployment, we have the options to run the backend /server in the port we want(like 5000, in the server.js)) is running(so,at link we will have our server present/hosted and here we will make the request )
// var socket, selectedChatCompare;  //note ; socket is a variable , not the state.

// const SingleChat = ({ fetchAgain, setFetchAgain }) => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false); 
//   const [newMessage, setNewMessage] = useState("");
//   const [socketConnected, setSocketConnected] = useState(false);
//   const [typing, setTyping] = useState(false);  //when i am typing
//   const [istyping, setIsTyping] = useState(false);  //when other user is typing
//   const [file, setFile] = useState(null); // New state for file
//   const toast = useToast();
//   // Inside your component
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);

//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },
//   };
//   const { selectedChat, setSelectedChat, user, notification, setNotification } =
//     ChatState();


// const addEmoji = (e) => {
//   const emoji = e.native;
//   setNewMessage((prevMessage) => prevMessage + emoji);
// };
// // Update handleFileChange function to handle multiple files
// const handleFileChange = (e) => {
//   setFile(e.target.files[0]);
// };

// const sendFile = async () => {
//   if (!file) return;

//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("chatId", selectedChat._id);

//   try {
//       const config = {
//           headers: {
//               Authorization: `Bearer ${user.token}`,
//           },
//       };

//       const { data } = await axios.post("/api/message/upload", formData, config);

//       setFile(null); // Clear the file after uploading
//       socket.emit("new message", data);
//       setMessages([...messages, data]);
//   } catch (error) {
//       toast({
//           title: "Error Occured!",
//           description: "Failed to upload the file",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//           position: "bottom",
//       });
//   }
// };

//   const fetchMessages = async () => {
//     if (!selectedChat) return;

//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,  
//         },
//       };

//       setLoading(true);

//       const { data } = await axios.get(
//         `/api/message/${selectedChat._id}`,
//         config
//       );
//       setMessages(data);  //Messages is an array
//       setLoading(false);  //spinner will disappear

//       socket.emit("join chat", selectedChat._id);
//     } catch (error) {
//       toast({
//         title: "Error Occured!",
//         description: "Failed to Load the Messages",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//     }
//   };


//   //Send the Message(but, I don't just want to send a simple statement, I want all the informations about the users as well , so backend api me request kiya for some more information . (see the ChatController sendMessage funciton in backend))

//   const sendMessage = async (event) => {  //whenever enter key pressed , the new message goes to backend where it is stored in both the messages field of message collection ]] and latest message field of this chat(find using chatId) inside the chat collection
//     if (event.key === "Enter" && newMessage) { 
//       socket.emit("stop typing", selectedChat._id);
//       try {
//         const config = {
//           headers: {
//             "Content-type": "application/json",
//             Authorization: `Bearer ${user.token}`,
//           },
//         };
        
//         const { data } = await axios.post(   //data contains the latestMessage object received from backend after populating the message with the sender's name , pic, email etc
//           "/api/message",  //goes to sendMessage controller function of the message controller
//           {
//             content: newMessage,  //well sending both of them compulsory, becoz , sendMessage field me stated directly ki if a request comes wihtout either content and chatId , then say invlid request
//             chatId: selectedChat,
//           },
//           config
//         );
        
//         //here when i console.log(data) kiya , then in the frontend ka console(means web page ka console me data dekhne milega, when i send the message to anyone) ,so, to other user, i sent the message hello (and then opened the console of the web page, i got to see, data is an object(and has chat(contains the chat id), )) 
//         setNewMessage("");  //* it was written previously before. check this.
        
//         socket.emit("new message", data);  //Now, send this data (or the latest message object ) to the server/backend again so in the new message stream so that it can again emit/broadcast this latest message object(containing name of the sender, email, pic etc) to the other user in the group/other user if one on chat.
//         setMessages([...messages, data]);  //messages: Stores the array of messages in the current chat., appended this latest message in it also(at last index)
//       } catch (error) {
//         toast({
//           title: "Error Occured!",
//           description: "Failed to send the Message",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//           position: "bottom",
//         });
//       }
//     }
//   };


//   useEffect(() => {
//     socket = io(ENDPOINT);  //establish the connection with the server/backend , endpoint contains url where the server is either running /hosted
//     socket.emit("setup", user);  //whenever the logged in user selects a chat ,singlChat compoent is rendered , so content inside the useEffect is executed, and with this line, we are sending the information about the user(userId) to the backend saying this person is connected in one side(since, he selected a chat and single chat component is rendered) 
//     socket.on("connected", () => setSocketConnected(true));  // .on means i am listening to some stream/event named(connected, sent by the backend) and from the backend connected stream is emitted only when a person on the other side is connected(this code was obviously written by me )
//     socket.on("typing", () => setIsTyping(true));  //IsTyping represents the typing other person is doint , so when Istypin is true, other person is typing and we will show the typing animation
//     socket.on("stop typing", () => setIsTyping(false));

//     // eslint-disable-next-line
//   }, []);  //whenever the singlechat component is mounted (for the 1st time only) ya phir jab tak page refresh karte rahoge , then only for the 1st time  content inside the useEffect(or side effect) will be executed  , so , when i refreshed the page(life cycle of this component will start, so, at first mounted phase, so this time, content inside the useEffect will be executed, then during the other phases of the component(like maintaining and demounting , content of useEffect won't be executed again ,since, dependency array is empty) , agar phir se refresh karoge, then again life cycle of this component will start and similarly for the 1st time only(during the mounting phase), this useEffect will run )

//   useEffect(() => {
//     fetchMessages();

//     selectedChatCompare = selectedChat ; 
//     // eslint-disable-next-line
//   }, [selectedChat]);  // For the 1st time , when the component mounted, then fetchMessage func call , then jab jab selectedChat changes , call the func again.

//   useEffect(() => {
//     socket.on("message received", (newMessageRecieved) => {
//       //console.log karke dekh lo newMessageRecieved kya kya contain karta hai., it has createdAt(which is time stamp)(since, frontend me console kar rahe ho, then after sending message, webpage ka console me result dekhne milega.)
//       const formattedTimestamp = moment(newMessageRecieved.createdAt).format('MMMM Do YYYY, h:mm:ss a');  //newMessageRecieved already has a timeStamp field but, it is not formatted, do console.log and see(since, consoling in frontend codebase, so webpage ka console me dikhega after sending the message)
//       const messageWithTimestamp = { ...newMessageRecieved, createdAt: formattedTimestamp };  //updated the timeStamp field of the newMessageRecieved
//       console.log("messageWithTimestamp is :", messageWithTimestamp);
      
//       if (  //to show  notification
//         !selectedChatCompare || 
//         selectedChatCompare._id !== newMessageRecieved.chat._id
//       ) {
//         if (!notification.includes(messageWithTimestamp)) {
//           setNotification([messageWithTimestamp, ...notification]);
          
//           setFetchAgain(!fetchAgain); 
//         }
//       } else {
//         setMessages([...messages, messageWithTimestamp]);
//       }
//     })
  
//     return () => {
//       socket.off("message received");
//     };
//   }, [messages, notification, selectedChatCompare, fetchAgain, setFetchAgain, setNotification]);
  
  
//   const typingHandler = (e) => {
//     setNewMessage(e.target.value);

//     if (!socketConnected) return;

//     if (!typing) {
//       setTyping(true);
//       socket.emit("typing", selectedChat._id);
//     }
//     let lastTypingTime = new Date().getTime();
//     var timerLength = 3000;
//     setTimeout(() => {
//       var timeNow = new Date().getTime();
//       var timeDiff = timeNow - lastTypingTime;
//       if (timeDiff >= timerLength && typing) {
//         socket.emit("stop typing", selectedChat._id);
//         setTyping(false);
//       }
//     }, timerLength);
//   };

//   return (
//     <>
//       {selectedChat ? (
//         <>
//           <Text
//             fontSize={{ base: "28px", md: "30px" }}
//             pb={3}
//             px={2}
//             w="100%"
//             fontFamily="Work sans"
//             d="flex"
//             justifyContent={{ base: "space-between" }}
//             alignItems="center"
//           >
//             <IconButton
//               d={{ base: "flex", md: "none" }}   //show this only on the smaller screen(base) devices and not on the medium screens or larger
//               icon={<ArrowBackIcon />}  //Show it only on the smaller screen devices
//               onClick={() => setSelectedChat("")}  //clicking the arrow  icon will make the selectedchat empty, so , 1st line of this return functio will be changed and the else part will be shown(click on the chats to start)
//             />
//             {messages &&  //This checks if there are any messages. If there are no messages, the rest of the code inside this block will not be executed.
//               (!selectedChat.isGroupChat ? (  //if Not a group chat
//                 <>
//                   {getSender(user, selectedChat.users)}    {/* This function gets the name of the person you’re chatting with (the other user in the chat). */}
//                   <ProfileModal
//                     user={getSenderFull(user, selectedChat.users)}  // This component opens a modal displaying the full profile of the other user. The getSenderFull(user, selectedChat.users) function is used to get detailed information about the other user.

//                   />
//                 </>
//               ) : (
//                 <>
//                   {selectedChat.chatName}  {/*This displays the name of the group chat. */}
//                   <UpdateGroupChatModal  //This modal is for updating group chat details like the group name, adding/removing members, etc. The props fetchMessages, fetchAgain, and setFetchAgain are passed to this component to help it manage state and refresh the chat messages if needed.
//                     fetchMessages={fetchMessages}
//                     fetchAgain={fetchAgain}
//                     setFetchAgain={setFetchAgain}
//                   />
//                 </>
//               ))}
//           </Text>
//           <Box
//             d="flex"
//             flexDir="column"
//             justifyContent="flex-end"
//             p={3}
//             bg="#E8E8E8"
//             w="100%"
//             h="100%"
//             borderRadius="lg"
//             overflowY="hidden"  //This prevents the content from overflowing vertically, hiding any content that doesn't fit.
//           >
//             {loading ? (
//               <Spinner
//                 size="xl"
//                 w={20}
//                 h={20}
//                 alignSelf="center"
//                 margin="auto"
//               />
//             ) : (  //if , not loading then , The chat messages are displayed using a ScrollableChat component, which takes the messages as a prop and likely renders them in a scrollable view.
//               <div className="messages">
//                 <ScrollableChat messages={messages} />  {/*this part shows the messages, so, to change the ui of the messages, tackle this */}
//               </div>
//             )}

//             <FormControl
//               onKeyDown={sendMessage}  //This triggers the sendMessage function whenever a key is pressed in the input field. Usually, this would be used to send a message when the "Enter" key is pressed.
//               id="first-name"
//               isRequired  //id="first-name" and isRequired: These are standard form control attributes. isRequired means the input is required, though this might not be necessary since the user will always type something to send.
//               mt={3}  //This adds margin at the top of the input field.
//             >
//               {istyping ? (  //istyping ?: This checks if the other user is currently typing.
//                 <div>
//                   <Lottie  // A Lottie animation is displayed, which shows a typing indicator.
//                     options={defaultOptions}
//                     // height={50}
//                     width={70}
//                     style={{ marginBottom: 15, marginLeft: 0 }}
//                   />
//                 </div>
//               ) : (  
//                 <></>  //If false: Nothing is rendered (an empty fragment)
//               )}

// <IconButton
//         icon={<AttachmentIcon />}
//         variant="ghost"
//         aria-label="Attach File"
//         fontSize="24px"
//         marginRight="4px"
//         _hover={{ backgroundColor: 'gray.100' }}
//       />
//     <IconButton
//         icon={<ArrowRightIcon />}
//         onClick={sendFile}
//         aria-label="Send File"
//     />
//     <Input  //Input Field for Messages
//       variant="filled"
//       bg="#E0E0E0"
//       placeholder="Enter a message.."
//       value={newMessage}
//       onChange={typingHandler}
//     />

//               {showEmojiPicker && (
//                 <Picker data={data} onEmojiSelect={addEmoji} />
//               )}
//              <IconButton
//                 icon={<FontAwesomeIcon icon={faSmile} />} // Use Font Awesome emoji icon
//                 onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//                 aria-label="Emoji Picker"
//               />
//     </FormControl>
//           </Box>
//         </>
//       ) : (  //else part  
//         <Box d="flex" alignItems="center" justifyContent="center" h="100%">
//           <Text fontSize="3xl" pb={3} fontFamily="Work sans">
//             Click on a user to start chatting
//           </Text>
//         </Box>
//       )}
//     </>
//   );
// };

// export default SingleChat;






import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text, Image } from "@chakra-ui/react"; // Make sure to import Image from Chakra UI
import "./styles.css";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBackIcon, ArrowRightIcon, AttachmentIcon } from "@chakra-ui/icons";
import ProfileModal from "./miscellaneous/ProfileModal";
import ScrollableChat from "./ScrollableChat";
import Lottie from "react-lottie";
import animationData from "../animations/typing.json";
import moment from 'moment';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons'; // Smile icon from Font Awesome

import io from "socket.io-client";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { ChatState } from "../Context/ChatProvider";

const ENDPOINT = "http://localhost:5000"; // Replace with your server URL after deployment
let socket, selectedChatCompare; // socket is a variable, not a state.

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false); // When I am typing
  const [istyping, setIsTyping] = useState(false); // When other user is typing
  const [file, setFile] = useState(null); // State for file
  const toast = useToast();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  // Function to add emoji to the message
  const addEmoji = (e) => {
    const emoji = e.native;
    setNewMessage((prevMessage) => prevMessage + emoji);
  };

  // Handle file selection and notify user
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      toast({
        title: "File Selected!",
        description: `${selectedFile.name} has been selected.`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  

  // // Function to send both message and file
  // const handleSend = async () => {
  //   if (!newMessage.trim() && !file) {
  //     toast({
  //       title: "Cannot Send Empty Message",
  //       description: "Please type a message or select a file to send.",
  //       status: "warning",
  //       duration: 3000,
  //       isClosable: true,
  //       position: "bottom",
  //     });
  //     return;
  //   }
  
  //   socket.emit("stop typing", selectedChat._id);
  //   setTyping(false);
  
  //   try {
  //     let fileData = null;
  
  //     if (file) {
  //       const formData = new FormData();
  //       formData.append("file", file);
  //       formData.append("chatId", selectedChat._id);
  //       // console.log(formData);   //won't get anything here even after you select the file, in console empty formData will be shown(reason: behavior of the browser, they don't show the formdata directly.)
  //       // Log the FormData contents(if want to see , use this technique)
  //         // for (let [key, value] of formData.entries()) {
  //         //   console.log(key, value);
  //         // }
  //       const config = {
  //         headers: {
  //           Authorization: `Bearer ${user.token}`,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       };
  //       console.log("hello world");
  //       const { data: fileUploadData } = await axios.post("/api/message/upload", formData, config);  //formData is the payload , Once the server responds, it captures the response data (and destructure it) and assigns it to the variable fileData.
        
  //       fileData = fileUploadData;
  //       console.log(fileData);
        

  //       console.log("hello world before filedata if block")
  //       if (!fileData) {
  //         console.log("file upload fail");
  //         throw new Error("File upload failed");
          
  //       }
        
  //     }
  //     console.log("hello world after filedata if block")
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     };
  
  //     const messagePayload = {
  //       content: newMessage.trim(),
  //       chatId: selectedChat._id,
  //     };
  //     console.log("hello world after payload")
  //     if (fileData) {
  //       messagePayload.file = fileData.filePath; // Assuming the backend returns filePath
  //       messagePayload.type = "file";
  //     } else if (newMessage.trim()) {
  //       messagePayload.type = "text";
  //     }
  //     console.log("hello world before bad request");
  //     const { data: messageData } = await axios.post("/api/message", messagePayload, config);

  //     setNewMessage(""); // Clear the input field
  //     setFile(null); // Clear the selected file
  
  //     socket.emit("new message", messageData);
  //     setMessages([...messages, messageData]);
  //   } catch (error) {
  //     toast({
  //       title: "Error Occurred!",
  //       description: "Failed to send the message or upload the file.",
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom",
  //     });
  //   }
  // };
  
  const handleSend = async () => {
    if (!newMessage.trim() && !file) {
      toast({
        title: "Cannot Send Empty Message",
        description: "Please type a message or select a file to send.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
  
    socket.emit("stop typing", selectedChat._id);
    setTyping(false);
  
    try {
      const formData = new FormData();
      formData.append("chatId", selectedChat._id);

      if (newMessage.trim()) {
        formData.append("content", newMessage.trim());
      }

      if (file) {
        formData.append("file", file);
      }
      //printing the content of formData
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,  // Correct formatting for Authorization header
          "Content-Type": "multipart/form-data",
        },
      };
  
      const { data: messageData } = await axios.post("/api/message", formData, config);
      console.log(messageData);
      setNewMessage(""); // Clear the input field
      setFile(null); // Clear the selected file
  
      socket.emit("new message", messageData);
      setMessages([...messages, messageData]);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to send the message or upload the file.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
    
  // Function to fetch messages
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,  
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data); // Messages is an array
      setLoading(false); // Spinner will disappear

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  // Initialize socket connection
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  // Fetch messages when selectedChat changes
  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  // Listen for new messages
  useEffect(() => {
    socket.on("message received", (newMessageRecieved) => {
      const formattedTimestamp = moment(newMessageRecieved.createdAt).format('MMMM Do YYYY, h:mm:ss a');
      const messageWithTimestamp = { ...newMessageRecieved, createdAt: formattedTimestamp };
      
      
      if (
        !selectedChatCompare || 
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(messageWithTimestamp)) {
          setNotification([messageWithTimestamp, ...notification]);
          setFetchAgain(!fetchAgain); 
        }
      } else {
        setMessages([...messages, messageWithTimestamp]);
      }
    });

    return () => {
      socket.off("message received");
    };
  }, [messages, notification, selectedChatCompare, fetchAgain, setFetchAgain, setNotification]);

  // Handle typing status
  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    const timerLength = 3000;

    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {messages && 
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName}
                  <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}
          </Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
<FormControl id="first-name" isRequired mt={3}>
  {istyping && (
    <div>
      <Lottie
        options={defaultOptions}
        width={70}
        style={{ marginBottom: 15, marginLeft: 0 }}
      />
    </div>
  )}
  
  {showEmojiPicker && (
    <Box position="absolute" bottom="60px" right="20px">
      <Picker 
        data={data} 
        onEmojiSelect={addEmoji} 
        theme="light"
        style={{ width: '200px', height: '200px' }}
      />
    </Box>
  )}

  {/* File Preview */}
  {file && (
    <Box mb={2} bg="gray.200" p={2} borderRadius="md">
      {/\.(jpeg|jpg|gif|png|bmp|svg)$/i.test(file.name) ? (
        <Image src={URL.createObjectURL(file)} alt="preview" maxHeight="200px" />
      ) : (
        <Text>{file.name}</Text>
      )}
    </Box>
  )}

  <Box display="flex" alignItems="center">
    <Input
      variant="filled"
      bg="#E0E0E0"
      placeholder="Enter a message.."
      value={newMessage}
      onChange={typingHandler}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSend();
        }
      }}
    />
    <IconButton
      icon={<AttachmentIcon />}
      variant="ghost"
      aria-label="Attach File"
      fontSize="24px"
      marginLeft="2px"
      onClick={() => document.getElementById('fileInput').click()}
      _hover={{ backgroundColor: 'gray.100' }}
    />
    <input
      type="file"
      id="fileInput"
      style={{ display: 'none' }}
      onChange={handleFileChange}
      accept="image/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    />
    <IconButton
      icon={<ArrowRightIcon />}
      onClick={handleSend}
      aria-label="Send Message"
      colorScheme="blue"
      marginLeft="2px"
    />
    <IconButton
      icon={<FontAwesomeIcon icon={faSmile} />}
      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      aria-label="Emoji Picker"
      variant="ghost"
      fontSize="20px"
      marginLeft="2px"
    />
  </Box>
</FormControl>

          </Box>
        </>
      ) : (
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;





