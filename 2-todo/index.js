let express = require('express')
let app = express()
let bodyParser = require('body-parser')
app.use(bodyParser.raw({ type: "*/*" }))

let list = []

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

app.get("/todos", (req, res) => {
    res.send(JSON.stringify(list))
})

app.post("/add-todo", (req, res) => {
    let item = JSON.parse(req.body)
    list.push(item)
    res.send("done")
})


app.listen(4000, () => {
    console.log("server started")
})