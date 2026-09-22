//Método para Controlar as ações  das tarefas via CallBack

function TarefaAction({aoCompletar, aoRemover}){
    return(
        <div className="tarefa-action">
            <button type="buttoon" className="btn-done" onClick={aoCompletar}>
                Concluir
            </button>
            <button type="buttoon" className="btn-delete" onClick={aoRemover}>
                Deletar
            </button>
        </div>
    );
}

export default TarefaAction;