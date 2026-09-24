# REACT - Guia Rápido e Anotações

| Guia referente à aula do dia 22/09/2026
<a href="lista-tarefas/">

**Unidade Curricular:** Desenvolvimento FrontEnd
**Conteúdo:** Desenvolvimento de Frameworks - REACT

## Semana 1 - Introução ao React e Ambiente de Desenvolvimento

### 1. O que é React?

- Uma Biblioteca JavaScript para criação de interfaces de Usuário (UI)
- Funciona de forma **declarativa**: você descreve o resultado esperadpo com base nos dados, e o REACT atualiza o navegador.
- Cria *SPAs* (Single Page Applications): atualiza partes da tela sem recarregar a página inteira.

### 2. React vs JavaScript Vanilla: DOM Tradicional vs Virtual DOM

O DOM no JavaScript Tradicional é Imperativo: PRocura a tag, muda o componente e atualiza a página

React (Declarativo): UI=Componente(dados) -> Quando os dados mudam, o React atualiza o componente.

### 3. Comandos essenciais no terminal

```bash
#Criar projeto com o VITE(framework react)
npm create vite@latest nome-projeto --template react

#atualizar e instalar depêndencias do node_modules
npm install

# Iniciar o servidor local (http://localhost:5173)
npm run dev

```

### 4. Sintaxe do primeiro componente JSX(permite escrever códigos parecidos com HTML diretamente dentro do arquivo de script)

```jsx
//src/App.js
//Componente Raiz da Aplicação
function App(){
    const sistema = "Meu Site";

    return(
        <main>
            <h1>{sistema}</h1>
            <p>Gerencie seus componentes em um só lugar</p>
        </main>
    );
}

export default App;
```

> Obs: O JSX exibe **uma única tag raiz** (ou fragmento `<> ... </>`) e nomes de componentes sempre começam com a letra **Maiúscula** (UpperCamelCase).

---

## Semana 2 - JSX, Componentes, Props e Eventos

### 1. Responsabilidade Única (SOLID)
- Quebrar a tela em componentes pequenos. Cada componente deve fazer apenas uma unica coisa bem feita:

**Exemplo de componentes:**
- `Header`: cuida do título e do cabeçalho da aplicação
- `Footer`: cuida do rodapé da aplicação
- `NavBar`: cuida da barra de navegação do site

> obs: o principio do SOLID estabelece que uma unidade de software deveter apenas um motivo para mudar

### 2. Props: passagem de dados e fluxo unidirecional

**O que são Props?**

Os props são argumentos ou parâmetros das funções já que um componenete REACT é uma função JavaScript, ou seja, as props (abreviação de properties) permitem que o componente pai envie dados dinâmicamente para o componente filho, tornando-o customizavel e reutilizável.

### 3. Eventos e Comunicação via Callbacks

React - encapsulamento de eventos nativos em objetos, a diferença do react para o HTML é a sintaxe
- no HTML : `onclick="minhafuncao()"`
- no React JSX : `onclick={minhaFuncao}`

> funções em JavaScriot deve seguir o padrão lowerCamelCase de escrita.

```mermaid
flowchart LR
    A[Componente-Pai]
    B[Componente-Filho]
    A --(Passa dados via props)--> B
    B --(Dispara a ação via CallBack)-->A
```

### 4. Lista dinâmicas com map() e a propriedades `key`

**Porque Arrays são estruturas padrão do FrontEnd?**

Os dados chegam de banco de dados e APIs no formato de coleção (json)

O método `.map()` percore cada item de um array e retorna um novo componente JSX

Exemplo:
```jsx
tarefas.map((tarefa)=>(
    <TarefaItem
        key={tarefa.id}
        id={tarefa.id}
        titulo={tarefa.titulo}
        descricao={tarefa.descricao}
        completa={tarefa.completa}
    />
))
```

**Porque o React exige o `key` no uso do `.map()`**

O React quando renderia uma list precisa saber de forma inequívoca qual item específico foi adicionao, alterado ou removido. Se a chave for omitida, o React emite um aviso no console: `Warning: Each child in a list should have a unique "key" prop.`

> evitar o índice do array como chave `(key={index})`: índice do vetor não é fixo, use sempre uma chave única para os itens da lista (carimbo de data e hora, id único)

### Componentes de Formulário Estático:

Criando o Arquivo `TarefaForm.jsx`

---

## Semana 3 - Estado, Formulário e CRUD em memória

**Tema:** Transição de uma interface estática para uma aplicação reativa, trabalho com o hook fundamental chamado `useState`, construção de formulários com validação, CRUD Completo, filtros e buscas textuais.

**Contextualização:** Na Semana 2, decomposição de tela monolítica em componentes reutilizáveis, organização do fluxo dos props e captura de eventos.

### Bloco 1 - O Conceito de Estado e o hook `useState`

**Variável Comum vs. Estado Reativo**

```js
// Vaiável comum do JS
function Contador() {
    let contador = 0;

    function incremento() {
        contador += 1;
        console.log("Contador no console", contador); // exibe o número
    }

    return (
        <div>
            <p>Clique: {contador}</p>
            <button type="button" onClick={incremento}>Somar<button>
        </div>
    )
}
```

