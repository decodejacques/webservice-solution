let express = require('express')
let app = express()
let bodyParser = require('body-parser')
app.use(bodyParser.raw({ type: "*/*" }))

let passwords = new Map()

let chatMessages = []


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

app.post("/login", (req, res) => {
    let parsed = JSON.parse(req.body)
    let username = parsed.username
    let actualPassword = parsed.password
    let expectedPassword = passwords.get(username)
    if (expectedPassword === undefined) {
        res.send(JSON.stringify({ success: false, reason: "user does not exist" }))
        return
    }
    if (expectedPassword !== actualPassword) {
        res.send(JSON.stringify({ success: false, reason: "invalid password" }))
        return
    }
    res.send(JSON.stringify({ success: true }))
})

app.post("/signup", (req, res) => {
    let parsed = JSON.parse(req.body)
    let username = parsed.username
    let password = parsed.password
    console.log("password", password)

    if (passwords.has(username)) {
        res.send(JSON.stringify({ success: false, reason: "username already exists" }))
        return
    }
    if (password.length < 3) {
        res.send(JSON.stringify({ success: false, reason: "password too short" }))
        return
    }
    passwords.set(username, password)
    res.send(JSON.stringify({ success: true }))

})



app.post("/add-message", (req, res) => {
    let msg = JSON.parse(req.body)
    chatMessages.push(msg)
    res.send("done")
})

app.get("/msgs", (req, res) => {
    res.send(JSON.stringify(chatMessages))

})


app.listen(4000, () => {
    console.log("server started")
})