// // import { Avatar } from "@chakra-ui/avatar";
// // import { Tooltip } from "@chakra-ui/tooltip";
// // import ScrollableFeed from "react-scrollable-feed";
// // import {
// //   isLastMessage,
// //   isSameSender,
// //   isSameSenderMargin,
// //   isSameUser,
// // } from "../config/ChatLogics";
// // import { ChatState } from "../Context/ChatProvider";

// // const ScrollableChat = ({ messages }) => {
// //   const { user } = ChatState();

// //   return (
// //     <ScrollableFeed>
// //       {messages &&
// //         messages.map((m, i) => (
// //           <div style={{ display: "flex" }} key={m._id}>
// //             {(isSameSender(messages, m, i, user._id) ||
// //               isLastMessage(messages, i, user._id)) && (
// //               <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
// //                 <Avatar
// //                   mt="7px"
// //                   mr={1}
// //                   size="sm"
// //                   cursor="pointer"
// //                   name={m.sender.name}
// //                   src={m.sender.pic}
// //                 />
// //               </Tooltip>
// //             )}
// //             <span
// //               style={{
// //                 backgroundColor: `${
// //                   m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
// //                 }`,
// //                 marginLeft: isSameSenderMargin(messages, m, i, user._id),
// //                 marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
// //                 borderRadius: "20px",
// //                 padding: "5px 15px",
// //                 maxWidth: "75%",
// //               }}
// //             >
// //               {m.content}
// //             </span>
// //           </div>
// //         ))}
// //     </ScrollableFeed>
// //   );

// // };
// // export default ScrollableChat;


// import { Avatar } from "@chakra-ui/avatar";
// import { Tooltip } from "@chakra-ui/tooltip";
// import { Box, Text } from "@chakra-ui/react";
// import ScrollableFeed from "react-scrollable-feed";
// import {
//   isLastMessage,
//   isSameSender,
//   isSameSenderMargin,
//   isSameUser,
// } from "../config/ChatLogics";
// import { ChatState } from "../Context/ChatProvider";
// import moment from 'moment';

// const ScrollableChat = ({ messages }) => {
//   const { user } = ChatState();

//   return (
//     <ScrollableFeed>
//       {messages &&
//         messages.map((m, i) => (
//           <Box
//             display="flex"
//             flexDirection="column"
//             marginBottom="10px"
//             key={m._id}
//           >
//             <Box display="flex" alignItems="center">
//               {(isSameSender(messages, m, i, user._id) ||
//                 isLastMessage(messages, i, user._id)) && (
//                 <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
//                   <Avatar
//                     mt="7px"
//                     mr={1}
//                     size="sm"
//                     cursor="pointer"
//                     name={m.sender.name}
//                     src={m.sender.pic}  //this picture  will be displayed in place of avatar
//                   />
//                 </Tooltip>
//               )}
//               <Box
//                 bg={m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}
//                 ml={isSameSenderMargin(messages, m, i, user._id)}
//                 mt={isSameUser(messages, m, i, user._id) ? 3 : 10}
//                 borderRadius="20px"
//                 p="5px 15px"
//                 maxWidth="75%"
//                 position="relative"
//               >
//                 {m.content}
//                 {/* Display timestamp */}
//                 <Text
//                   fontSize="0.75rem" /* Adjust the size of the timestamp */
//                   color="#888888" /* A gray color to differentiate from the message text */
//                   mt={1} /* Space between the message and the timestamp */
//                   textAlign="left" /* Align timestamp to the left */
//                   whiteSpace="nowrap" /* Prevent the timestamp from wrapping to the next line */
//                   fontStyle="italic" /* Optional: Italicize the timestamp */
//                 >
//                   {moment(m.timestamp).format('MMM D, h:mm a')}
//                 </Text>
//               </Box>
//             </Box>
//           </Box>
//         ))}
//     </ScrollableFeed>
//   );
// };

// export default ScrollableChat;




