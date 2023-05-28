import { User } from "@/containers/Home";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ChatContext = createContext<any>({});

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails")!);
    setUser(userDetails);

    if (!userDetails) {
      router.push("/");
    }
  }, [router]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};
