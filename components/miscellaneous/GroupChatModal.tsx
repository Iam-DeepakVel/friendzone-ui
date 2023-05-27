import { ChatState } from "@/context/ChatProvider";
import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { ReactNode, useState } from "react";
import { UserListItem } from "./SideDrawer";
import { User } from "@/containers/Home";
import UserBadgeItem from "./UserBadgeItem";

const GroupChatModal: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [searchResult, setSearchResult] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const { user, chats, setChats } = ChatState();

  const handleSearch = async (query: string) => {
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_FRIEND_ZONE_API}/user?search=${query}`,
        config
      );
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the fields!",
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
          Authorization: `Bearer ${user.access_token}`,
        },
      };
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_FRIEND_ZONE_API}/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );

      //Adding data before spreading our chats to add data to top of our chats
      setChats([data, ...chats]);
      onClose();
      toast({
        title: "New Group Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      // Reset States
      setSelectedUsers([]);
      setSearchResult([]);
    } catch (error: any) {
      toast({
        title: "Failed to Create Group!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  // Handles adding user to selectedUsers array state to create group chat
  const handleGroup = (userToAdd: User) => {
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
    // Add user to selectedUsers array
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  // Remove user from selected User array
  const handleDelete = (userToRemove: User) => {
    setSelectedUsers(selectedUsers.filter((u) => u._id !== userToRemove._id));
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="30px"
            fontFamily="Poppins"
            display="flex"
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Search User"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box w="100%" display={"flex"} flexWrap={"wrap"}>
              {selectedUsers?.map((user) => (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleDelete(user)}
                />
              ))}
            </Box>
            {loading ? (
              <Spinner mt={5} mx="auto" display="flex" />
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user: any) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
