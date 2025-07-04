# Documentação da API - Gerenciamento de Tarefas

## Visão Geral

Esta API RESTful permite o gerenciamento completo de tarefas com operações CRUD (Create, Read, Update, Delete) e funcionalidades de filtragem por status.

**Base URL**: `http://localhost:5000/api`

## Autenticação

Atualmente, a API não requer autenticação. Todas as rotas são públicas.

## Formato de Resposta

Todas as respostas são retornadas em formato JSON.

### Resposta de Sucesso
```json
{
  "id": 1,
  "titulo": "Exemplo de Tarefa",
  "descricao": "Descrição da tarefa",
  "status": "pendente",
  "data_vencimento": "2024-12-31"
}
```

### Resposta de Erro
```json
{
  "message": "Descrição do erro",
  "errors": [
    {
      "path": ["campo"],
      "message": "Mensagem específica do erro"
    }
  ]
}
```

## Endpoints

### 1. Criar Tarefa

**POST** `/api/tarefas`

Cria uma nova tarefa no sistema.

#### Parâmetros do Body

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| titulo | string | ✅ | Título da tarefa (não vazio) |
| descricao | string | ❌ | Descrição detalhada da tarefa |
| status | enum | ✅ | Status: "pendente", "realizando", "concluída" |
| data_vencimento | string | ❌ | Data no formato ISO (YYYY-MM-DD) |

#### Exemplo de Requisição
```bash
curl -X POST http://localhost:5000/api/tarefas \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Estudar API RESTful",
    "descricao": "Aprender conceitos e práticas de APIs REST",
    "status": "pendente",
    "data_vencimento": "2024-12-31"
  }'
```

#### Exemplo de Resposta (201 Created)
```json
{
  "id": 1,
  "titulo": "Estudar API RESTful",
  "descricao": "Aprender conceitos e práticas de APIs REST",
  "status": "pendente",
  "data_vencimento": "2024-12-31"
}
```

#### Possíveis Erros
- **400 Bad Request**: Dados inválidos ou obrigatórios ausentes

---

### 2. Listar Tarefas

**GET** `/api/tarefas`

Lista todas as tarefas do sistema com opção de filtrar por status.

#### Parâmetros de Query (Opcionais)

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| status | string | Filtrar por status específico |

#### Exemplos de Requisição
```bash
# Listar todas as tarefas
curl http://localhost:5000/api/tarefas

# Filtrar por status
curl http://localhost:5000/api/tarefas?status=pendente
curl http://localhost:5000/api/tarefas?status=realizando
curl http://localhost:5000/api/tarefas?status=concluída
```

#### Exemplo de Resposta (200 OK)
```json
[
  {
    "id": 1,
    "titulo": "Estudar API RESTful",
    "descricao": "Aprender conceitos e práticas de APIs REST",
    "status": "pendente",
    "data_vencimento": "2024-12-31"
  },
  {
    "id": 2,
    "titulo": "Implementar Frontend",
    "descricao": null,
    "status": "realizando",
    "data_vencimento": null
  }
]
```

#### Possíveis Erros
- **400 Bad Request**: Status inválido fornecido

---

### 3. Buscar Tarefa por ID

**GET** `/api/tarefas/{id}`

Busca uma tarefa específica pelo seu ID.

#### Parâmetros de Rota

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| id | number | ID único da tarefa |

#### Exemplo de Requisição
```bash
curl http://localhost:5000/api/tarefas/1
```

#### Exemplo de Resposta (200 OK)
```json
{
  "id": 1,
  "titulo": "Estudar API RESTful",
  "descricao": "Aprender conceitos e práticas de APIs REST",
  "status": "pendente",
  "data_vencimento": "2024-12-31"
}
```

#### Possíveis Erros
- **400 Bad Request**: ID inválido (não numérico)
- **404 Not Found**: Tarefa não encontrada

---

### 4. Atualizar Tarefa

**PUT** `/api/tarefas/{id}`

Atualiza uma tarefa existente. Todos os campos são opcionais, mas pelo menos um deve ser fornecido.

#### Parâmetros de Rota

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| id | number | ID único da tarefa |

