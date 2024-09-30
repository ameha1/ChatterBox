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
import io from "socket.io-client";


const ENDPOINT = "http://localhost:5000";

var socket, chat;

function ChatArea() {
  const lightTheme = useSelector((state) => state.themeKey);
  const [messageContent, setMessageContent] = useState("");
  const messagesEndRef = useRef(null);
  const dyParams = useParams();
  const [chat_id, chat_user] = dyParams._id.split("&");  // Extract chat_id and chat_user dynamically
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [allMessages, setAllMessages] = useState([]);
  const [allMessagesCopy, setAllMessagesCopy] = useState([]);
  const { refresh, setRefresh } = useContext(myContext);
  const [loaded, setLoaded] = useState(false);
  const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);

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
      .then(({ response }) => {
        // console.log("Message Sent");
        // setMessageContent("");  // Clear input after sending
        // setRefresh(!refresh);  // Refresh the messages

        data = response;

      })
      socket.emit("newMessage", data);

      // .catch((error) => {
      //   console.error("Error sending message:", error);
      // });
  };

  useEffect(() => {

    socket= io(ENDPOINT);
    socket.emit("setup", userData);
    socket.on("connection", ()=> {
      setSocketConnectionStatus(!socketConnectionStatus)
    }, [])

  })

  useEffect(() => {
    socket.on("message received", (newMessage) => {
      if(!allMessagesCopy || allMessagesCopy._id !== newMessage._id){
        setAllMessages([...allMessages], newMessage);
      }
      else{
        setAllMessages([...allMessages], newMessage);
      }
    })
  })

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
        socket.emit("join chat", chat_id)
      });
      setAllMessagesCopy(allMessages);
      // .catch((error) => {
      //   console.error("Error fetching messages:", error);
      // });
  }, [refresh, chat_id, userData.data.token, allMessages]);

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
            placeholder=""
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
            onClick={() => {sendMessage();
              if (messageContent === '') {
                document.getElementById('messageInput').value = 'Type a Message'; // Restore placeholder
              } else {
                document.getElementById('messageInput').value = ''; // Clear placeholder
              }
            }}
          >
            <SendIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default ChatArea;
