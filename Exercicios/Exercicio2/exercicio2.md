# Exercício 2 — Identificando responsabilidades

| Item | Camada | Justificativa |
|---|---|---|
| Exibir o título de uma tarefa. | Frontend | É uma informação apresentada na interface. |
| Validar se uma tarefa possui título antes de salvá-la. | Backend | A regra protege os dados antes da persistência. |
| Armazenar a data de criação de uma tarefa. | Banco de dados | A data precisa permanecer salva. |
| Alterar a cor de um botão ao passar o mouse. | Frontend | É um comportamento visual da interface. |
| Verificar se o usuário tem autorização para excluir uma tarefa. | Backend | É uma regra de segurança e autorização. |

Algumas validações também podem ser feitas no frontend para melhorar a experiência do usuário, mas a validação no backend continua necessária.
