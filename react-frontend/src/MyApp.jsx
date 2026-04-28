// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }
  // function updateList(person) {
  //   setCharacters([...characters, person]);
  // }
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(characterId) {
    // Make DELETE request to backend
    const promise = fetch(`http://localhost:8000/users/${characterId}`, {
      method: "DELETE",
    });

    promise
      .then((res) => {
        if (res.ok) {
          // Remove from state based on _id
          const updated = characters.filter((character) => {
            return character._id !== characterId;
          });
          setCharacters(updated);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function updateList(person) {
    postUser(person)
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        }
        return null;
      })
      .then((newUser) => {
        if (newUser !== null) {
          setCharacters((prevCharacters) => [...prevCharacters, newUser]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
