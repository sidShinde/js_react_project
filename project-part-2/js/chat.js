const displayChat = () => {
  let chats = localStorage.getItem("chats")
    ? JSON.parse(localStorage.getItem("chats"))
    : [];

  clearChat();
  let chatText = document.getElementById("chat-text");

  for (let i = 0; i < chats.length; i++) {
    let row = ``;

    row += `<p>[${chats[i].dateTime}] `;
    row += `${chats[i].userName} `;
    row += `: ${chats[i].msg}</p>\n`;

    chatText.innerHTML += row;
  }

  document.getElementById("chat-text-box").value = "";
};

const displayUserName = () => {
  let loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
  document.getElementById("chat-user").innerHTML = loggedIn.fullName;
};

const clearChat = () => {
  document.getElementById("chat-text").innerHTML = "";
};

const onLoad = () => {
  let loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

  if (loggedIn === null) {
    window.open("../html/welcome.html", "_self");
  } else {
    displayUserName();
    displayChat();
  }
};

const storeChat = () => {
  const today = new Date();
  const year = today.getFullYear().toString();
  const month = today.getMonth().toString();
  const day = today.getDate().toString();
  const hours = today.getHours().toString();
  const mins = today.getMinutes().toString();
  const secs = today.getSeconds().toString();

  let dateTime = year + "-" + month + "-" + day;
  dateTime += " " + hours + ":" + mins + ":" + secs;

  let chatText = document.getElementById("chat-text-box").value;

  if (chatText == "") {
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
};
