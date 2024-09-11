import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (  //this component is the framework/container on which all three sideDrawer(search part+header part) , MYchats component(left box having all the persons whom i have talked to) and chatBox componet(on right , where i talk),are based) 
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}  {/* (search part+header part)*/}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px" bg="linear-gradient(to right, #4A90E2, #9013FE)">
        {user && <MyChats fetchAgain={fetchAgain} />}  {/*left box having all the persons whom i have talked to */}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />   //  chatBox componet(on right , where i talk),are based)
        )}
      </Box>
    </div>
  );
};

export default Chatpage;







