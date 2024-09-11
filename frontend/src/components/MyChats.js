// import { AddIcon } from "@chakra-ui/icons";
// import { Box, Stack, Text } from "@chakra-ui/layout";
// import { useToast } from "@chakra-ui/toast";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { getSenderFull } from "../config/ChatLogics";
// import ChatLoading from "./ChatLoading";
// import GroupChatModal from "./miscellaneous/GroupChatModal";
// import { Button,  Avatar, Flex  } from "@chakra-ui/react";
// import { ChatState } from "../Context/ChatProvider";

// const MyChats = ({ fetchAgain }) => {
//   const [loggedUser, setLoggedUser] = useState();

//   const { selectedChat, setSelectedChat, user, chats, setChats , notification, setNotification, } = ChatState();

//   const toast = useToast();

//   const fetchChats = async () => {
//     // console.log(user._id);
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };

//       const { data } = await axios.get("/api/chat", config);
      
//       setChats(data);
//     } catch (error) {
//       toast({
//         title: "Error Occured!",
//         description: "Failed to Load the chats",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom-left",
//       });
//     }
//   };
//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     setLoggedUser(userInfo);
//     console.log("Logged User:", userInfo); // Debugging log
//     fetchChats();
//     // eslint-disable-next-line
//   }, [fetchAgain]);  //so, whenever someone toggles fetchAgain(or changes it's value, doesn't matter true or false,myChats component(list of all the chats whom i have talked to (on left side)) will re-render)

  
//   return (  //Note : whatever is written inside the return is shown in the ui
//       <Box
//         d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
//         flexDir="column"
//         alignItems="center"
//         p={3}
//         bg="white"
//         w={{ base: "100%", md: "31%" }}
//         borderRadius="lg"
//         borderWidth="1px"
//       >
//         <Box
//           pb={3}
//           px={3}
//           fontSize={{ base: "28px", md: "30px" }}
//           fontFamily="Work sans"
//           d="flex"
//           w="100%"
//           justifyContent="space-between"
//           alignItems="center"
//         >
//           My Chats
//           <GroupChatModal>
//             <Button
//               d="flex"
//               fontSize={{ base: "17px", md: "10px", lg: "17px" }}
//               rightIcon={<AddIcon />}
//             >
//               New Group Chat
//             </Button>
//           </GroupChatModal>
//         </Box>
//         <Box
//           d="flex"
//           flexDir="column"
//           p={3}
//           bg="#F8F8F8"
//           w="100%"
//           h="100%"
//           borderRadius="lg"
//           overflowY="hidden"
//         >
//           {chats ? (
//             <Stack overflowY="scroll">
//               {chats.map((chat) => {
//                 if (!chat.users || chat.users.length === 0) return null;
//                 return (
//                   <Box
//                     key={chat._id}
//                     onClick={() => {
//                       setSelectedChat(chat);
//                       setNotification((prevNotifications) =>
//                         prevNotifications.filter((n) => n.chat._id !== chat._id)
//                       );
//                     }}
//                     cursor="pointer"
//                     bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
//                     color={selectedChat === chat ? "white" : "black"}
//                     px={3}
//                     py={2}
//                     borderRadius="lg"
//                     display="flex"
//                     alignItems="center"
//                   >
//                     <Avatar
//                       mr={3} // Space between avatar and text
//                       size="md"
//                       name={!chat.isGroupChat && chat.users ? getSenderFull(loggedUser, chat.users).name : chat.chatName}  
//                       src={!chat.isGroupChat && chat.users ? getSenderFull(loggedUser, chat.users).pic : undefined}  // Sender's image or group initials
//                     />
                   
//                     <Flex direction="column" overflow="hidden">
//                       <Text fontWeight="bold" isTruncated>
//                         {!chat.isGroupChat ? getSenderFull(loggedUser, chat.users).name : chat.chatName}
//                       </Text>
//                       {chat.latestMessage ? (
//                         <Text fontSize="xs" isTruncated>
//                           <b>
//                             {chat.latestMessage.sender?._id === loggedUser?._id
//                               ? "You"
//                               : chat.latestMessage.sender?.name}
//                           </b>
//                           {": " + chat.latestMessage.content}
//                         </Text>
//                       ) : (
//                         <Text fontSize="xs">
//                           <i>No messages yet</i>
//                         </Text>
//                       )}
//                     </Flex>
//                   </Box>
//                 );
//               })}
//             </Stack>
//           ) : (
//             <ChatLoading />
//           )}
//         </Box>
//       </Box>
//     );
//   };
  
//   export default MyChats;



import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSenderFull } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button, Avatar, Flex } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats, notification, setNotification } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    if (!user || !user.token) {
      toast({
        title: "User not authenticated",
        description: "Please log in to fetch your chats",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data || []); // Ensure `chats` is an array
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      toast({
        title: "No user info found",
        description: "Please log in again",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
    setLoggedUser(userInfo);
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats && chats.length > 0 ? (
          <Stack overflowY="scroll">  
            {chats.map((chat) => {
              if (!chat.users || chat.users.length < 2) return null; // Ensure at least 2 users in the chat

              const sender = !chat.isGroupChat && chat.users.length >= 2 ? getSenderFull(loggedUser, chat.users) : null;

              return (
                <Box
                  key={chat._id}
                  onClick={() => {
                    setSelectedChat(chat);
                    setNotification((prevNotifications) =>
                      prevNotifications.filter((n) => n.chat._id !== chat._id)
                    );
                  }}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  display="flex"
                  alignItems="center"
                >
                  <Avatar
                    mr={3}
                    size="md"
                    name={sender ? sender.name : chat.chatName}  
                    src={sender ? sender.pic : undefined} 
                  />

                  <Flex direction="column" overflow="hidden">
                    <Text fontWeight="bold" isTruncated>
                      {!chat.isGroupChat ? sender?.name : chat.chatName}
                    </Text>
                    {chat.latestMessage ? (
                      <Text fontSize="xs" isTruncated>
                        <b>
                          {chat.latestMessage.sender?._id === loggedUser?._id
                            ? "You"
                            : chat.latestMessage.sender?.name || "Unknown Sender"}
                        </b>
                        {": " + chat.latestMessage.content}
                      </Text>
                    ) : (
                      <Text fontSize="xs">
                        <i>No messages yet</i>
                      </Text>
                    )}
                  </Flex>
                </Box>
              );
            })}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
