let express = require('express')
let app = express()
let bodyParser = require('body-parser')
app.use(bodyParser.raw({ type: "*/*" }))

let rooms = new Map()


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

app.get("/todos", (req, res) => {
    res.send(JSON.stringify(list))
})

app.post("/msgs", (req, res) => {
    let parsed = JSON.parse(req.body)
    let roomName = parsed.room
    if (!rooms.has(roomName)) {
        rooms.set(roomName, [])
    }
    let messages = rooms.get(roomName)
    res.send(JSON.stringify(messages))
})

app.post("/add-message", (req, res) => {
    let parsed = JSON.parse(req.body)
    let roomName = parsed.room
    if (!rooms.has(roomName)) {
        rooms.set(roomName, [])
    }

    rooms.get(roomName).push(parsed.msg)

})


app.listen(4000, () => {
    console.log("server started")
})