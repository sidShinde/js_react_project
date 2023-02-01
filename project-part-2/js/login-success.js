const loginSuccess = () => {
    loggedUser = JSON.parse(localStorage.getItem("loggedIn"));

    let text = document.getElementById("login-msg");
    text.innerHTML = `<b>Welcome !</b> ${loggedUser.email}`;
}

loginSuccess();