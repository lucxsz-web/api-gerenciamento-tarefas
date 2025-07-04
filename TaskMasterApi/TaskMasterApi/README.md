# API RESTful para Gerenciamento de Tarefas

Uma API REST completa para gerenciamento de tarefas com operações CRUD, filtragem por status e validação de dados, construída com Express.js e React.

## 📋 Funcionalidades

- ✅ **CRUD Completo**: Criar, listar, atualizar e excluir tarefas
- 🔍 **Filtragem**: Filtrar tarefas por status (pendente, realizando, concluída)
- ✅ **Validação**: Validação robusta de dados com Zod
- 🎨 **Interface Web**: Frontend React com testador de API interativo
- 📊 **Dashboard**: Estatísticas e visualização de tarefas
- 🚀 **TypeScript**: Tipagem completa para maior segurança

## 🛠️ Tecnologias

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **TypeScript** - Tipagem estática
- **Zod** - Validação de schemas
- **Drizzle ORM** - ORM type-safe

### Frontend
- **React 18** - Biblioteca UI
- **TanStack Query** - Gerenciamento de estado do servidor
- **Tailwind CSS** - Framework CSS
- **Radix UI** - Componentes acessíveis
- **Wouter** - Roteamento cliente

## 🚀 Como Executar

### Pré-requisitos
- Node.js 20 ou superior
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/api-tarefas.git
cd api-tarefas

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

O servidor estará rodando em `http://localhost:5000`

## 📡 Endpoints da API

### Criar Tarefa
```http
POST /api/tarefas
Content-Type: application/json

{
  "titulo": "Estudar API",
  "descricao": "Estudar como criar uma API RESTful",
  "status": "pendente",
  "data_vencimento": "2024-12-31"
}
```

### Listar Tarefas
```http
GET /api/tarefas
GET /api/tarefas?status=pendente
```

### Buscar por ID
```http
GET /api/tarefas/{id}
```

### Atualizar Tarefa
```http
PUT /api/tarefas/{id}
Content-Type: application/json

{
  "titulo": "Estudar API - Revisão",
  "status": "realizando"
}
```

### Excluir Tarefa
```http
DELETE /api/tarefas/{id}
```

## 📝 Schema de Dados

### Tarefa
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | number | Auto | ID único da tarefa |
| `titulo` | string | ✅ | Título da tarefa |
| `descricao` | string | ❌ | Descrição detalhada |
| `status` | enum | ✅ | Status: "pendente", "realizando", "concluída" |
| `data_vencimento` | date | ❌ | Data de vencimento |

## 🎯 Códigos de Status HTTP

- `200 OK` - Operação bem-sucedida
- `201 Created` - Recurso criado com sucesso
- `400 Bad Request` - Erro de validação
- `404 Not Found` - Recurso não encontrado
- `500 Internal Server Error` - Erro interno do servidor

## 🧪 Testando a API

### Via Interface Web
Acesse `http://localhost:5000` para usar o testador interativo que permite:
- Testar todos os endpoints
- Ver respostas em tempo real
- Validar dados de entrada
- Visualizar estatísticas das tarefas

### Via Postman/Insomnia
Importe a coleção usando os exemplos de endpoints acima.

### Via cURL
```bash
# Criar tarefa
curl -X POST http://localhost:5000/api/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Teste","status":"pendente"}'

# Listar tarefas
curl http://localhost:5000/api/tarefas

# Filtrar por status
curl http://localhost:5000/api/tarefas?status=pendente
```

## 📁 Estrutura do Projeto

```
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── lib/           # Utilitários e configurações
│   │   └── hooks/         # Custom hooks
├── server/                # Backend Express
│   ├── index.ts          # Entrada do servidor
│   ├── routes.ts         # Definição das rotas
│   ├── storage.ts        # Camada de persistência
│   └── vite.ts           # Configuração Vite
├── shared/               # Código compartilhado
│   └── schema.ts        # Schemas e tipos TypeScript
├── package.json         # Dependências e scripts
└── README.md           # Documentação
```

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento com hot reload
npm run build        # Build para produção
npm run preview      # Preview do build
npm run db:push      # Aplicar mudanças no schema do banco
```

## 🎨 Funcionalidades da Interface

- **Testador de API**: Interface para testar todos os endpoints
- **Dashboard**: Estatísticas e resumo das tarefas
- **Formulários**: Criação e edição de tarefas
- **Notificações**: Feedback visual para todas as operações
- **Responsivo**: Interface adaptada para desktop e mobile

## 🔍 Validações Implementadas

- **Título**: Obrigatório, string não vazia
- **Status**: Obrigatório, enum válido
- **Data de Vencimento**: Formato de data válido quando fornecida
- **IDs**: Validação de números inteiros para parâmetros de rota

## 🛡️ Tratamento de Erros

A API implementa tratamento robusto de erros com:
- Validação de entrada com Zod
- Respostas HTTP apropriadas
- Mensagens de erro descritivas
- Logs estruturados

## 📚 Próximos Passos

- [ ] Implementação de autenticação JWT
- [ ] Paginação para listagem de tarefas
- [ ] Filtros avançados (data, prioridade)
- [ ] API de notificações
- [ ] Testes automatizados
- [ ] Deploy com Docker

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvido por

Este projeto foi desenvolvido como parte do desafio de construção de uma API RESTful para gerenciamento de tarefas.