// import { Avatar } from "@chakra-ui/avatar";
// import { Tooltip } from "@chakra-ui/tooltip";
// import ScrollableFeed from "react-scrollable-feed";
// import {
//   isLastMessage,
//   isSameSender,
//   isSameSenderMargin,
//   isSameUser,
// } from "../config/ChatLogics";
// import { ChatState } from "../Context/ChatProvider";

// const ScrollableChat = ({ messages }) => {
//   const { user } = ChatState();

//   return (
//     <ScrollableFeed>
//       {messages &&
//         messages.map((m, i) => (
//           <div style={{ display: "flex" }} key={m._id}>
//             {(isSameSender(messages, m, i, user._id) ||
//               isLastMessage(messages, i, user._id)) && (
//               <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
//                 <Avatar
//                   mt="7px"
//                   mr={1}
//                   size="sm"
//                   cursor="pointer"
//                   name={m.sender.name}
//                   src={m.sender.pic}
//                 />
//               </Tooltip>
//             )}
//             <span
//               style={{
//                 backgroundColor: `${
//                   m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
//                 }`,
//                 marginLeft: isSameSenderMargin(messages, m, i, user._id),
//                 marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
//                 borderRadius: "20px",
//                 padding: "5px 15px",
//                 maxWidth: "75%",
//               }}
//             >
//               {m.content}
//             </span>
//           </div>
//         ))}
//     </ScrollableFeed>
//   );

// };
// export default ScrollableChat;


// import { Avatar } from "@chakra-ui/avatar";
// import { Tooltip } from "@chakra-ui/tooltip";
// import { Box, Text } from "@chakra-ui/react";
// import ScrollableFeed from "react-scrollable-feed";
// import {
//   isLastMessage,
//   isSameSender,
//   isSameSenderMargin,
//   isSameUser,
// } from "../config/ChatLogics";
// import { ChatState } from "../Context/ChatProvider";
// import moment from 'moment';
// const ScrollableChat = ({ messages }) => {
//   const { user } = ChatState();

//   return (
//       <ScrollableFeed>
//           {messages && messages.map((m, i) => (
//               <Box key={m._id} display="flex" flexDirection="column" mb="10px">
//                   <Box display="flex" alignItems="center">
//                       {(isSameSender(messages, m, i, user._id) ||
//                           isLastMessage(messages, i, user._id)) && (
//                           <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
//                               <Avatar
//                                   mt="7px"
//                                   mr={1}
//                                   size="sm"
//                                   cursor="pointer"
//                                   name={m.sender.name}
//                                   src={m.sender.pic}
//                               />
//                           </Tooltip>
//                       )}
//                       <Box
//                           bg={m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}
//                           ml={isSameSenderMargin(messages, m, i, user._id)}
//                           mt={isSameUser(messages, m, i, user._id) ? 3 : 10}
//                           borderRadius="20px"
//                           p="5px 15px"
//                           maxWidth="75%"
//                           position="relative"
//                       >
//                           {m.type === "file" ? (
//                               <a href={`/${m.content}`} target="_blank" rel="noopener noreferrer">
//                                   {m.content.split('/').pop()} {/* Display the file name */}
//                               </a>
//                           ) : (
//                               m.content
//                           )}
//                           <Text fontSize="0.75rem" color="#888888" mt={1} textAlign="left" whiteSpace="nowrap" fontStyle="italic">
//                               {moment(m.timestamp).format('MMM D, h:mm a')}
//                           </Text>
//                       </Box>
//                   </Box>
//               </Box>
//           ))}
//       </ScrollableFeed>
//   );
// };


// export default ScrollableChat;




// import { Avatar } from "@chakra-ui/avatar";
// import { Tooltip } from "@chakra-ui/tooltip";
// import { Box, Text } from "@chakra-ui/react";
// import ScrollableFeed from "react-scrollable-feed";
// import {
//   isLastMessage,
//   isSameSender,
//   isSameSenderMargin,
//   isSameUser,
// } from "../config/ChatLogics";
// import { ChatState } from "../Context/ChatProvider";
// import moment from 'moment';

