const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "Shankar",
        content: "i love coding"
    },
    {
        id: uuidv4(),
        username: "omprakash",
        content: "transparency in relationship is important"
    },
    {
        id: uuidv4(),
        username: "Abhijit",
        content: "i like spirituality"
    },
    {
        id: uuidv4(),
        username: "Rohit",
        content: "i got selected in first internship in microsoft"
    }
];

// 📌 INDEX
app.get("/posts", (req, res) => {
    res.render("index", { posts });
});

// 📌 NEW
app.get("/posts/new", (req, res) => {
    res.render("new");
});

// 📌 CREATE
app.post("/posts", (req, res) => {
    let { username, content } = req.body;

    posts.push({
        id: uuidv4(),   // ✅ FIX: add id
        username,
        content
    });

    res.redirect("/posts");
});

// 📌 SHOW
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;

    let post = posts.find((p) => p.id === id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.render("show", { post });
});

// 📌 EDIT
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;

    let post = posts.find((p) => p.id === id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.render("edit", { post });
});

// 📌 UPDATE
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let { content } = req.body;

    let post = posts.find((p) => p.id === id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    post.content = content;

    res.redirect("/posts");
});

// 📌 DELETE (optional but important for CRUD)
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;

    posts = posts.filter((p) => p.id !== id);

    res.redirect("/posts");
});

//delete
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.filter((p) => p.id !== id);
    res.redirect("/posts");

});

// 📌 SERVER
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
