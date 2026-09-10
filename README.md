# Repositório destinado ao meu estudo referente ao framework REACT

## 1. Objetivos de aprendizagem
Ao finalizar o material de estudo, é esperado que eu saiba:
- explicar frontend, backend e fullstack;
- explicar por que o React é usado no frontend;
- verificar Node.js, npm e Git pelo terminal;
- criar um projeto React com Vite;
- iniciar e encerrar um servidor local;
- identificar arquivos importantes do projeto;
- escrever um componente funcional usando JSX;
- registrar seu trabalho com Git;
- documentar como outra pessoa pode executar o projeto;
- investigar problemas simples de configuração.

## 2. Conceitos Fundamentais

### 2.1 Frontend, backend e fullstack
**Frontend** é a parte do sistema responsável pela interação com o usuário, como: páginas, textos, botões, formulários e mensagens.
**Backend** é parte que coloca em prática as regras de negócio do sistema no servidos. Pode validar dados, processar requisições e interagir com o banco de dados.
**Banco de dados** armazena informações de forma persistente. No To-Do Pro (Projeto que será criado até o final do estudo), ele será utilizado para guardar tarefas mesmo depois que o navegador for fechado.
**Fullstack** é uma aplicação que conecta todas essas partes:

`Usuário -> Front(React) -> API do Back -> Banco de dados -> Resposta da API -> Front(React) -> Usuário`

### 2.2 O que é React?
React é uma biblioteca em JavaScript para criação de interfaces para o usuário. Ela foca em dividir a página em várias partes ao invés de trabalhar com uma página inteira, dividimos então em diversos componentes menores, como cabeçalho, formulário, item de tarefa e lista.

Trabalha com abordagem declarativa: você define como a interface deve ser em cada estado, e quando os dados mudam a biblioteca atualiza a tela.

### 2.3 SPA e componentes
Uma SPA, ou Single Page Application carrega uma aplicação inicial e atualiza aprenas algumas partes da interface sem recarregar todo o documento a cada interação. Assim como é feito no Instagram, Facebook, X... ao curtir uma publicação a página não é recarregada de forma completa, o que faria o usuário retornar a página inicial, ele atualiza apenas o "bloco" daquela publicação.

A estrutura do To-Do Pro poderá ser:
```
App
├── Header
├── TaskForm
└── TaskList
		 └── TaskItem
```

### 2.4 React e Angular: pontos de contato e diferenças
Angular e React criam interfaces **reativas e baseadas em componentes**, mas possuem abordagens diferentes.

| Conceito | Angular | React |
|---|---|---|
| **Natureza** | Framework completo, com recursos integrados | Biblioteca de UI; outras ferramentas são escolhidas separadamente |
| **Componente** | Classe TypeScript + template + estilos + metadados | Função JS/TS que retorna JSX |
| **Template** | HTML com diretivas (`*ngIf`, `*ngFor`) | JSX, combinando marcação e JavaScript |
| **Binding** | Property, event e two-way binding (`[(ngModel)]`) | Fluxo unidirecional; campos usam `value` e `onChange` |
| **Estado local** | Propriedades, Signals etc. | Hooks como `useState` e `useReducer` |
| **Injeção de dependência** | Recurso integrado ao framework | Não possui DI obrigatório |
| **Diretivas** | Alteram comportamento/renderização do template | Comportamento via componentes, hooks e JavaScript |
| **Atualização** | Detecção de mudanças e Signals | Reexecução dos componentes + reconciliação da árvore |

### Modelo mental do React

No Angular, é comum pensar em **componente + template + ciclo de vida**.

No React, pense em uma **função que recebe entradas e estado e retorna a interface**:

```
UI = função(props, state)
```

**Atenção:** JSX não é um template HTML que o navegador interpreta diretamente. O Vite transforma JSX em JavaScript durante o desenvolvimento e o build. Por isso, expressões JavaScript aparecem entre chaves e regras de JavaScript, como nomes de variáveis e funções, fazem parte da escrita da interface.

### 2.5 O DOM real e as abordagens Imperativa vs. Declarativa
O DOM (Document Object Model) é uma estrutura criada pelo navegador para representar o HTML de uma página, então cada marcação se torna manipulável e acessível no JavaScript. Maneiras de interagir com ele (web): **imperativa** e **declarativa**.

