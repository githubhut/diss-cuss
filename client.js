const socket = io ("http://localhost:8000");

const form = document.getElementById("send_container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, "right")
    socket.emit("send", message);
    messageInput.value = "";
})
const append = (msg, position)=>{
    const msgel = document.createElement("div");
    msgel.innerText = msg;
    msgel.classList.add("message")
    msgel.classList.add(position)
    messageContainer.append(msgel)
}

const nam = prompt("Enter your name");
socket.emit("new_user_joined", nam);

socket.on("user_joined", name=>{
    append(`${name} joined the chat`, "left")
})

socket.on("recieve", data=>{
    append(`${data.name}: ${data.message}`,"left")
})

socket.on("dissconected", name=>{
    append(`${name} left the chat`,"left")
})








