// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Button,
//   useDisclosure,
//   FormControl,
//   Input,
//   useToast,
//   Box,
// } from "@chakra-ui/react";
// import axios from "axios";
// import { useState } from "react";
// import { ChatState } from "../../Context/ChatProvider";
// import UserBadgeItem from "../userAvatar/UserBadgeItem";
// import UserListItem from "../userAvatar/UserListItem";

// const GroupChatModal = ({ children }) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [groupChatName, setGroupChatName] = useState();  //name of the group is set here
//   const [selectedUsers, setSelectedUsers] = useState([]);  //the people i am adding to the group
//   const [search, setSearch] = useState("");
//   const [searchResult, setSearchResult] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const toast = useToast();

//   const { user, chats, setChats } = ChatState();

//   const handleGroup = (userToAdd) => {
//     if (selectedUsers.includes(userToAdd)) {  //in the selectedUsers array, if the mentioned user is already the part of , then give the warning
//       toast({
//         title: "User already added",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "top",
//       });
//       return;
//     }

//     setSelectedUsers([...selectedUsers, userToAdd]);  //else add the user to the SelectedUser array
    
//   };

//   const handleSearch = async (query) => {
//     setSearch(query);  //set the person to search in the Search variable

//     if (!query) {
//       return;
//     }

//     try {
//       setLoading(true);
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       const { data } = await axios.get(`/api/user?search=${search}`, config);  //see line number 1 of this function
    
//       setLoading(false);
//       setSearchResult(data);
//     } catch (error) {
//       toast({
//         title: "Error Occured!",
//         description: "Failed to Load the Search Results",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom-left",
//       });
//     }
//   };

//   const handleDelete = (delUser) => {
//     setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));  //I am filtering out the element which is deleted from the array and creating the new elements excluding the deleted user , filter method creates a new array , so , whatever the new array is, i am storing that array in the selectedUser array 
//   };

//   const handleSubmit = async () => {
//     if (!groupChatName || !selectedUsers) {
//       toast({
//         title: "Please fill all the feilds",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "top",
//       });
//       return;
//     }

//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       const { data } = await axios.post(
//         `/api/chat/group`,  //object
//         {
//           name: groupChatName,  //name of the group
//           users: JSON.stringify(selectedUsers.map((u) => u._id)),  //creating a new array out the existing array(selectedUser) through map method consising of only the id's of the user (nothing else) and then that array is converted by us to the json string(bas array ke baahar '' lag jaayega) (way of communication)and then sent  to the backend , we are mapping becoz, we don't want to send unnecessary data to the backend (just the user id) , but, i think our selectUser array is already an array of user id, so, instead of mapping [users: JSON.stringify(selectedUsers), ] would work , (Said by gpt)
//         },
//         config
//       );
//       setChats([data, ...chats]);  //appnending the data to the previous chats array
//       onClose();  //close the modal
//       toast({
//         title: "New Group Chat Created!",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//     } catch (error) {
//       toast({
//         title: "Failed to Create the Chat!",
//         description: error.response.data,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//     }
//   };

//   return (  //this is not modal of each group, but, this is the modal to create the group(left side me see + icon ke bagal me likha hai, create group , ye usska modal hai, however some of it's component is also used in the updataGroupModal(which is the actual modal of each group , eye icon wala ))
//     <>
//       <span onClick={onOpen}>{children}</span>  {/*open the modal when clicked on the children(children= that component our GroupChatModal is wrapping, in MyChats component(for the left side of the app), GroupChatModal is wrapping a button which has a text written on it., so whenever someone clicks on the button (this component is activated,becoz, this component was wrapping the button, and here , we mentioned to open this modal in the span tag(which is compulsory, becoz, we just can't write onClick={onOpen} here and there)and since ,we wrote onClick={onOpen} , so , modal will get opened) ) */}