**1. Imperativa (DOM Tradicional):**
Nessa abordagem, você precisa descrever passo a passo como o navegador deve alterar a tela. Precisa buscar os elementos manualmente no DOM, escutar eventos e atualizar cada propriedade diretamente.
Ponto negativo: Quando a aplicação cresce, manter o estado em sincronia com a interface torna-se complexo e suscetível a erros.

Exemplo 1: Atualizando um título e classe visual (JavaScript Tradicional)
```
const title = document.querySelector("h1");
title.textContent = "Tarefas de hoje";
title.classList.add("highlight");
```

Exemplo 2: Formulário com seletor de filtros (JavaScript Tradicional)
```
// É necessário capturar manualmente cada elemento
const filterSelect = document.querySelector("#filter");
const taskList = document.querySelector("#task-list");

filterSelect.addEventListener("change", (event) => {
  const filter = event.target.value;
  // Lógica manual para buscar e alterar visibilidade de cada item
  const items = taskList.querySelectorAll("li");
  items.forEach((item) => {
    if (filter === "completed" && !item.classList.contains("done")) {
      item.style.display = "none";
    } else {
      item.style.display = "block";
    }
  });
});
```

**2. Declarativa (React):**
Aqui, você descreve **o que** deve ser exibido em função do estado atual e das props recebidas. Você não manipula o DOM diretamente; em vez disso, atualiza os dados (estado) e deixa que o React cuide de atualizar a interface.

Exemplo 1: Componente de título com props
```
function TaskTitle({ title, highlighted }) {
  return (
    <h1 className={highlighted ? "highlight" : ""}>
      {title}
    </h1>
  );
}
```