// const ScrollableChat = ({ messages }) => {
//   const { user } = ChatState();

//   return (
//     <ScrollableFeed>
//       {messages && messages.map((m, i) => (
//         <Box key={m._id} display="flex" flexDirection="column" mb="10px">
//           <Box display="flex" alignItems="center">
//             {(isSameSender(messages, m, i, user._id) ||
//               isLastMessage(messages, i, user._id)) && (
//               <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
//                 <Avatar
//                   mt="7px"
//                   mr={1}
//                   size="sm"
//                   cursor="pointer"
//                   name={m.sender.name}
//                   src={m.sender.pic}
//                 />
//               </Tooltip>
//             )}
//             <Box
//               bg={m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}
//               ml={isSameSenderMargin(messages, m, i, user._id)}
//               mt={isSameUser(messages, m, i, user._id) ? 3 : 10}
//               borderRadius="20px"
//               p="5px 15px"
//               maxWidth="75%"
//               position="relative"
//               wordBreak="break-word" // Ensures long words break to prevent overflow
//             >
//               {m.type === "file" ? (
//                 <a href={`/${m.content}`} target="_blank" rel="noopener noreferrer">
//                   {m.content.split('/').pop()} {/* Display the file name */}
//                 </a>
//               ) : (
//                 m.content
//               )}
//               <Text fontSize="0.75rem" color="#888888" mt={1} textAlign="left" whiteSpace="nowrap" fontStyle="italic">
//                 {moment(m.timestamp).format('MMM D, h:mm a')}
//               </Text>
//             </Box>
//           </Box>
//         </Box>
//       ))}
//     </ScrollableFeed>
//   );
// };

// export default ScrollableChat;



// import { Avatar } from "@chakra-ui/avatar";
// import { Tooltip } from "@chakra-ui/tooltip";
// import { Box, Text } from "@chakra-ui/react";
// import ScrollableFeed from "react-scrollable-feed";
// import {
//   isLastMessage,
//   isSameSender,
//   isSameSenderMargin,
//   isSameUser,
// } from "../config/ChatLogics";
// import { ChatState } from "../Context/ChatProvider";
// import moment from 'moment';

// const ScrollableChat = ({ messages }) => {
//   const { user } = ChatState();


//   return (
//     <ScrollableFeed>
//       {messages && messages.map((m, i) => (
//         <Box key={m._id} display="flex" flexDirection="column" mb="10px">
//           <Box display="flex" alignItems="center">
//             {(isSameSender(messages, m, i, user._id) ||
//               isLastMessage(messages, i, user._id)) && (
//               <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
//                 <Avatar
//                   mt="7px"
//                   mr={1}
//                   size="sm"
//                   cursor="pointer"
//                   name={m.sender.name}
//                   src={m.sender.pic}
//                 />
//               </Tooltip>
//             )}
//             <Box
//               bg={m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}
//               ml={isSameSenderMargin(messages, m, i, user._id)}
//               mt={isSameUser(messages, m, i, user._id) ? 3 : 10}
//               borderRadius="20px"
//               p="5px 15px"
//               maxWidth="75%"
//               position="relative"
//               wordBreak="break-word" // Ensures long words break to prevent overflow
//             >
//               {m.type === "file" ? (
//                 <a href={`/${m.content}`} target="_blank" rel="noopener noreferrer">
//                   {m.content.split('/').pop()} {/* Display the file name */}
//                 </a>
//               ) : (
//                 m.content
//               )}
//               <Text fontSize="0.75rem" color="#888888" mt={1} textAlign="left" whiteSpace="nowrap" fontStyle="italic">
//                 {moment(m.timestamp).format('MMM D, h:mm a')}
//               </Text>
//             </Box>
//           </Box>
//         </Box>
//       ))}
//     </ScrollableFeed>
//   );
// };

// export default ScrollableChat;


