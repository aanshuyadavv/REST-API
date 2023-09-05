const express = require('express')
const app = express()
const port = 8080;
const path = require("path");

const { v4: uuidv4 } = require('uuid');
// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

app.set("view angine", "ejs")
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }))

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

let posts = [
    {
        id: uuidv4(),
        username: "Apna College",
        content: "I love coding"
    },
    {
        id: uuidv4(),
        username: "Anshu Yadav",
        content: "Working hard is important to achieve success"
    },
    {
        id: uuidv4(),
        username: "Himanshi Yadav",
        content: "I got selected for my job"
    }

]

app.listen(port, (rq, res) => {
    console.log("app is listening")
})

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts })
    // console.log(posts)
})

app.get("/posts/new", (req, res) => {
    res.render("new.ejs")
})

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    let store = posts.push({ id, username, content })
    // console.log(posts)
    res.redirect("/posts")
})


app.patch("/posts/:id", (req, res) => {

    let { id } = req.params;
    // console.log(id)

    let newContent = req.body.content;
    // console.log(newContent)

    let post = posts.find((p) => id === p.id)
    post.content = newContent;
    console.log(post)

    res.redirect("/posts")
})

app.get("/posts/:id", (req, res) => {
    let { id } = req.params
    // console.log()
    let post = posts.find((p) => id === p.id)
    console.log(post)
    res.render('show.ejs', { post })
})

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post })
})

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts")

})