let express = require('express')
let app = express()

let clicked = 0

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

app.post("/do-click", (req, res) => {
    clicked++
    res.send("done")
})

app.post("/num-clicked", (req, res) => {

    res.send(JSON.stringify(clicked))
})

app.listen(4000, () => {
    console.log("server started")
})