//       <Modal onClose={onClose} isOpen={isOpen} isCentered>
//         <ModalOverlay />
//         <ModalContent   //change here if you wanna change the box of the modal 
//           bg="white"
//           boxShadow="2xl"
//           borderRadius="lg"
//           p={6}>
//           <ModalHeader
//             fontSize="35px"
//             fontFamily="Work sans"
//             d="flex"
//             justifyContent="center"
//           >
//             Create Group Chat
//           </ModalHeader>
//           <ModalCloseButton />
//           <ModalBody display="flex" flexDir="column" alignItems="center">
//             <FormControl>
//               <Input
//                 placeholder="Chat Name"
//                 borderColor="gray.300"
//                 focusBorderColor="blue.500"
//                 borderRadius="lg"
//                 mb={4}
//                 onChange={(e) => setGroupChatName(e.target.value)}
//               />
//             </FormControl>
//             <FormControl>
//               <Input
//                 placeholder="Add Users eg: John, Piyush, Jane"
//                 mb={1}
//                 onChange={(e) => handleSearch(e.target.value)}
//               />
//             </FormControl>

//             <Box w="100%" display="flex" flexWrap="wrap">  {/*creating a box/div where we can display the users which are selected  */}
//               {selectedUsers.map((u) => (  //wanna give styles to the each user who are selected using UserBadgeItem ,so that they can be display with nice ui in this box/div
//                 <UserBadgeItem
//                   key={u._id}
//                   user={u}  //user={u} means , in USerBadgeItem function , we are actually  passing user the name of the parameter and we are passing {u} or the value of u as the argument in that(well, go and see that in the userBadgeFunction , the name of the parameters)
//                   handleFunction={() => handleDelete(u)}  //and the name of the parameter is handleFunction which we declared as the paramter for userBadgeItem (and in it we passed our actual funciton)
//                 />
//               ))}
//             </Box>
//             {loading ? (
//               // <ChatLoading />
//               <div>Loading...</div>
//             ) : (
//               searchResult  //an array
//                 ?.slice(0, 4) // The slice() method in JavaScript is used to create a shallow copy of a portion of an array or string, without modifying the original,,  slice(start, end):start is the index where the slicing begins (inclusive).end is the index where the slicing ends (exclusive). If end is not provided, the slice includes all elements/characters until the end of the array/string.  If start is greater than end, an empty array/string is returned., here , with slice method we assured to show only 4 results only
//                 .map((user) => (
//                   <UserListItem
//                     key={user._id}
//                     user={user}
//                     handleFunction={() => handleGroup(user)}
//                   />
//                 ))
//             )}
//           </ModalBody>
//           <ModalFooter>
//             <Button onClick={handleSubmit} colorScheme="blue">
//               Create Chat
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// export default GroupChatModal;




import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
  Text,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const { user, chats, setChats } = ChatState();

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query) => {
    setSearch(query);

    if (!query) {
      setSearchResult([]); // Clear search results when input is empty
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${query}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(
      selectedUsers.filter((sel) => sel._id !== delUser._id)
    );
  };

  const handleSubmit = async () => {
    if (!groupChatName || selectedUsers.length === 0) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(
            selectedUsers.map((u) => u._id)
          ),
        },
        config
      );
      setChats([data, ...chats]);
      onClose();
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failed to Create the Chat!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent
          bg="white"
          boxShadow="2xl"
          borderRadius="lg"
          p={{ base: 4, md: 6 }}
          maxW={{ base: "95%", md: "500px" }}
        >
          <ModalHeader
            fontSize={{ base: "24px", md: "35px" }}
            fontFamily="Work sans"
            textAlign="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            gap={4}
          >
            <FormControl>
              <Input
                placeholder="Chat Name"
                borderColor="gray.300"
                focusBorderColor="blue.500"
                borderRadius="lg"
                mb={4}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users eg: John, Piyush, Jane"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            <Box
              w="100%"
              display="flex"
              flexWrap="wrap"
              gap={2}
              mb={2}
            >
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.slice(0, 4).map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleGroup(user)}
                />
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleSubmit}
              colorScheme="blue"
              w="full"
            >
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