#### Parâmetros do Body (Pelo menos um obrigatório)

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| titulo | string | Novo título da tarefa |
| descricao | string | Nova descrição da tarefa |
| status | enum | Novo status: "pendente", "realizando", "concluída" |
| data_vencimento | string | Nova data no formato ISO (YYYY-MM-DD) |

#### Exemplo de Requisição
```bash
curl -X PUT http://localhost:5000/api/tarefas/1 \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Estudar API RESTful - Atualizado",
    "status": "realizando"
  }'
```

#### Exemplo de Resposta (200 OK)
```json
{
  "id": 1,
  "titulo": "Estudar API RESTful - Atualizado",
  "descricao": "Aprender conceitos e práticas de APIs REST",
  "status": "realizando",
  "data_vencimento": "2024-12-31"
}
```

#### Possíveis Erros
- **400 Bad Request**: 
  - ID inválido
  - Dados inválidos
  - Nenhum campo fornecido para atualização
- **404 Not Found**: Tarefa não encontrada

---

### 5. Excluir Tarefa

**DELETE** `/api/tarefas/{id}`

Remove uma tarefa do sistema.

#### Parâmetros de Rota

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| id | number | ID único da tarefa |

#### Exemplo de Requisição
```bash
curl -X DELETE http://localhost:5000/api/tarefas/1
```

#### Exemplo de Resposta (200 OK)
```json
{
  "message": "Tarefa excluída com sucesso"
}
```

#### Possíveis Erros
- **400 Bad Request**: ID inválido (não numérico)
- **404 Not Found**: Tarefa não encontrada

---

## Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 | OK - Operação realizada com sucesso |
| 201 | Created - Recurso criado com sucesso |
| 400 | Bad Request - Erro na requisição (dados inválidos) |
| 404 | Not Found - Recurso não encontrado |
| 500 | Internal Server Error - Erro interno do servidor |

## Validações

### Título
- **Obrigatório** na criação
- **Tipo**: String não vazia
- **Exemplo**: "Estudar TypeScript"

### Descrição
- **Opcional**
- **Tipo**: String
- **Exemplo**: "Aprender os fundamentos do TypeScript"

### Status
- **Obrigatório** na criação
- **Valores aceitos**: "pendente", "realizando", "concluída"
- **Exemplo**: "pendente"

### Data de Vencimento
- **Opcional**
- **Formato**: ISO Date (YYYY-MM-DD)
- **Validação**: Deve ser uma data válida
- **Exemplo**: "2024-12-31"

## Exemplos de Uso Completo

### Fluxo Típico de Uso

```bash
# 1. Criar uma nova tarefa
curl -X POST http://localhost:5000/api/tarefas \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Aprender Node.js",
    "descricao": "Estudar fundamentos e criar APIs",
    "status": "pendente",
    "data_vencimento": "2024-12-31"
  }'

# 2. Listar todas as tarefas
curl http://localhost:5000/api/tarefas

# 3. Buscar tarefa específica
curl http://localhost:5000/api/tarefas/1

# 4. Atualizar status da tarefa
curl -X PUT http://localhost:5000/api/tarefas/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "realizando"}'

# 5. Filtrar tarefas em andamento
curl http://localhost:5000/api/tarefas?status=realizando

# 6. Marcar como concluída
curl -X PUT http://localhost:5000/api/tarefas/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "concluída"}'

# 7. Excluir tarefa
curl -X DELETE http://localhost:5000/api/tarefas/1
```

## Testando com a Interface Web

Acesse `http://localhost:5000` para usar o testador interativo que inclui:

- Formulários para todos os endpoints
- Visualização de respostas em tempo real
- Validação de dados
- Estatísticas das tarefas
- Interface amigável

## Coleção Postman

Para facilitar os testes, você pode criar uma coleção no Postman com os seguintes requests:

1. **POST Create Task** - `/api/tarefas`
2. **GET List Tasks** - `/api/tarefas`
3. **GET Filter Tasks** - `/api/tarefas?status={{status}}`
4. **GET Get Task** - `/api/tarefas/{{taskId}}`
5. **PUT Update Task** - `/api/tarefas/{{taskId}}`
6. **DELETE Delete Task** - `/api/tarefas/{{taskId}}`

Configure as variáveis `status` e `taskId` conforme necessário.