import express from "express";



const app = express();
const port = 8000;


app.use(express.json());

// get method for hello world
app.get('/', (req, res )=>{
    res.send("Hello world!");
});


//get method to send users over 
app.get("/users", (req, res) => {
  res.send(users);
});


app.listen(port, ()=> {
    console.log(`example app listening at http://localhost:${port}`)
});
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};