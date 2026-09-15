// Formulário para adicionar tarefas

import { useState } from "react"

const TodoForm = ({addTask}) => {
    const [task, setTask] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault(); // Não recarrega a página ao enviar o formulário
        if (task.trim() !== "") {
            addTask(task.trim());
            setTask("");
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="" id="" value={task} onChange={(e) => setTask(e.target.value)}/>
            <button type="submit">Adicionar</button>
        </form>
    );
}

export default TodoForm;