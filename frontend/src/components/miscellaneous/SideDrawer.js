import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useHistory } from "react-router-dom";  //use navigate instead of UseHistory(detoriated)
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModal";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../config/ChatLogics";
import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";
import {  useCallback, useRef, useEffect} from 'react';
import debounce from 'lodash/debounce';


function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);  //an array , so, can have alot of search results, map over them and show then in the frontend
  const [loading, setLoading] = useState(false);  //set loading to true whenever you are trying to fetch the data and make it false when you get the data from the db(when loading is true show a spinner )
  const [loadingChat, setLoadingChat] = useState(false);
  const isInitialMount = useRef(true);  // Track if it's the first render


  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();  //got these states from the context api(+also got the way to update them)

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();  //can use navigate instead of UseHistory(detoriated)

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");  //redirect him to the homepage(see the router, in frontend , /means login/signup page (homepage component))
  };

  // const handleSearch = async () => {
  //   if (!search) {
  //     toast({
  //       title: "Please Enter something in search",
  //       status: "warning",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "top-left",
  //     });
  //     return;
  //   }

  //   try {
  //     setLoading(true);  //spinner will appear

  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,   //since, user is an object , so  dot operator used to access particular field of it.
  //       },
  //     };

  //     const { data } = await axios.get(`/api/user?search=${search}`, config);

  //     setLoading(false);  //after getting the data ready with me , i made loading set false, so , spinner will dissappear
  //     setSearchResult(data);  //whatever data i got,i stored it in the variable data on which i can latter map and show it as a list in the display
  //   } catch (error) {
  //     toast({
  //       title: "Error Occured!",
  //       description: "Failed to Load the Search Results",
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom-left",
  //     });
  //   }
  // };

  const handleSearch = async () => {

    // Skip showing toast on initial mount(since, was getting toast on the first mount, since search was empty)(isInitialMount is the state created by us)
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
     // If search is empty, don't trigger the search and clear the results(becoz, was getting toast when input cleared)
  if (search.trim() === "") {
    setSearchResult([]);
    return;
  }
    if (!search) {
        toast({
          title: "Please enter something in search",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top-left",
        });
      setSearchResult([]);
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data.slice(0, 10)); // Limit to 10 results
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  
  const debouncedHandleSearch = useCallback(debounce(handleSearch, 300), [search]);

  useEffect(() => {
    debouncedHandleSearch();
    return () => {
      debouncedHandleSearch.cancel();
    };
  }, [search, debouncedHandleSearch]);


  const accessChat = async (userId) => {  //have the same function name in the backend part , but, no issue with the clash in the function name ,since,  in full Stack , both the frontend and backend runs on different environment,frontend runs on the browser and backend runs on the server , purpose: suppose I searched a person in the (side drawer) , then backend will give me an array of the people having the same name, I will show all those persons (using userListItem  component) in a better ui , along with the userListItem component , well, in the array given by backend to us(we will use iterate through that array(using map) and each of the iterator will be shown  in a better ui with the help of userLIstItem , in the userListItem , I will also pass the accesschat function (along with the iterator's id), so that whenever the logged in user click's on the iterator/or any one of the person backend gave him as per his search , then by just clicking it, we can open a space where the logged in user can talk to the user he clicked on), so accesschat function is just about opening the space for the logged in user to talk to the person he searched for in the side drawer
    console.log(userId);  //userId is the person whom the logged in user clicked on when the backend responded him with the list the similar person's name 

    try {
      setLoadingChat(true);  // Indicate that a chat is being accessed or created

      const config = {
          headers: {
              "Content-type": "application/json",  // Specify the content type of the request
              Authorization: `Bearer ${user.token}`,  // Include the user's authentication token in the headers
          },
      };

      const { data } = await axios.post(`/api/chat`, { userId }, config);  // Make a POST request to the backend to access or create a chat,    and {userId} extra is just like passing something in body(backend me to access userId, do  , req.body) , fetching data from the accessChats controller/fucntion of the backend , accessChats of backend is just seeing if chat with this user exists or not(if yes, then it returns the document(after doing some modifications/ population in the document), else it creates the chat with this user in the database and then returns the newly created document in the frontend )

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);  // If the chat isn't already in the current chat list, add it . ( chat is a state(array) which stores all the list of persons whom i have talked to(on left side)), if i click on 
      setSelectedChat(data);  // Set the accessed chat as the selected chat
      setLoadingChat(false);  // Indicate that the chat loading is complete
      onClose();  // Close any modal or drawer that was used to access this function , left side me modal jo khula hai will be closed if i clicked / selected the person whom i want to talk to 

  } catch (error) {
      toast({
          title: "Error fetching the chat",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
      });  // Display an error message if the chat could not be accessed or created
  }
};





  return (
    <>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="linear-gradient(to right, #4A90E2, #9013FE)"  //linear gradient of blue and purple
        w="100%"
        p="-1px 10px 5px 10px"  //gave it a negative padding at the top becoz, scrolling ho raha tha at positive padding at top
        borderWidth="5px"
      >
         {/*Never give comment aside to Tooltip , it can cause error, becoz , tooltip can have only one child(or tooltip can just wrap only one component inside it, confirmed)(here it is just button , and again button is wrapping two component(an icon and a text, but, it has nothing to do with tooltip, tooltip is just wraping only one child ie. button)) , tooltip label appears when we hover on the thing which it is wrapping/ or when we hover on it's child.(here, it is button) */}
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button 
          variant="ghost" 
          onClick={() => {
            onOpen();
            // This will ensure the button loses focus and the tooltip hides after opening the drawer
            document.activeElement.blur();
          }}
          _hover={{ bg: "green.500", color: "white" }}   //on hover on the button , we will have bg color of the button as green and text color will be white
          _focus={{ boxShadow: "none" }}  // Remove the blue outline on focus
           > 
              <i className="fas fa-search"></i>
              <Text d={{ base: "none", md: "flex" }} px={4} color="#FFFFFF">
                  Search User
              </Text>
          </Button>
        </Tooltip>


        <Text fontSize="3xl" fontFamily="Work sans" fontStyle="italic" fontWeight="semibold" color="white">
        Convo Hub
        </Text>


        <div>  {/*third part of the header, will be positioned on the extreme right and has */}
          <Menu>  {/*just look at the chakra ui menu from website */}

            <MenuButton p={1}>  {/*So,menubutton is wrapping the BellIcon, so bellicon ko click karne se kuchh menu open hoga */}
              <NotificationBadge  //part of react , and in this button we are using this as a prop , not a component made by us
                count={notification.length}  //will automatically count number of new messages and will show
                effect={Effect.SCALE}  //will awesome style , messages will be shown (size bara ho jaayega of the bell icon etc.)
              />
              <BellIcon fontSize="2xl" m={1} />  {/*bell icon component, order of this and NotificationBadge doesn't matter, both will work even we reverse the order */}
            </MenuButton>

            <MenuList pl={2}  maxHeight="200px" overflowY="auto"> {/*Set a max height and allow elements to overflow in it */} {/* items which we want to show inside the bell icon button when clicked , MenuList is written just after  MenuButton and inside MenuButton , we write MenuItem to show things all the things in  list */}
              {!notification.length && "No New Messages"}  {/*notification state is provided under NotificationBadge under react , so , whenever no notification, then  No New Messages is shown when we click the button, else ... and whenever, notification.length is of size 0 (then show "No new messages" as a part of list*/}
              {notification.map((notif) => (  // else we , show list of messages using MenuItem(discussed above) , we are using map (so, that , we have the functionality to do something when we click on a particular list item element)
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    // setNotification(notification.filter((n) => n !== notif));  //creating the new array excluding the element (or the message we clicked on)
                    setNotification((prevNotifications) =>  // remove the messages notification linked with this chat from the notification array  
                      prevNotifications.filter((n) => n.chat._id !== notif.chat._id)  
                    );
                  }}
                >
                  {notif.chat.isGroupChat  
                    ? `New Message in ${notif.chat.chatName}`  
                    : `New Message from ${getSender(user, notif.chat.users)}`}  {/*if it is a group chat , then show New message in group name else new message in (the sender's name) */}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>


          {/*second part ,so second menu */}
          <Menu>
            <MenuButton as={Button}  bg="#9013FE" rightIcon={<ChevronDownIcon />}>  {/*as={Button} prop dene se actually wo button jaisa dikhne lagta hai, previously, bellIcon me bhi MenuButton use hua tha , but that was not looking like a button since as={Button} prop was not passed, but, since, ussko click karne se bhi kuchh ho raha hai, so kind of button */}
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>   {/*so, user is passed as a prop or an argument of a function */}
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />  {/*just to give spacing */}
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>  {/*a function is called when Logout item is clicked  */}
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen} >  {/*onClose() and isOpen() is a function, kahi par bhi onClose() likhne se modal/sidedrawer (jo bhi khula hua hai abhi ) will be closed and opens when isOpen() is mentioned*/}
        <DrawerOverlay />  {/*it is optional, but, when side drawer opens , background ke cheezon ko dimmed kar dega DrawerOverlay  */}
        <DrawerContent bg="linear-gradient(to right, #4A90E2, #9013FE)">   {/*content of drawer , so , background can be changed with it. */}
          <DrawerHeader borderBottomWidth="1px" borderColor="black">Search Users</DrawerHeader>  {/*header of drawer , comes with the parameter borderbottom (for a line or a seperator)*/ }
          <DrawerBody>
            <Box display="flex" pb={2}>  {/* change here anything for changing input box(this is a container of input)*/}
            <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                borderColor="black"
                focusBorderColor="black"
                _hover={{ borderColor: "black" }}
                _focus={{ boxShadow: "none" }}
              />
              <Button onClick={handleSearch} isLoading={loading}  >
                Go
              </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}  {/*if the loadingChat state is true , then call the spinner component and make it centered */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;



