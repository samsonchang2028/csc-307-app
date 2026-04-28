import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userService from "./services/user-service.js";

const app = express();
const port = 8000;

dotenv.config();
const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose.connect(MONGO_CONNECTION_STRING + "users")
  .catch((error) => console.log(error));

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Software Engineer",
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

app.use(express.json());
app.use(cors());


//get method to send users over
// app.get("/users", (req, res) => {
//   res.send(users);
// });
const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};
const findUserByJob = (job) => {
    return users["users_list"].filter((user) => user["job"] === job)
}

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job
  if (name !== undefined && job !== undefined) {
    let resultName = findUserByName(name);
    let resultJob = findUserByJob(job);
    let result = { users_list: [...resultName, ...resultJob] };
    res.send(result);
  } else if(name !== undefined){
    let result = findUserByName(name);
    res.send(result);
  } else if(job !== undefined){
    let result = findUserByJob(job);
    res.send(result);
  } else {
    res.send(users);
  }
});


const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const generateId = () => {
  // Naive random ID generator with collision check against current users.
  let id = "";
  do {
    id = Math.random().toString(36).slice(2, 8);
  } while (findUserById(id) !== undefined);
  return id;
};

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});


const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = { ...req.body, id: generateId() };
  const createdUser = addUser(userToAdd);
  res.status(201).send(createdUser);
});


app.delete("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("ID not found.");
  } else {
    users["users_list"] = users["users_list"].filter((user) => user["id"] !== id)
    res.status(204).send();
  }
});


app.listen(port, ()=> {
    console.log(`example app listening at http://localhost:${port}`)
});
