const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const TODOS = [
  {
    id:1,
    title:"React",
    description:"Learning React"
  }
]

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/alltodos",async(req,res)=>{
  try {
    res.status(200).json({TODOS});
  } catch (error) {
    res.status(402).json({message:error.message})
  }
})

app.post("/create",async(req,res)=>{
  try {
    const {title,description} = req.body;
    if(!title || !description){
      res.status(401).json({message:"title and description are required"})
    }
    TODOS.push({
      id:Math.random(),
      title,
      description
    });
    res.status(200).json({TODOS});
  } catch (error) {
    res.status(402).json({message:error.message})
  }
})

app.put("/update/:id")

app.listen(PORT, () => console.log("Server running on port " + PORT));