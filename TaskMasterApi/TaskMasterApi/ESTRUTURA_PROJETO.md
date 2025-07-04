# Estrutura do Projeto - API de Gerenciamento de Tarefas

## Arquivos Principais para GitHub

```
api-tarefas/
├── README.md                    # Documentação principal
├── DOCUMENTACAO_API.md          # Documentação técnica da API
├── ESTRUTURA_PROJETO.md         # Este arquivo
├── .gitignore                   # Arquivos a serem ignorados
├── package.json                 # Dependências e scripts
├── package-lock.json            # Lock das dependências
├── tsconfig.json                # Configuração TypeScript
├── tailwind.config.ts           # Configuração Tailwind CSS
├── vite.config.ts               # Configuração Vite
├── postcss.config.js            # Configuração PostCSS
├── components.json              # Configuração shadcn/ui
├── drizzle.config.ts            # Configuração Drizzle ORM
├── replit.md                    # Documentação técnica interna
│
├── server/                      # Backend Express.js
│   ├── index.ts                 # Entrada principal do servidor
│   ├── routes.ts                # Definição das rotas da API
│   ├── storage.ts               # Camada de persistência em memória
│   └── vite.ts                  # Configuração Vite para o servidor
│
├── shared/                      # Código compartilhado
│   └── schema.ts                # Schemas Zod e tipos TypeScript
│
├── client/                      # Frontend React
│   ├── index.html               # HTML base
│   ├── src/
│   │   ├── main.tsx             # Entrada principal React
│   │   ├── App.tsx              # Componente raiz
│   │   ├── index.css            # Estilos globais e variáveis CSS
│   │   │
│   │   ├── pages/               # Páginas da aplicação
│   │   │   ├── home.tsx         # Página principal
│   │   │   └── not-found.tsx    # Página 404
│   │   │
│   │   ├── components/          # Componentes customizados
│   │   │   ├── api-tester.tsx   # Interface para testar API
│   │   │   ├── task-form.tsx    # Formulário de tarefas
│   │   │   ├── task-list.tsx    # Lista e estatísticas
│   │   │   ├── toast.tsx        # Notificações
│   │   │   │
│   │   │   └── ui/              # Componentes shadcn/ui
│   │   │       ├── button.tsx
│   │   │       ├── input.tsx
│   │   │       ├── textarea.tsx
│   │   │       ├── select.tsx
│   │   │       ├── card.tsx
│   │   │       ├── label.tsx
│   │   │       ├── form.tsx
│   │   │       └── ... (outros componentes UI)
│   │   │
│   │   ├── hooks/               # Custom hooks
│   │   │   ├── use-toast.ts     # Hook para notificações
│   │   │   └── use-mobile.tsx   # Hook para detecção mobile
│   │   │
│   │   └── lib/                 # Utilitários
│   │       ├── utils.ts         # Funções utilitárias
│   │       └── queryClient.ts   # Configuração TanStack Query
│   │
│   └── attached_assets/         # Assets anexados (não incluir no git)
```

## Arquivos Essenciais para Funcionalidade

### Backend (server/)
- **index.ts**: Servidor Express principal
- **routes.ts**: Todas as rotas da API (/api/tarefas)
- **storage.ts**: Implementação de armazenamento em memória
- **vite.ts**: Configuração para servir frontend

### Frontend (client/src/)
- **App.tsx**: Roteamento e estrutura principal
- **pages/home.tsx**: Página principal com dashboard
- **components/api-tester.tsx**: Interface para testar todos endpoints
- **components/task-list.tsx**: Dashboard com estatísticas
- **components/toast.tsx**: Sistema de notificações

### Compartilhado (shared/)
- **schema.ts**: Schemas Zod e tipos TypeScript

## Configurações Importantes

### package.json
```json
{
  "name": "api-tarefas",
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "npm run build:client && npm run build:server",
    "build:client": "vite build --outDir dist/public",
    "build:server": "esbuild server/index.ts --bundle --platform=node --outfile=dist/index.js",
    "preview": "node dist/index.js",
    "db:push": "drizzle-kit push"
  }
}
```

### tsconfig.json
- Configuração TypeScript para frontend e backend
- Aliases para imports limpos (@/, @shared/)

### Dependências Principais
- **Express.js**: Framework web
- **React 18**: Frontend framework
- **TypeScript**: Tipagem estática
- **Zod**: Validação de schemas
- **TanStack Query**: Estado do servidor
- **Tailwind CSS**: Estilização
- **Radix UI**: Componentes acessíveis

## Como Usar no GitHub

1. **Clone/Download**: Todos os arquivos listados acima
2. **Instalar dependências**: `npm install`
3. **Executar**: `npm run dev`
4. **Build**: `npm run build`

## Funcionalidades Implementadas

✅ **CRUD Completo**
- POST /api/tarefas (criar)
- GET /api/tarefas (listar/filtrar)
- GET /api/tarefas/:id (buscar)
- PUT /api/tarefas/:id (atualizar)
- DELETE /api/tarefas/:id (excluir)

✅ **Validação de Dados**
- Schemas Zod para entrada/saída
- Validação de tipos TypeScript
- Tratamento de erros HTTP

✅ **Interface Completa**
- Testador de API interativo
- Dashboard com estatísticas
- Formulários de criação/edição
- Sistema de notificações

✅ **Arquitetura Robusta**
- Separação frontend/backend
- Tipagem compartilhada
- Código modular e reutilizável
- Configuração para produção

## Próximos Passos Sugeridos

- Implementar persistência com banco de dados
- Adicionar autenticação/autorização
- Implementar testes automatizados
- Adicionar paginação
- Deploy em produção