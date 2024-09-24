import React, { useContext, useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MessageSelf from "./MessageSelf";
import MessageOthers from "./MessageOthers";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import { myContext } from "./MainContainer";

function ChatArea({props}) {
  const lightTheme = useSelector((state) => state.themeKey);
  const [messageContent, setMessageContent] = useState("");
  const messagesEndRef = useRef(null);
  const dyParams = useParams();
  const [chat_id, chat_user] = dyParams._id.split("&");  // Extract chat_id and chat_user dynamically
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [allMessages, setAllMessages] = useState([]);
  const { refresh, setRefresh } = useContext(myContext);
  const [loaded, setLoaded] = useState(false);

  // Function to send messages
  const sendMessage = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios
      .post(
        "http://localhost:5000/message/",
        {
          content: messageContent,
          chatId: chat_id,  // Send message to the current chat_id
        },
        config
      )
      .then(({ data }) => {
        console.log("Message Sent");
        setMessageContent("");  // Clear input after sending
        setRefresh(!refresh);  // Refresh the messages
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  // Fetch messages on component mount and when the chat ID or refresh changes
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios
      .get("http://localhost:5000/message/" + chat_id, config)  // Fetch messages for the current chat_id
      .then(({ data }) => {
        setAllMessages(data);
        setLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, [refresh, chat_id, userData.data.token]);

  if (!loaded) {
    // If messages aren't loaded yet, show skeletons
    return (
      <div
        style={{
          border: "20px",
          padding: "10px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Skeleton variant="rectangular" sx={{ width: "100%", borderRadius: "10px" }} height={60} />
        <Skeleton variant="rectangular" sx={{ width: "100%", borderRadius: "10px", flexGrow: "1" }} />
        <Skeleton variant="rectangular" sx={{ width: "100%", borderRadius: "10px" }} height={60} />
      </div>
    );
  } else {
    // Display chat area and messages
    return (
      <div className={"chatArea-container" + (lightTheme ? "" : " dark")}>
        <div className={"chatArea-header" + (lightTheme ? "" : " dark")}>
          <p className={"con-icon" + (lightTheme ? "" : " dark")}>
            {chat_user[0]}  {/* Display first character of chat_user */}
          </p>
          <div className={"header-text" + (lightTheme ? "" : " dark")}>
            <p className={"con-title" + (lightTheme ? "" : " dark")}>
              {chat_user}  {/* Display full chat_user name */}
            </p>
          </div>
          <IconButton className={"icon" + (lightTheme ? "" : " dark")}>
            <DeleteIcon />
          </IconButton>
        </div>

        <div className={"messages-container" + (lightTheme ? "" : " dark")}>
          {allMessages.slice(0).reverse().map((message, index) => {
            const sender = message.sender;
            const self_id = userData.data._id;
            if (sender._id === self_id) {
              return <MessageSelf props={message} key={index} />;
            } else {
              return <MessageOthers props={message} key={index} />;
            }
          })}
        </div>

        <div ref={messagesEndRef} className="BOTTOM" />

        <div className={"text-input-area" + (lightTheme ? "" : " dark")}>
          <input
            placeholder="Type a Message"
            className={"search-box" + (lightTheme ? "" : " dark")}
            value={messageContent}
            onChange={(e) => {
              setMessageContent(e.target.value);
            }}
            onKeyDown={(event) => {
              if (event.code === "Enter") {
                sendMessage();
              }
            }}
          />
          <IconButton
            className={"icon" + (lightTheme ? "" : " dark")}
            onClick={() => sendMessage()}
          >
            <SendIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default ChatArea;