Obs:
* JavaScript convencionais perdem suas variáveis locais ao término da execução.
* O React não monitora variáveis comuns. Ele não sabe que a variável mudou e, portanto, não tem motivo para desehar a tela.
* O estado (state) é a memória do componente. Quando o estado é modificado por uma função, o React agenda uma nova execução da função do componente (re-renderização), atualizando o Virtual DOM e o navegador.

**A Sintaxe do `useState`**

Ao invés do `let contador = 0;`

Usa-se:

```jsx
const [contador, setContador] = useState(0);
```
Obs:
* `contador`: a foto do dado no momento da renderização atual;
* `setConador`: a função despachante que atualiza o dado e notifica o React;
* `useState(0)`: define o valor com o qual o componente nasce.

**Chamando a Mudança de Estado**

O próximo valor sempre depende do valor anterior

```jsx
// Forma segura e profissional de realizar a mudança de estado
setContador((prevContador) => prevContador + 1);
// atualização funcional do valor

// Outra forma - menos profissional
setContador(contador + 1);
```

> Fazendo a Mudança no Aplicativo de Lista de Tarefas
> React\lista-tarefas\src\App.jsx

### Bloco 2 - Elevação de Estado (Lifting State Up)

A Comunicação entre os componentes, para que dois ou mais componentes no React compartilhem ou modifiquem dados, o estado deve ser elevado para o ancestal comum entre eles.

```mermaid
flowchart TB
    A[App.jsx - Ancestral Comum - O Estado Deve Estar Aqui]
    B[TarefaForm.jsx]
    C[TarefaList.jsx]
    D[TarefaItem.jsx]
    E[TarefaAction.jsx]

    A --> B
    A --> C
    C --> D
    D --> E
```
Obs:
1. O Estado `tarefas` reside no App.jsx;
2. O App.jsx cria as funções de modificação (handleAddTarefa, handleMudarTarefa, hadleDeletarTarefa);
3. Os dados descem como props para quem precisa usá-los;
4. As funções descem como callbacks para quem precisa disparar a ação.

### Bloco 3 - Formulários Controlados e Validação

**Controlando Componentes (Controlled Components)**

No HTML tradicional, os inputs guardam seu próprio texto internamente no DOM. No React, a única fonte de armazenamento deve ser o próprio React.

Um input é controlado quando:
1. Seu atributo `value` está amarrado a um estado do React
2. Seu Evento `onChange` atualiza esse mesmo estado a cada caracter digitado

Exemplo de uso:
```jsx
const [titulo, setTitulo] = useState("");

<input
    type="text"
    value="titulo"
    onChange={(e) => setTitulo(e.target.value)}
/>
```

**Prevenindo o Recarregamento com `event.preventDefault()`**

Evitar o comportamento nativo da web, que é submeter formulários e recarregar a página quando formulário ou eventos forem enviados.

```jsx
function handleSubmit(event) {
    event.preventDefault(); // impede o carregamento da página
    // processamento dos dados
}
```

**Construir Formulário na Atividade Lista de Tarefas**
>React\lista-tarefas\src\components\TarefaForm.jsx

---

### Bloco 4 - Operações CRUD da Memória

**Imutabilidade no React**

Para que o React detecet ma alteração em um objeto ou array, devemos criar uma nova cópia com a alteração desejada.

Métodos como `.push()` `.unshift` `pop()` não permitem modificar arrays no react, pois, o react compara o objeto na memoria e identifica que não teve mudança e conclui que não precisa fazer a renderização. a mudança só ocorre se form chamado o useState (mudança de estado).

**Operações de Imuabilidade no REACT**

* **Inserir**:
    `[novoItem, ...array]`
    // a mudança é feita criando um novo array com o novo item e espalhando os itens antigos

* **Remover**:
    `array.filter(item => item.id !== id)`
    // a mudança é feita criando um novo array filtrando os itens antigos e removendo o item desejado

* **Atualizar**:
    `array.map(item => item.id === id ? {...item, completed:true} : item)`
    // a mudança é feita criando um novo array mapeando os itens antigos e atualizando o item desejado


**Adicionando as 4 operações do CRUD no App.jsx**
>React\lista-tarefas\src\App.jsx

---

### Bloco 5 - Filtros e Buscas

**Erro de criar estados duplicados**

Muitos programadores pensam em duplicar listas no React, porém, isso é um erro. Se você apaga uma tarefa em uma lista  deve lembrar de apagar na outra também, se esquecer de fazer isso os dados ficam desincronizados e podem gerar problemas no código.

Para resolver esse problemas, se um dado pode ser calculado a partir de um estado já existente, use esse cálculo ou essa lógica. **Não crie um novo estado para ele, ou seja, não duplique!!!**

**Vamos Criar um componente para filtragem das Tarefas em nossa aplicação.**
Digite o Comando no Terminal
```bash
type nul > src/components/TarefaFilters.jsx
```