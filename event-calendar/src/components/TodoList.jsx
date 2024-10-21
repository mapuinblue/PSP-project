/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import "./TodoList.scss";
import { useAuth } from "../context/datecontext";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  where,
  query,
  setDoc,
} from "firebase/firestore";
import { PenFill, XCircleFill, PlusCircle } from "react-bootstrap-icons";
import { db } from "../firebase/config";

const TodoList = () => {
  const [user, setUser] = useState("");
  const [newTodo, setNewTodo] = useState("");
  const [newTodoTime, setNewTodoTime] = useState("");
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);

  const { date, users, todos, setTodos } = useAuth();

  useEffect(() => {
    if (users) {
      setUser(users.uid);
    }
  }, [users]);

  useEffect(() => {
    const q = query(
      collection(db, "todos"),
      where("user", "==", user),
      where("date", "==", date)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      const todo = [];
      querySnapshot.forEach((doc) => {
        todo.push({ id: doc.id, ...doc.data() });
      });
      setTodos(todo);
    });
    return () => unsub();
  }, [user, date]);

  function handleInputChange(event) {
    setNewTodo(event.target.value);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const selectedTime = new Date(`1970-01-01T${newTodoTime}`);

    if (
      edit &&
      id !== "" &&
      newTodo.trim() !== "" &&
      newTodoTime.trim() !== ""
    ) {
      setDoc(doc(db, "todos", id), {
        text: newTodo,
        hour: selectedTime.getTime(),
        completed: false,
        date: date,
        user: user,
      });

      setNewTodo("");
      setNewTodoTime("");
      setEdit(false);
    } else {
      if (newTodo.trim() !== "" && newTodoTime.trim() !== "") {
        setTodos([
          ...todos,
          {
            text: newTodo,
            hour: selectedTime.getTime(),
            completed: false,
            date: date,
            user: user,
          },
        ]);
        addDoc(collection(db, "todos"), {
          text: newTodo,
          hour: selectedTime.getTime(),
          completed: false,
          date: date,
          user: user,
        });
        setNewTodo("");
        setNewTodoTime("");
      }
    }
  };

  const handleTodoDelete = (index) => {
    const docRef = doc(db, "todos", todos[index].id);
    deleteDoc(docRef);

    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleTodoEdit = (index, id) => {
    setEdit(true);
    setNewTodo(todos[index].text);
    setNewTodoTime(new Date(todos[index].hour).toLocaleTimeString());
    setId(id);
  };

  return (
    <div className="todo-list-container">
      <h1 className="todo-list-title">Lista de Eventos - {date}</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          className="todo-input"
          placeholder="Ingresa un nuevo evento"
        />
        <input
          type="time"
          value={newTodoTime}
          onChange={(event) => setNewTodoTime(event.target.value)}
        />
        {edit ? (
          <button type="submit" className="add-edit-button">
            Edit
          </button>
        ) : (
          <button type="submit" className="add-button">
            <PlusCircle className="icon" />
            Add
          </button>
        )}
      </form>
      <div className="scroll-todo-container">
        <ul className="todo-items">
          {todos.map((todo, index) => (
            <li
              key={index}
              className={`todo-item ${todo.completed ? "completed" : ""}`}
            >
              <span className="todo-text">{todo.text}</span>

              <button
                onClick={() => handleTodoDelete(index)}
                className="delete-button"
              >
                <XCircleFill className="icon" />
                Delete
              </button>

              <button
                onClick={() => handleTodoEdit(index, todo.id)}
                className="edit-button"
              >
                <PenFill className="icon" />
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
