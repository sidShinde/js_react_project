import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import "../css/group-chat.css";
import { useState } from "react";

function Chat(props) {
  return (
    <p className="chat-line">
      [{props.chat.dateTime}] {props.chat.userName} : {props.chat.msg}
    </p>
  );
}

function GroupChat() {
  const [chatText, setChatText] = useState("");

  const handleChange = (event) => {
    setChatText(event.target.value);
  };

  const handleSend = () => {
    const today = new Date();
    const year = today.getFullYear().toString();
    const month = today.getMonth().toString();
    const day = today.getDate().toString();
    const hours = today.getHours().toString();
    const mins = today.getMinutes().toString();
    const secs = today.getSeconds().toString();

    let dateTime = year + "-" + month + "-" + day;
    dateTime += " " + hours + ":" + mins + ":" + secs;

    if (chatText === "") {
      alert("Please enter chat message");
      return false;
    }

    let loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

    let chatObj = {
      userID: loggedIn.id,
      dateTime: dateTime,
      userName: loggedIn.fullName,
      msg: chatText,
    };

    let chats = localStorage.getItem("chats")
      ? JSON.parse(localStorage.getItem("chats"))
      : [];

    chats.push(chatObj);
    localStorage.setItem("chats", JSON.stringify(chats));

    window.location.reload(false);
  };

  const chats = localStorage.getItem("chats")
    ? JSON.parse(localStorage.getItem("chats"))
    : [];

  const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

  return (
    <div className="chat-page">
      <div className="chat-title">
        <span className="group-chat">Group Chat</span>
        <span>
          <FontAwesomeIcon
            className="close-icon"
            icon={icon({
              name: "rectangle-xmark",
              style: "regular",
              size: "9x",
            })}
          />
        </span>
      </div>
      <div className="chat-area">
        {chats.map((chat, index) => (
          <Chat key={index} chat={chat} />
        ))}
      </div>
      <div className="send-chat">
        <span className="loggedin-name">{loggedIn.fullName}</span>
        <span className="chat-text-span">
          <input
            className="chat-input"
            name="chatText"
            onChange={handleChange}
            type="text"
          ></input>
        </span>
        <span className="send-btn-span">
          <button onClick={handleSend} className="send-btn">
            Send
          </button>
        </span>
        <span className="refresh-btn-span">
          <button
            className="refresh-btn"
            onClick={() => window.location.reload(false)}
          >
            Refresh
          </button>
        </span>
      </div>
    </div>
  );
}

export default GroupChat;
