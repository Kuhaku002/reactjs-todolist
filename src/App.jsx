import { useState, useEffect } from "react";
import TodoInput from "./assets/Components/TodoInput";
import TodoList from "./assets/Components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Load theme preference and todos from localStorage on app load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkTheme(true);
      document.body.classList.add("dark");
    }

    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos).todos;
      setTodos(parsedTodos);
    }
  }, []);

  function persistData(newList) {
    localStorage.setItem("todos", JSON.stringify({ todos: newList }));
  }

  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((_, todoIndex) => todoIndex !== index);
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleEditTodo(index) {
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);
    handleDeleteTodo(index);
  }

  // Function to toggle theme
  function toggleTheme() {
    setIsDarkTheme((prevTheme) => {
      const newTheme = !prevTheme;
      if (newTheme) {
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newTheme;
    });
  }

  return (
    <div className="app">
      <header>
        <div className={`theme-toggle ${isDarkTheme ? "dark" : ""}`} onClick={toggleTheme}>
          <div className="slider"></div>
        Night Mode</div>
      </header>

      <main>
        <TodoInput
          todoValue={todoValue}
          setTodoValue={setTodoValue}
          handleAddTodos={handleAddTodos}
        />
        <TodoList
          handleDeleteTodo={handleDeleteTodo}
          todos={todos}
          handleEditTodo={handleEditTodo}
        />
      </main>
    </div>
  );
}

export default App;