// import { Avatar } from "@chakra-ui/avatar";
// import { Tooltip } from "@chakra-ui/tooltip";
// import { Box, Text, Image } from "@chakra-ui/react";
// import ScrollableFeed from "react-scrollable-feed";
// import {
//   isLastMessage,
//   isSameSender,
//   isSameSenderMargin,
//   isSameUser,
// } from "../config/ChatLogics";
// import { ChatState } from "../Context/ChatProvider";
// import moment from "moment";

// // Helper functions to check file type
// const isImage = (filePath) => /\.(jpeg|jpg|gif|png|bmp|svg)$/i.test(filePath.toLowerCase());
// const isPDF = (filePath) => /\.pdf$/i.test(filePath.toLowerCase());

// const ScrollableChat = ({ messages }) => {
//   const { user } = ChatState();

//   console.log("ScrollableChat component rendered"); // Logs each time the component is rendered
//   console.log("Messages: ", messages); // Logs the messages array

//   return (
//     <ScrollableFeed>
//       {messages && messages.map((m, i) => (
//         <Box key={m._id} display="flex" flexDirection="column" mb="10px">
//           <Box display="flex" alignItems="center">
//             {(isSameSender(messages, m, i, user._id) ||
//               isLastMessage(messages, i, user._id)) && (
//               <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
//                 <Avatar
//                   mt="7px"
//                   mr={1}
//                   size="sm"
//                   cursor="pointer"
//                   name={m.sender.name}
//                   src={m.sender.pic}
//                 />
//               </Tooltip>
//             )}
//             <Box
//               bg={m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}
//               ml={isSameSenderMargin(messages, m, i, user._id)}
//               mt={isSameUser(messages, m, i, user._id) ? 3 : 10}
//               borderRadius="20px"
//               p="5px 15px"
//               maxWidth="75%"
//               position="relative"
//               wordBreak="break-word"
//             >
//               {/* Conditionally render content based on file type or message content */}
//               {m.type === "file" && isImage(m.file) ? (
//                 <Image src={`/${m.file}`} alt="sent image" maxW="100%" borderRadius="md" />
//               ) : m.type === "file" && isPDF(m.file) ? (
//                 <a href={`/${m.file}`} target="_blank" rel="noopener noreferrer">
//                   View PDF: {m.file.split('/').pop()}
//                 </a>
//               ) : m.type === "file" ? (
//                 <a href={`/${m.file}`} target="_blank" rel="noopener noreferrer">
//                   {m.file.split('/').pop()}
//                 </a>
//               ) : (
//                 <Text>{m.content}</Text>
//               )}

//               {/* Timestamp for each message */}
//               <Text
//                 fontSize="0.75rem"
//                 color="#888888"
//                 mt={1}
//                 textAlign="left"
//                 whiteSpace="nowrap"
//                 fontStyle="italic"
//               >
//                 {moment(m.timestamp).format('MMM D, h:mm a')}
//               </Text>
//             </Box>
//           </Box>
//         </Box>
//       ))}
//     </ScrollableFeed>
//   );
// };

// export default ScrollableChat;

// import { Avatar } from "@chakra-ui/avatar";
// import { Tooltip } from "@chakra-ui/tooltip";
// import { Box, Text,  useToast } from "@chakra-ui/react";
// import ScrollableFeed from "react-scrollable-feed";
// import {
//   isLastMessage,
//   isSameSender,
//   isSameSenderMargin,
//   isSameUser,
// } from "../config/ChatLogics";
// import { ChatState } from "../Context/ChatProvider";
// import moment from "moment";
// import { useState } from 'react';
// import { Modal, ModalOverlay, ModalContent, ModalBody, Image } from '@chakra-ui/react';  //to expand the image when clicked


// const isImage = (filePath) => typeof filePath === 'string' && /\.(jpeg|jpg|gif|png|bmp|svg)$/i.test(filePath.toLowerCase());
// const isPDF = (filePath) => typeof filePath === 'string' && /\.pdf$/i.test(filePath.toLowerCase());
// const isVideo = (filePath) => typeof filePath === 'string' && /\.(mp4|webm|ogg|mov)$/i.test(filePath.toLowerCase());




