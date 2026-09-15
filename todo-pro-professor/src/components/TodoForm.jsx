// Componente que vai gerenciar somente o formulário de envio
// Formulário para adicionar tarefas

import { useState } from "react"

const TodoForm = ({addTask}) => {
    // Estado local para armazenamento temporário do texto digitado no campo de input
    const [task, setTask] = useState(""); // useState -> Armazenamento temporário
    // No react usamos o const para evitar mudanças acidentais, sempre reatribuindo o valor ao usá-lo

    // Cria um mainpulador de evento ao enviar o formulário -> handle
    const handleSubmit = (e) => {
        e.preventDefault(); // Não recarrega a página ao enviar o formulário
        
        // Validação do campo de entrada para verificar se o texto não é vazio
        if (task.trim() !== "") {
            addTask(task.trim()); // Adiciona a tarefa na função do prop() -> poder enviar dados para um componente "pai"
            setTask(""); // Reseta o campo de entrada para o valor inicial
        }
    }
    // Virtual DOM
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="" id="" value={task} onChange={(e) => setTask(e.target.value)}/>
            <button type="submit">Adicionar</button>
        </form>
    );
}

export default TodoForm;