Exemplo 2: Formulário com Seletor de Filtros controlados por Estado
```
import { useState } from "react";

function TaskFilter({ tasks }) {
  const [filter, setFilter] = useState("all");

  // Estado derivado: calcula automaticamente os itens a serem exibidos
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">Todas</option>
        <option value="pending">Pendentes</option>
        <option value="completed">Concluídas</option>
      </select>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

Neste exemplo, quando o usuário altera a opção do select, a função setFilter atualiza o estado filter. Isso faz o React reexecutar a função do componente, recalculando filteredTasks e re-renderizando a lista de forma limpa e previsível.

### 2.6 Virtual DOM, processo de Diffing e Reconciliação
O **Virtual DOM (VDOM)** é uma representação leve e em memória (objeto JavaScript) do DOM real do navegador. Toda vez que o estado ou as props de um componente mudam, o React cria uma nova árvore no Virtual DOM.

**Entendendo o algoritmo de Diffing e Reconciliação:**

A **reconciliação** é o processo pelo qual o React atualiza o DOM real para refletir as mudanças do Virtual DOM. Para fazer isso de forma extremamente rápida, o React utiliza um algoritmo heurístico de comparação chamado Diffing.

**Passo 1 - Mudança de Estado/Props:** Um evento do usuário engatilha a atualização do estado ou a recepção de novas props.

**Passo 2 - Nova Árvore no VDOM:** O React executa a função do componente afetado e gera uma nova árvore do Virtual DOM.

**Passo 3 - Processo de Diffing:** O React compara nó a nó a nova árvore VDOM com a árvore VDOM anterior seguindo duas regras principais:
- **Tipos de elementos diferentes:** Se um elemento muda de tipo (ex: de `<div>` para `<section>`), o React destrói toda a árvore antiga e constrói a nova do zero.
- **Elementos do mesmo tipo:** Se os elementos têm o mesmo tipo (ex: dois `<button>`), o React compara apenas os atributos e o conteúdo interno, mantendo o nó no DOM real intacto.

**Passo 4 - Identificação por Keys:** Ao comparar listas, o React utiliza a prop key para mapear itens antigos com os novos, identificando facilmente reordenações, inserções e remoções sem precisar recriar a lista toda.

**Passo 5 - Patch no DOM Real:** Após calcular a diferença exata (o "delta"), o React aplica apenas as alterações estritamente necessárias no DOM real do navegador.

```
// Exemplo de Renderização de Lista e Keys Estáveis
{tasks.map((task) => (
  <li key={task.id}>{task.title}</li>
))}
```

A importância das Keys: Use sempre um identificador único e estável (como o ID vindo do banco ou um UUID). Evite usar o índice do array (index) como key quando a lista puder ser reordenada, filtrada ou modificada, pois isso compromete a precisão do algoritmo de diffing e pode causar comportamentos visuais incorretos.

### <a href="Exercicios/Exercicio1/">Exercício 1 - DOM imperativo e React declarativo</a>
Compare as duas abordagens para uma tela que deve mostrar 0 ou 1 tarefa concluída:

1. Descreva quais elementos o código imperativo precisaria localizar e modificar.
2. Descreva quais dados o componente React receberia.
3. Explique qual abordagem tende a ficar mais fácil de manter quando a tela crescer.
4. Abra o DevTools do navegador, inspecione o `<main>` e identifique o DOM real gerado pelo React.

**Verificação:** sua resposta deve diferenciar a árvore React criada pelo código e o DOM real que o navegador inspeciona.

### <a href="Exercicios/Exercicio2/">Exercício 2 - Identificando responsabilidades</a>
Classifique cada item como **frontend**, **backend** ou **banco de dados**:

1. Exibir o título de uma tarefa.
2. Validar se uma tarefa possui título antes de salvá-la.
3. Armazenar a data de criação de uma tarefa.
4. Alterar a cor de um botão ao passar o mouse.
5. Verificar se o usuário tem autorização para excluir uma tarefa.

**Verificação:** frontend: 1 e 4; backend: 2 e 5; banco de dados: 3. Algumas responsabilidades podem existir em mais de uma camada.

## 3. Preparando o ambiente

### 3.1 VS Code
O Visual Studio Code será o editor usado para escrever o projeto. Extensões úteis incluem ESLint, Prettier e Error Lens. Elas ajudam a encontrar problemas e formatar o código, mas não substituem a leitura das mensagens de erro.

### 3.2 Node.js e npm
O Node.js permite executar JavaScript fora do navegador e fornece ferramentas importantes para o desenvolvimento React. O npm instala bibliotecas, executa scripts e registra dependências no `package.json`.

Abra o terminal e execute:
```
node --version
npm --version
```
Você deverá ver os números das versões instaladas.

### 3.3 Git
Tenha seu git instalado e configurado devidamente.

### Checklist do ambiente
```
- [x] VS Code instalado
- [x] Node.js funcionando
- [x] npm funcionando
- [x] Git funcionando
- [x] Navegador atualizado
- [x] Terminal integrado funcionando
```

## 4. Criando o projeto com Vite
Vite cria a estrutura inicial do projeto e oferece um servidor local rápido. Na pasta onde você guarda seus projetos, execute:

```
npm create vite@latest todo-pro
cd todo-pro
npm install
npm run dev
```

Quando o comando fizer perguntas, escolha `React`, `JavaScript` e `ESLint`. O terminal exibirá um endereço parecido com http://localhost:5173/. Abra esse endereço no navegador. Para encerrar o servidor, pressione Ctrl + C no terminal.

### <a href="Exercicios/Exercicio3/">Exercício 3 - Primeiro projeto</a>
1. Crie o projeto todo-pro.
2. Execute npm install.
3. Execute npm run dev.
4. Abra o endereço no navegador.
5. Altere um texto e observe a atualização.
6. Encerre o servidor com Ctrl + C.

**Verificação:** você concluiu quando consegue iniciar e encerrar o projeto sem depender de um arquivo externo.

## 5. Conhecendo a estrutura do projeto
| Item | Função |
|---|---|
| `package.json` | Nome, scripts e dependências. |
| `package-lock.json` | Versões exatas instaladas pelo npm. |
| `node_modules/` | Dependências instaladas; não deve ser versionada. |
| `public/` | Arquivos públicos. |
| `src/` | Código principal da aplicação. |
| `src/main.jsx` | Ponto de entrada que inicializa o React. |
| `src/App.jsx` | Componente principal inicial. |
| `src/index.css` | Estilos globais. |
| `.gitignore` | Arquivos ignorados pelo Git. |

A relação inicial é:
```
index.html -> main.jsx -> App.jsx -> navegador
```

No package.json, o script dev normalmente aponta para o Vite:
```
"scripts": {
	 "dev": "vite",
	 "build": "vite build",
	 "preview": "vite preview"
}
```
### <a href="Exercicios/Exercicio4/">Exercício 4 - Exploração orientada</a>
Responda em `estrutura-projeto.md`:

1. Qual arquivo contém os scripts do npm?
2. Por que node_modules não deve ser enviado ao Git?
3. Onde ficará o código principal?
4. Qual é o papel do main.jsx?
5. Qual comando cria uma versão de produção?

**Respostas esperadas:** package.json; porque pode ser recriado com npm install; src; inicializar/renderizar a aplicação; npm run build.



## 6. Escrevendo JSX
JSX permite escrever uma sintaxe parecida com HTML dentro do JavaScript. Durante o build, ele é transformado em código que o React entende.

```jsx
function Welcome() {
  const name = "Equipe To-Do Pro";

  return (
    <section>
      <h1>Bem-vindo, {name}</h1>
      <p>Organize suas tarefas.</p>
    </section>
  );
}
```

O componente é uma função, seu nome começa com letra maiúscula, JavaScript fica entre chaves e o retorno possui um elemento raiz.

Substitua o conteúdo de `src/App.jsx` por:

```jsx
function App() {
  return (
    <main>
      <header>
        <h1>To-Do Pro</h1>
        <p>Organize suas tarefas em um só lugar.</p>
      </header>

      <section>
        <h2>Minhas tarefas</h2>
        <p>Nenhuma tarefa cadastrada ainda.</p>
        <button type="button">Adicionar tarefa</button>
      </section>
    </main>
  );
}

