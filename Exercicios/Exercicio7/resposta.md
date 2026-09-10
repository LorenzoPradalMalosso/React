# Exercício 7 — Primeiro registro

## Comandos utilizados para verificar o repositório

```bash
git status
git log --oneline -1
```

## Resultado

O repositório já possui um commit inicial identificável:

```text
e9f8538 10/09/2026 - Criação do repositório React - voltado ao estudo e desenvolvimento do framework
```

O arquivo `.gitignore` do projeto Vite impede que `node_modules` seja incluído no versionamento. As alterações desta entrega devem ser registradas em um próximo commit com uma mensagem descritiva, por exemplo:

```bash
git add README.md Exercicios todo-pro
git commit -m "feat: conclui exercícios iniciais de React"
```
