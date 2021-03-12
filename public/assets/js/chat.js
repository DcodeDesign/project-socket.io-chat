let socket = io.connect("http://localhost:3000/")

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


let username
let idSignin = $("#signin");
let idChat = $("#chat");
let idMessage = $("#message");
let idUsername = $("#username");

idSignin.show();
idChat.hide();

/** login */
$("#login").click(() => {
    username = idUsername.val();
    socket.emit("new user", username);
    idUsername.val('');
    idSignin.hide();
    idChat.show();
    return false
})

/** tchat */
// let nameUser = prompt("Entrer votre pseudo : ");
$("#send").click(() => {
    let message = idMessage.val();
    socket.emit("new message", message);
    idMessage.val('');
    return false
})

socket.on("new user", (username) => {
    $("#currentUser").text(username);
})

socket.on("new message", (message) => {
    let id= uuid();
    let bubble = $("#chatHub")
        .append(`<li id="${id}">
                    <div class="img-profile"><span>${message.nameClient.substring(0, 1).toUpperCase()}</span></div>
                    <div class="bubble">
                        <p class="user">${message.nameClient}:</p>
                        <p class="user-message" >${message.message}</p>
                    </div>
                </li>`);
    let objDiv = document.getElementById("chatMessages");
    objDiv.scrollTop = objDiv.scrollHeight;
})