export default App;
```

Salve e observe o navegador. Se houver erro, confira parênteses, chaves, tags, aspas e a existência de um único elemento raiz.

### <a href="Exercicios/Exercicio5/">Exercício 5 - Personalizando JSX</a>
Altere a tela para incluir:

1. Seu nome ou nome da equipe.
2. Uma frase que explique o problema resolvido.
3. O texto `0 tarefas pendentes`.
4. Três tarefas de exemplo.
5. Um botão chamado `Nova tarefa`.

Use apenas JSX e dados fixos. O botão ainda não precisa funcionar.

**Verificação:** a tela deve abrir sem erros e apresentar os cinco itens solicitados.

## 7. Estado local com useState
Uma interface real precisa reagir a acontecimentos: o usuário digita, marca uma tarefa, remove um item ou troca um filtro. Essas informações que podem mudar durante a execução são chamadas de estado.

No React, o estado local de um componente pode ser criado com o hook `useState`:

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button type="button" onClick={() => setCount(count + 1)}>
      Cliques: {count}
    </button>
  );
}
```

Na linha `const [count, setCount] = useState(0);`, `count` é o valor atual, `setCount` solicita uma atualização e `0` é o valor inicial. A sintaxe entre colchetes usa desestruturação de arrays do JavaScript.

### 7.1 O que acontece quando o estado muda?
Quando `setCount` é chamada, o React agenda uma nova renderização:

1. O usuário clica no botão e o evento chama `setCount`.
2. O React armazena o novo estado e executa `Counter` novamente.
3. O JSX passa a conter o novo valor de `count`.
4. O React reconcilia a nova árvore com a anterior e atualiza o texto necessário no DOM real.

Isso não significa que o DOM inteiro seja apagado e recriado: o React aplica a menor alteração necessária.

### 7.2 Estado não é uma variável comum
Uma variável local comum perde seu valor quando a função é executada novamente e não solicita uma nova renderização:

```jsx
function WrongCounter() {
  let count = 0;

  function increment() {
    count += 1;
    console.log(count);
  }

  return <button onClick={increment}>Cliques: {count}</button>;
}
```

O `useState` mantém o valor entre renderizações e fornece uma função que comunica ao React que a interface precisa ser reavaliada.

### 7.3 Comparação com Angular
No Angular, uma propriedade da classe pode ser atualizada e o mecanismo do framework atualiza o template. No React, alterar uma variável comum não é suficiente: para estado local, use o setter retornado pelo hook.

```
Angular: propriedade da classe -> detecção de mudanças/signals -> template
React:   setter do hook -> nova renderização -> reconciliação -> DOM
```

