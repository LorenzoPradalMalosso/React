// Tela principal da aplicação, onde vou importar os dois componentes (TodoForm e TodoList)

import { useState } from "react"
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const App = () => {
  // Vetor de tarefas
  const [tasks, setTasks] = useState([]);

  // Função para adicionar tarefas
  const addTask = (task) => {
    setTasks((currentTasks) => [...currentTasks, task]);
  }

  // Função para remover tarefas
  const removeTask = (index) => {
    setTasks((currentTasks) => currentTasks.filter((_, i) => i !== index));
  }

  return (
    <div>
      <h1>Lista de Tarefas Todo-Pro</h1>
      <TodoForm addTask={addTask}/>
      <TodoList tasks={tasks} removeTask={removeTask}/>
    </div>
  );
}

export default App;