import { TodoList } from "../../components/TodoList/TodoList.tsx";
import { Current } from "../../components/Current/Current.tsx";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { TodoItem } from "../../types/TodoItem.ts";
import { TodoInput } from "../../components/TodoInput/TodoInput.tsx";

export const App = () => {
  const [currentTodo, setCurrentTodo] = useState<TodoItem | null>(null);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const loadTodosFromLocalStorage = () => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  };

  useEffect(() => {
    loadTodosFromLocalStorage();
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const saveTodosToLocalStorage = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
    };
    if (isLoaded) {
      saveTodosToLocalStorage();
    }
  }, [todos, isLoaded]);

  const addTime = (todo: TodoItem) => {
    timer.current = undefined;
    timer.current = setTimeout(() => {
      if (!todos.find((t) => t.id === todo.id)) {
        clearTimeout(timer?.current);
        timer.current = undefined;
        return;
      }
      setTodos((preTodos) => {
        return preTodos.map((t) => {
          if (t.id === todo.id) {
            return {
              ...t,
              timeStamp: t.timeStamp + 1000,
            };
          }
          return t;
        });
      });
      addTime(todo);
    }, 1000);
  };

  const handleStartPress = (event: React.MouseEvent<HTMLButtonElement>, todo: TodoItem) => {
    event?.stopPropagation();
    clearTimeout(timer.current);
    timer.current = undefined;
    if (currentTodo?.id === todo.id) {
      setCurrentTodo(null);
      return;
    }
    setCurrentTodo(todo);
    addTime(todo);
  };

  return (
    <div className={"container"}>
      <TodoList
        todos={todos}
        setTodos={setTodos}
        currentTodo={currentTodo}
        setCurrentTodo={setCurrentTodo}
        handleStartPress={handleStartPress}
        deleteTodo={(todo) => {
          if (currentTodo?.id === todo.id) {
            setCurrentTodo(null);
          }
          setTodos(todos.filter((t) => t.id !== todo.id));
        }}
      />
      <Current
        currentTodo={todos.filter((todo) => todo.id === currentTodo?.id)?.[0]}
      />
      <TodoInput
        addTodo={(todoItem) => {
          setTodos([...todos, todoItem]);
        }}
      />
    </div>
  );
};
