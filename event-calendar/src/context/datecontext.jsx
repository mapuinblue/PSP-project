/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/config";

export const DateContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(DateContext);
  return context;
};

export const DateProvider = ({ children }) => {
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [users, setUsers] = useState("");
  const [todos, setTodos] = useState([]);

  const signup = (email, password) => {
    try {
      return createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const login = (email, password) => {
    try {
      return signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => signOut(auth);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUsers(user);
    });
  }, []);

  return (
    <DateContext.Provider
      value={{ date, setDate, signup, login, users, logout, setTodos, todos }}
    >
      {children}
    </DateContext.Provider>
  );
};
