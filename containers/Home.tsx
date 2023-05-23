"use client";
import Login from "@/components/Auth/Login";
import Signup from "@/components/Auth/Signup";
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

interface User {
  name: string;
  email: string;
}

export interface Chat {
  isGroupChat: boolean;
  users: Array<User>;
  _id: string;
  chatName: string;
}

const Home = () => {
  return (
    <Container maxW={"xl"} centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w={"100%"}
        maxW={"xl"}
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth={"1px"}
      >
        <Text fontSize={"4xl"} fontFamily={"Poppins"} color={"black"}>
          FriendZone🚀
        </Text>
      </Box>
      <Box
        px={"10px"}
        bg={"white"}
        w={"100%"}
        borderRadius="lg"
        borderWidth={"1px"}
      >
        <Tabs variant="soft-rounded">
          <TabList my={"1em"}>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
