import { Box } from "@chakra-ui/layout";
import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();  //This line uses the ChatState hook to extract the selectedChat variable from the chat context. selectedChat would represent the currently active or selected chat.

  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}  //d is shorthand for the display property.  For base (mobile) screen sizes, this conditionally sets the display:If selectedChat exists, d is set to "flex" (which makes the chatbox visible).If selectedChat does not exist, d is set to "none" (which hides the chatbox).For medium (md) and larger screen sizes, d is always set to "flex", ensuring the chatbox is visible.
      alignItems="center"  //horizontally centers
      flexDir="column"  //This sets the flex direction to column, stacking the child elements vertically inside the Box.
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}  //This sets the width of the Box:On base (small/mobile) screens, the width is 100%.On medium (md) and larger screens, the width is 68%.
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />  {/*This component is responsible for rendering the actual chat interface, such as messages, inputs, etc.  It receives fetchAgain and setFetchAgain as props, allowing it to interact with the state that might trigger re-fetching of data (e.g., messages). */}
    </Box>
  );
};

export default Chatbox;
