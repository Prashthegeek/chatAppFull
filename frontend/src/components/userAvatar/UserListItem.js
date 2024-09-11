import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";


const UserListItem = ({ user, handleFunction }) => {   //this user is the name of the prop and it has information about the iterator user of map , handlefunction is the name of the paramter, in sideDrawer component   -> handleFunction={() => accessChat(user._id) is used , so handleFunction is accessChat function(and it has it's own prop(argument) of user.id) , so , using the accessChat function, we can open up the chat space to talk to the clicked user
  return (  //this function handles each search results we get after searching someone from the drawer. all the returned search results will be shown in the form of lists with the ui declared here
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