// const ScrollableChat = ({ messages }) => {
//   const { user } = ChatState();
//   const toast = useToast();

//   //to handle the expand image on click (npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion --legacy-peer-deps)
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [scale, setScale] = useState(1); // State to keep track of zoom level


//     const handleImageClick = (image) => {
//         setSelectedImage(image);
//         setIsOpen(true);
//     };

//     const handleClose = () => {
//         setIsOpen(false);
//         setSelectedImage(null);
//         setScale(1);  // Reset zoom level when modal is closed
//     };

//     const handleZoom = (e) => {
//       e.preventDefault(); // Prevent the default scroll behavior
//       const zoomStep = 0.05;  // Smaller step for slower zooming
//       let newScale = scale + e.deltaY * -zoomStep;
  
//       // Clamping the zoom scale between 1x and 3x
//       if (newScale < 1) {
//         newScale = 1;
//       } else if (newScale > 3) {
//         newScale = 3;
//       }
  
//       // Apply the new scale
//       setScale(newScale);
//     };
  
//   return (
//     <ScrollableFeed>
//       {messages && messages.map((m, i) => (
//         <Box key={m._id} display="flex" flexDirection="column" mb="10px">
//           <Box display="flex" alignItems="center">
//             {(isSameSender(messages, m, i, user._id) ||
//               isLastMessage(messages, i, user._id)) && (
//               <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
//                 <Avatar
//                   mt="7px"
//                   mr={1}
//                   size="sm"
//                   cursor="pointer"
//                   name={m.sender.name}
//                   src={m.sender.pic}
//                 />
//               </Tooltip>
//             )}
//             <Box
//               bg={m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}
//               ml={isSameSenderMargin(messages, m, i, user._id)}
//               mt={isSameUser(messages, m, i, user._id) ? 3 : 10}
//               borderRadius="20px"
//               p="5px 15px"
//               maxWidth="75%"
//               position="relative"
//               wordBreak="break-word"
//             >
//               {m.type === "file" && isImage(m.file) ? (
//                 <Image 
//                 src={`${m.file}`}  // Using the backend URL here
//                 alt="Sent Image" 
//                 maxW="300px"
//                 maxH="300px"  // Restrict the maximum height for better visual balance
//                 objectFit="cover"  // Ensures the image covers the container without distortion
//                 borderRadius="md"
//                 onClick={() => handleImageClick(m.file)}
//                 cursor="pointer"  //to show the user it is clickable
               
//                 onError={(e) => {
//                   console.error("Image failed to load", e);
//                   toast({
//                     title: "Image failed to load",
//                     description: "Please check the file and try again.",
//                     status: "error",
//                     duration: 5000,
//                     isClosable: true,
//                   });
//                 }}
//               />
//               ) : m.type === "file" && isPDF(m.file) ? (
//                 <a
//                 href={m.file}  // Directly use the stored path, use href for anchor tag
//                 target="_blank" 
//                   rel="noopener noreferrer"
//                   onError={(e) => {
//                     console.error("PDF failed to load", e);
//                     toast({
//                       title: "PDF failed to load",
//                       description: "Please check the file and try again.",
//                       status: "error",
//                       duration: 5000,
//                       isClosable: true,
//                     });
//                   }}
//                 >
//                   {m.file ? `View PDF: ${m.file.split('/').pop()}` : "View PDF"}
//                 </a>
//               ) : m.type === "file" && isVideo(m.file) ? (
//                 <Box mt={2}>
//                   <video 
//                     controls 
//                     src={m.file}  // Directly use the stored path
//                     style={{ maxHeight: "200px", maxWidth: "100%", borderRadius: "md" }}
//                     onError={(e) => {
//                       console.error("Video failed to load", e);
//                       toast({
//                         title: "Video failed to load",
//                         description: "Please check the file and try again.",
//                         status: "error",
//                         duration: 5000,
//                         isClosable: true,
//                       });
//                     }}
//                   />
//                 </Box>
//               ) : m.type === "file" && m.file ? (
//                 <a 
//                 href={m.file}  // Directly use the stored path
//                 target="_blank" 
//                   rel="noopener noreferrer"
//                   onError={(e) => {
//                     console.error("File failed to load", e);
//                     toast({
//                       title: "File failed to load",
//                       description: "Please check the file and try again.",
//                       status: "error",
//                       duration: 5000,
//                       isClosable: true,
//                     });
//                   }}
//                 >
//                   {m.file.split('/').pop()}
//                 </a>
//               ) : (
//                 <Text>{m.content}</Text>
//               )}

