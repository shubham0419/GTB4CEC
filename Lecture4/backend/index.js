const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const TODOS = [
  {
    id: 1,
    title: "React",
    description: "Learning React from scratch",
  },{
    id: 2,
    title: "React advance",
    description: "Learning React advance from scratch",
  },
];

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/alltodos", async (req, res) => {
  try {
    res.status(200).json({ TODOS });
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
});

app.post("/create", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      res.status(401).json({ message: "title and description are required" });
    }
    TODOS.push({
      id: Math.random(),
      title,
      description,
    });
    res.status(200).json({ TODOS });
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
});

app.put("/update/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const todo = TODOS.find((td) => {
      td.id == id;
    });
    const ind = TODOS.indexOf(todo);
    TODOS[ind] = {id,title,description};
    res.status(200).json({ TODOS });
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
});

app.delete("/delete/:id",(req,res)=>{
  try {
    const { id } = req.params;
    const todo = TODOS.find((td) => {
      td.id == id;
    });
    const ind = TODOS.indexOf(todo);
    TODOS.splice(ind,1);
    res.status(200).json({ TODOS });
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
})

app.listen(PORT, () => console.log("Server running on port " + PORT));
