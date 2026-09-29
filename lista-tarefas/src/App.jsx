import { useState } from "react";
import Header from "./components/Header";
import TarefaForm from "./components/TarefaForm";
import TarefaFilters from "./components/TarefaFilters";
import TarefaList from "./components/TarefaList";
import { tarefaInicial } from "./data/tarefaMock";
import "./App.css";

function App() {
  const [tarefas, setTarefas] = useState(tarefaInicial);
  const [filter, setFilter] = useState("todas");

  const tarefasVisiveis = tarefas.filter((tarefa) => {
    if (filter === "concluida") return tarefa.concluida;
    if (filter === "pendentes") return !tarefa.concluida;
    return true;
  });

  function handleMudar(id) {
    setTarefas((prevTarefas) =>
      prevTarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa,
      ),
    );
  }

  function handleRemover(id) {
    setTarefas((prevTarefas) => prevTarefas.filter((tarefa) => tarefa.id !== id));
  }

  function handleAdicionar(titulo) {
    const novaTarefa = {
      id: Date.now().toString(),
      titulo,
      descricao: "Tarefa criada por você.",
      prioridade: "Normal",
      concluida: false,
    };

    setTarefas((prevTarefas) => [novaTarefa, ...prevTarefas]);
  }

  return (
    <main className="app-container">
      <Header />
      <TarefaForm aoAddTarefa={handleAdicionar} />
      <TarefaFilters currentFilter={filter} aoFiltrar={setFilter} />
      <p className="tarefa-contador">Tarefas cadastradas: {tarefas.length}</p>
      <TarefaList
        tarefas={tarefasVisiveis}
        aoMudarTarefa={handleMudar}
        aoRemoverTarefa={handleRemover}
      />
    </main>
  );
}

export default App;