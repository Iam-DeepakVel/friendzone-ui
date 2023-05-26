import { User } from "@/containers/Home";
import {
  Button,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { ViewIcon } from "@chakra-ui/icons";

const ProfileModal = ({
  user,
  children,
}: {
  user: User;
  children: ReactNode;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
          aria-label={""}
        />
      )}
      <Modal size={"lg"} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h="330px">
          <ModalHeader
            fontSize={"30px"}
            fontFamily={"Poppins"}
            display={"flex"}
            justifyContent={"center"}
            textTransform={"capitalize"}
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir={"column"} alignItems={"center"}>
            <Image
              borderRadius={"full"}
              boxSize={"120px"}
              src={user.picture}
              alt={user.name}
            />
            <Text
              fontSize={{ base: "18px", md: "20px" }}
              fontFamily={"Poppins"}
              marginTop={"20px"}
            >
              {`Email: ${user.email}`}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfileModal;