`setCount(3)` não é uma atribuição direta; é uma solicitação de atualização gerenciada pelo React, que pode ser agrupada com outras atualizações.

### 7.4 Atualização baseada no valor anterior
Quando o novo valor depende do valor anterior, prefira a forma funcional:

```jsx
setCount((currentCount) => currentCount + 1);
```

Ela é mais segura em várias atualizações no mesmo evento:

```jsx
function incrementThreeTimes() {
  setCount((current) => current + 1);
  setCount((current) => current + 1);
  setCount((current) => current + 1);
}
```

Cada função recebe o resultado mais recente disponível na sequência. A forma `setCount(count + 1)` usa o valor capturado na renderização atual e pode não produzir o resultado esperado quando repetida.

### 7.5 Imutabilidade de objetos e arrays
O estado deve ser tratado como imutável. Não altere diretamente o array guardado no estado:

```jsx
// Evite
tasks.push(newTask);
setTasks(tasks);
```

Crie uma nova referência:

```jsx
setTasks((currentTasks) => [...currentTasks, newTask]);

// Alternar o status de uma tarefa
setTasks((currentTasks) =>
  currentTasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  )
);

// Remover uma tarefa
setTasks((currentTasks) =>
  currentTasks.filter((task) => task.id !== taskId)
);
```

O operador spread (`...`) copia propriedades ou itens, enquanto `map` e `filter` devolvem novos arrays.

### 7.6 Estado derivado
Nem todo valor exibido precisa de outro estado. Se ele pode ser calculado a partir de `tasks`, derive-o durante a renderização:

```jsx
const completedCount = tasks.filter((task) => task.completed).length;
const pendingCount = tasks.length - completedCount;
```

Evite manter `tasks` e `completedCount` em estados independentes: dois valores que representam a mesma informação podem ficar inconsistentes.

### 7.7 Regras importantes dos hooks

- Chame hooks no nível superior do componente, não dentro de `if`, `for` ou funções aninhadas.
- Chame hooks apenas dentro de componentes React ou hooks customizados.
- Escolha o estado mínimo necessário e derive o restante.
- Passe dados para componentes filhos por props; passe funções quando o filho precisar solicitar uma alteração ao pai.

Exemplo: contador de tarefas.

