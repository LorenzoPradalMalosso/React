# Exercício 1 — DOM imperativo e React declarativo

## 1. Elementos localizados e modificados no código imperativo
O código imperativo precisaria localizar o elemento que mostra a quantidade de tarefas concluídas, a lista de tarefas, cada item da lista e, se existirem, os botões que alteram o status. Depois, precisaria modificar manualmente o texto, as classes CSS e a visibilidade de cada elemento.

## 2. Dados recebidos pelo componente React
O componente pode receber uma lista de tarefas, por exemplo:

```js
[{ id: 1, title: 'Estudar React', completed: true }]
```

Também pode receber uma função, como `onToggleTask`, quando outro componente for responsável por alterar o estado.

## 3. Abordagem mais fácil de manter
A abordagem declarativa do React tende a ser mais fácil de manter. O componente descreve a interface a partir dos dados atuais; ao mudar uma tarefa, o React atualiza somente o necessário. No código imperativo, seria preciso manter manualmente os dados e a tela sincronizados.

## 4. DOM real
O React cria uma árvore de elementos durante a renderização. No DevTools, o elemento `<main>` inspecionado é o DOM real gerado no navegador a partir dessa árvore; ele não é o Virtual DOM.
