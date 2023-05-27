import { User } from "@/containers/Home";
import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";
import React from "react";

interface UserBadgeItemProps {
  user: User;
  handleFunction: any;
}

const UserBadgeItem: React.FC<UserBadgeItemProps> = ({
  user,
  handleFunction,
}) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="purple"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.name}
      <CloseIcon pl={1} />
    </Badge>
  );
};

export default UserBadgeItem;