//               <Text
//                 fontSize="0.75rem"
//                 color="#888888"
//                 mt={1}
//                 textAlign="left"
//                 whiteSpace="nowrap"
//                 fontStyle="italic"
//               >
//                 {moment(m.timestamp).format('MMM D, h:mm a')}
//               </Text>
//             </Box>
//           </Box>
//         </Box>
//       ))}
//       {/* Modal for expand the image + adding functionality to zoom as well */}
//       <Modal isOpen={isOpen} onClose={handleClose} >
//         <ModalOverlay />
//         <ModalContent maxW="90vw" maxH="90vh" bg="blackAlpha.800">
//           <ModalBody p={0} display="flex" justifyContent="center" alignItems="center"  onWheel={handleZoom}>
//             <Image 
//               src={selectedImage} 
//               alt="Expanded view"
//               maxH="90vh" 
//               maxW="90vw" 
//               objectFit="contain"
//               borderRadius="md"
//               boxShadow="lg"
//               transform={`scale(${scale})`} // Apply zoom scaling
//               transition="transform 0.2s ease" // Smooth zoom transition
//               overflow="hidden"  // Hide any overflow to avoid scrolling issues

//             />
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </ScrollableFeed>
//   );
// };

// export default ScrollableChat;




// -------------without using scrollable feed-------------
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import { Box, Text, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Image,
} from "@chakra-ui/react";

const isImage = (filePath) =>
  typeof filePath === "string" &&
  /\.(jpeg|jpg|gif|png|bmp|svg)$/i.test(filePath.toLowerCase());
const isPDF = (filePath) =>
  typeof filePath === "string" && /\.pdf$/i.test(filePath.toLowerCase());
const isVideo = (filePath) =>
  typeof filePath === "string" &&
  /\.(mp4|webm|ogg|mov)$/i.test(filePath.toLowerCase());

