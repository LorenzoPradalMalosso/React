import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Estudar JSX', completed: true },
    { id: 2, title: 'Praticar useState', completed: false },
    { id: 3, title: 'Organizar os exercícios', completed: false },
  ])

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function addTask() {
    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: Date.now(),
        title: `Nova tarefa ${currentTasks.length + 1}`,
        completed: false,
      },
    ])
  }

  const completedCount = tasks.filter((task) => task.completed).length
  const pendingCount = tasks.length - completedCount

  return (
    <main className="app">
      <header className="hero">
        <p className="eyebrow">Organização simples e eficiente</p>
        <h1>To-Do Pro</h1>
        <p>Organize suas tarefas em um só lugar.</p>
      </header>

      <section className="tasks" aria-labelledby="tasks-title">
        <div className="tasks__header">
          <div>
            <h2 id="tasks-title">Minhas tarefas</h2>
            <p>{pendingCount} tarefas pendentes</p>
          </div>
          <button type="button" onClick={addTask}>Nova tarefa</button>
        </div>

        <p className="summary">{completedCount} de {tasks.length} tarefas concluídas</p>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? 'task task--done' : 'task'}>
              <span>{task.title}</span>
              <button type="button" onClick={() => toggleTask(task.id)}>
                {task.completed ? 'Reabrir' : 'Concluir'}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
