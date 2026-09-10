# Exercício 6 — Contador e estado de tarefas

A implementação está em [todo-pro/src/App.jsx](../../todo-pro/src/App.jsx).

## Resultado

- O estado inicia com três tarefas.
- A interface mostra totais de tarefas concluídas e pendentes.
- Cada tarefa pode ser concluída ou reaberta.
- Cada item usa `task.id` como `key`.
- As alterações usam `map` e spread, sem modificar o array original.

## Respostas

1. `setTasks((currentTasks) => ...)` usa o estado mais recente disponível, o que torna a atualização segura mesmo quando o React agrupa atualizações.
2. `completedCount` é derivado de `tasks`; guardá-lo em outro `useState` duplicaria a mesma informação e poderia causar inconsistências.
3. Ao concluir uma tarefa, o React compara a nova interface com a anterior e atualiza o texto, a classe visual e o botão do item correspondente no DOM real.