const ScrollableChat = ({ messages, newMessageTrigger }) => {
  const { user } = ChatState();
  const toast = useToast();
  const bottomRef = useRef(null); // Reference to scroll to the bottom
  const containerRef = useRef(null); // Reference for the scrollable container

  // to handle the expand image on click
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [scale, setScale] = useState(1); // State to keep track of zoom level

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedImage(null);
    setScale(1); // Reset zoom level when modal is closed
  };

  const handleZoom = (e) => {
    e.preventDefault(); // Prevent the default scroll behavior
    const zoomStep = 0.05; // Smaller step for slower zooming
    let newScale = scale + e.deltaY * -zoomStep;

    // Clamping the zoom scale between 1x and 3x
    if (newScale < 1) {
      newScale = 1;
    } else if (newScale > 3) {
      newScale = 3;
    }

    // Apply the new scale
    setScale(newScale);
  };

  // Function to scroll to the bottom without animation
  const scrollToBottomInstant = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "auto" }); // No animation
    }
  };

  // Function to scroll to the bottom with smooth animation (for new messages)
  const scrollToBottomSmooth = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" }); // Smooth scroll for new messages
    }
  };

  // Effect to scroll down instantly when entering the chat
  useEffect(() => {
    scrollToBottomInstant(); // Instantly scroll to the bottom on chat load
  }, [messages]);

  // Effect to scroll down smoothly when a new message is sent
  useEffect(() => {
    if (newMessageTrigger) {
      setTimeout(() => {
        scrollToBottomSmooth(); // Smoothly scroll to the bottom when a new message is sent
      }, 100); // Slight delay to ensure the message is added
    }
  }, [newMessageTrigger, messages]); // Include messages to ensure smooth scrolling when messages change

  return (
    <Box
      ref={containerRef}
      height="100%" // Set the container height according to your design
      overflowY="auto"
      p="10px"
    >
      {messages &&
        messages.map((m, i) => (
          <Box key={m._id} display="flex" flexDirection="column" mb="10px">
            <Box display="flex" alignItems="center">
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                  />
                </Tooltip>
              )}
              <Box
                bg={m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}
                ml={isSameSenderMargin(messages, m, i, user._id)}
                mt={isSameUser(messages, m, i, user._id) ? 3 : 10}
                borderRadius="20px"
                p="5px 15px"
                maxWidth="75%"
                position="relative"
                wordBreak="break-word"
              >
                {m.type === "file" && isImage(m.file) ? (
                  <Image
                    src={`${m.file}`}
                    alt="Sent Image"
                    maxW="300px"
                    maxH="300px"
                    objectFit="cover"
                    borderRadius="md"
                    onClick={() => handleImageClick(m.file)}
                    cursor="pointer"
                    onError={(e) => {
                      console.error("Image failed to load", e);
                      toast({
                        title: "Image failed to load",
                        description: "Please check the file and try again.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                      });
                    }}
                  />
                ) : m.type === "file" && isPDF(m.file) ? (
                  <a
                    href={m.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    onError={(e) => {
                      console.error("PDF failed to load", e);
                      toast({
                        title: "PDF failed to load",
                        description: "Please check the file and try again.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                      });
                    }}
                  >
                    {m.file ? `View PDF: ${m.file.split("/").pop()}` : "View PDF"}
                  </a>
                ) : m.type === "file" && isVideo(m.file) ? (
                  <Box mt={2}>
                    <video
                      controls
                      src={m.file}
                      style={{
                        maxHeight: "200px",
                        maxWidth: "100%",
                        borderRadius: "md",
                      }}
                      onError={(e) => {
                        console.error("Video failed to load", e);
                        toast({
                          title: "Video failed to load",
                          description: "Please check the file and try again.",
                          status: "error",
                          duration: 5000,
                          isClosable: true,
                        });
                      }}
                    />
                  </Box>
                ) : m.type === "file" && m.file ? (
                  <a
                    href={m.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    onError={(e) => {
                      console.error("File failed to load", e);
                      toast({
                        title: "File failed to load",
                        description: "Please check the file and try again.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                      });
                    }}
                  >
                    {m.file.split("/").pop()}
                  </a>
                ) : (
                  <Text>{m.content}</Text>
                )}

                <Text
                  fontSize="0.75rem"
                  color="#888888"
                  mt={1}
                  textAlign="left"
                  whiteSpace="nowrap"
                  fontStyle="italic"
                >
                  {moment(m.timestamp).format("MMM D, h:mm a")}
                </Text>
              </Box>
            </Box>
          </Box>
        ))}
      {/* Dummy div to allow smooth scroll to the bottom */}
      <div ref={bottomRef} />
      {/* Modal for expanding the image + zoom functionality */}
      <Modal isOpen={isOpen} onClose={handleClose} size="full">
  <ModalOverlay />
  <ModalContent display="flex" justifyContent="center" alignItems="center" bg="transparent" boxShadow="none">
    <ModalBody
      display="flex"
      justifyContent="center"
      alignItems="center"
      onWheel={handleZoom}
      overflow="hidden"
      p={0}
    >
      <Image
        src={selectedImage}
        alt="Expanded view"
        maxW="90vw"
        maxH="90vh"
        objectFit="contain"
        transform={`scale(${scale})`}
        cursor="zoom-out"
      />
    </ModalBody>
  </ModalContent>
</Modal>
    </Box>
  );
};

export default ScrollableChat;
