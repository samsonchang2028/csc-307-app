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

app.use(express.json());
app.use(cors());

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userService.getUsers(name, job)
    .then((users) => {
      res.send({ users_list: users });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/users/:id", (req, res) => {
  userService.findUserById(req.params.id)
    .then((user) => {
      if (user === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      res.status(404).send("Resource not found.");
    });
});

app.post("/users", (req, res) => {
  userService.addUser(req.body)
    .then((createdUser) => {
      res.status(201).send(createdUser);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.delete("/users/:id", (req, res) => {
  userService.deleteUserById(req.params.id)
    .then((deleted) => {
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).send();
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`example app listening at http://localhost:${port}`);
});
