import "./App.css";
import {TextField, Button, Container, Typography} from "@mui/material";
import { useState, useEffect } from "react";
import { db } from "./Firebase";
import firebase from "firebase";
import TodoListItem from "./Todo";

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    db.collection("todos").onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress,
        }))
      );
    });
  };

  const addTodo = (e) => {
    e.preventDefault();
    db.collection("todos").add({
      inprogress: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoInput,
    });

    setTodoInput("");
  };

  return (
    <div className="App">
    <Container disableGutters maxWidth="10">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" sx={{fontWeight:"bold",fontSize:"2.5rem",mt:4}} color="primary">Nirmal's Todo App</Typography>
        <form action="" autoComplete="off">
          <TextField
            id="standard-basic"
            label="Enter your task..."
            value={todoInput}
            variant="standard"
            sx={{maxWidth: "300px", width: "90vw",color:"white"}}
            onChange={(e) => setTodoInput(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
            onClick={addTodo}
            sx={{ display: "none" }}
          >
            Click Me
          </Button>
        </form>
        {todos.map((todo) => (
          <TodoListItem
            todo={todo.todo}
            inprogress={todo.inprogress}
            id={todo.id}
            key={todo.id}
          />
        ))}
      </div>
      </Container>
    </div>
  );
}

export default App;
