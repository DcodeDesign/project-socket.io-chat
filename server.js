let express = require("express")
let app = express()
const bodyParser = require('body-parser');
let cors = require("cors")
const PORT = process.env.PORT || 3000
let serverHttp = app.listen(PORT, console.log(`Les serveur Express écoute sur le port ${PORT}`))
let io = require("socket.io")(serverHttp)

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies for form http post

app.use(cors({
    origin : "http://localhost:*"
}))

io.on('connection', (socket) => {
    socket.join('some room');
    let nameClient

    socket.on("new user", (nameUser) => {
        nameClient = nameUser;
        io.emit("new user", nameUser)
        console.log(io)
    })

    socket.on("new message", (message) => {
        let newMessage = {
            nameClient: nameClient,
            message: message
        }
        io.emit("new message", newMessage)
    })

    socket.on("disconnect", () => {
        console.log("Client disconnect" + nameClient)
    })
})

// TODO : à ne pas faire
app.use(express.static('public'));
app.get("/", (req,res) => {
    res.sendFile(__dirname + "/public/index.html")
})
