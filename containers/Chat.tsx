"use client";
import ChatBox from "@/components/chat/ChatBox";
import MyChats from "@/components/chat/MyChats";
import SideDrawer from "@/components/miscellaneous/SideDrawer";
import { ChatState } from "@/context/ChatProvider";
import { Box } from "@chakra-ui/react";
import React from "react";

const Chat = () => {
  const { user } = ChatState();
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
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default Chat;
