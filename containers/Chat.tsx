"use client";
import ChatBox from "@/components/ChatBox";
import MyChats from "@/components/MyChats";
import SideDrawer from "@/components/miscellaneous/SideDrawer";
import { ChatState } from "@/context/ChatProvider";
import { Box } from "@chakra-ui/react";
import React, { useState } from "react";

const Chat = () => {
  const { user } = ChatState();
  // Using fetchAgain to make useEffect execute again & fetch all the chats once again
  // We will change this fetchAgain boolean state whenever any updates happens Eg: Updating Group Name should change the name of groups in myChats Components also
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        w={"100%"}
        height={"91.5vh"}
        p={"10px"}
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chat;
