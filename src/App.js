import "./App.css";
import {TextField, Button} from "@mui/material";
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{fontSize:38,margin:5,color:"#2c3e50"}}>Nirmal's Todo App</h1>
        <form action="" autocomplete="off">
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
          />
        ))}
      </div>
    </div>
  );
}

export default App;