```jsx
import { useState } from "react";

function TaskSummary() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Estudar React", completed: false },
    { id: 2, title: "Criar projeto Vite", completed: true },
  ]);

  const completedCount = tasks.filter((task) => task.completed).length;

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <section>
      <p>Concluídas: {completedCount}</p>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>{task.title}</span>
            <button type="button" onClick={() => toggleTask(task.id)}>
              {task.completed ? "Reabrir" : "Concluir"}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

### <a href="Exercicios/Exercicio6/">Exercício 6 - Contador e estado de tarefas</a>
Crie um componente `TaskSummary` que possua ao menos três tarefas no estado, mostre os totais de tarefas e concluídas, permita alternar o status e use `key` com o identificador da tarefa. Não use `push`, `splice` ou atribuição direta ao array do estado.

Depois responda:

1. Por que `setTasks((currentTasks) => ...)` foi usado?
2. Por que `completedCount` não precisa ser outro `useState`?
3. O que muda no DOM real quando você conclui uma tarefa?

**Verificação:** o contador deve atualizar sem recarregar a página e o console não deve apresentar avisos de `key`.

## 8. Versionando o trabalho com Git
Na pasta do projeto, execute:

```bash
git init
git status
git add .
git commit -m "feat: cria base inicial do To-Do Pro"
git log --oneline -1
```

Um commit é um registro de um conjunto coerente de alterações. Mensagens úteis indicam o que foi feito, por exemplo `feat: cria tela inicial de tarefas` ou `docs: adiciona instruções de execução`.

### <a href="Exercicios/Exercicio7/">Exercício 7 - Primeiro registro</a>

1. Confira `git status`.
2. Confirme que `node_modules` não está sendo listado.
3. Crie o commit da primeira versão.
4. Consulte o histórico com `git log --oneline -1`.

**Verificação:** seu histórico deve conter um commit identificável da primeira entrega.

## 9. Documentando o projeto
Um README útil responde o que é o projeto, o que é necessário e como executá-lo. Para o To-Do Pro, inclua o título, uma breve descrição, os pré-requisitos e os comandos `npm install` e `npm run dev`.

### <a href="Exercicios/Exercicio8/">Exercício 8 - Teste de reprodução</a>
Peça a um colega para abrir o README e executar o projeto. Depois registre pelo menos uma melhoria feita a partir do teste.

## 10. Desafio final - Primeira entrega do To-Do Pro
Entregue um projeto React com Vite que contenha:

- Cabeçalho com **To-Do Pro** e descrição curta do sistema.
- Seção **Minhas tarefas** com ao menos três tarefas fixas.
- Diferença visual entre tarefa pendente e concluída e botão **Nova tarefa**.
- Layout legível em desktop e janela estreita.
- README de instalação e execução e pelo menos dois commits coerentes.

### Requisitos técnicos

- Usar React, JSX, Vite e manter o código em `src`.
- Utilizar `main`, `header`, `section` e `button`.
- Não utilizar backend ou banco nesta etapa.
- Não inserir senhas ou tokens no repositório.
- Executar com `npm run dev` sem erros no console.

### Checklist de entrega

- [ ] O projeto executa com `npm install` e `npm run dev`.
- [ ] O nome To-Do Pro e sua finalidade aparecem na tela.
- [ ] Existem pelo menos três tarefas com diferença entre pendente e concluída.
- [ ] A interface usa estrutura semântica e não há erro no console.
- [ ] O README explica instalação e execução.
- [ ] O repositório possui pelo menos dois commits e consigo explicar sua estrutura.

## 11. Autoavaliação

| Afirmação | Ainda não | Com ajuda | Sozinho |
|---|---|---|---|
| Consigo verificar Node.js, npm e Git. | | | |
| Consigo criar um projeto React com Vite. | | | |
| Consigo iniciar e encerrar o servidor local. | | | |
| Consigo explicar `src`, `package.json` e `node_modules`. | | | |
| Consigo criar um componente com JSX. | | | |
| Consigo registrar alterações com Git. | | | |
| Consigo escrever um README de execução. | | | |
| Consigo investigar um erro simples. | | | |

Responda também: qual foi o erro mais difícil da semana, como você o investigou, qual parte da entrega ainda pode melhorar e o que espera aprender na próxima semana.

## 12. Problemas comuns

| Problema | Possível solução |
|---|---|
| `node: command not found` | Instale o Node.js LTS, reinicie o terminal e tente novamente. |
| Falha ao criar o projeto | Confira a internet, a versão do npm e o diretório atual. Não crie um projeto dentro de outro projeto. |
| Porta em uso | Use o endereço alternativo exibido pelo Vite ou encerre o processo anterior com `Ctrl + C`. |
| Página não atualiza | Salve o arquivo, confirme que o servidor está ativo e verifique se editou o projeto correto. |
| Erro de JSX | Confira tags fechadas, elemento raiz único, chaves, parênteses, aspas e nomes de atributos. |
| Arquivos demais no Git | Verifique o `.gitignore`. A pasta `node_modules` não deve ser versionada. |

## 13. Glossário rápido

| Termo | Definição |
|---|---|
| API | Interface usada para comunicação entre sistemas. |
| Componente | Unidade reutilizável de interface React. |
| Frontend | Camada visual e interativa. |
| JSX | Sintaxe que combina JavaScript e marcação semelhante a HTML. |
| npm | Gerenciador de pacotes e scripts do Node.js. |
| React | Biblioteca JavaScript para interfaces. |
| SPA | Aplicação que atualiza a interface sem recarregar tudo. |
| Vite | Ferramenta de criação e desenvolvimento frontend. |

## 14. Referências

- [Material base para o aprendizado](https://docs.google.com/document/d/1huTwGiBRyVmeiitkZLcDy2G5XNscgEI3uP8EuZC8fmI/edit?pli=1&tab=t.0#heading=h.nl4230mb6bf3)
- [React: Learn React](https://react.dev/learn)
- [Vite: Getting Started](https://vite.dev/guide/)
- [Node.js: documentação oficial](https://nodejs.org/docs/latest/api/)
- [Git: documentação oficial](https://git-scm.com/doc)
- [MDN Web Docs: JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
