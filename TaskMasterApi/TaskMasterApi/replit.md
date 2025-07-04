# Task Management API

## Overview

This is a full-stack task management application built with a React frontend and Express.js backend. The application provides a RESTful API for creating, reading, updating, and deleting tasks, with support for filtering tasks by status. The frontend includes an interactive API tester interface and a task management dashboard.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Components**: Radix UI primitives with shadcn/ui styling system
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Data Storage**: In-memory storage implementation with interface for future database integration
- **API Design**: RESTful endpoints following Portuguese naming conventions
- **Validation**: Zod schemas for request/response validation
- **Session Management**: Express sessions with PostgreSQL store configuration

### Database Schema
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Tables**: 
  - `users`: User authentication (id, username, password)
  - `tasks`: Task management (id, titulo, descricao, status, data_vencimento)
- **Status Types**: "pendente", "realizando", "concluída"
- **Migration**: Drizzle Kit for schema migrations

## Key Components

### API Endpoints
- `POST /api/tarefas` - Create new task
- `GET /api/tarefas` - List all tasks (with optional status filter)
- `GET /api/tarefas/:id` - Get task by ID
- `PUT /api/tarefas/:id` - Update existing task
- `DELETE /api/tarefas/:id` - Delete task

### Frontend Components
- **ApiTester**: Interactive API testing interface with tabs for each endpoint
- **TaskForm**: Reusable form component for creating/editing tasks
- **TasksList**: Dashboard view with statistics and recent tasks
- **Toast**: Custom notification system for user feedback

### Data Models
- **Task**: Core entity with title, description, status, and due date
- **User**: Authentication entity (configured but not actively used)
- **Validation**: Zod schemas ensure data integrity across client/server boundary

## Data Flow

1. **Client Request**: Frontend components use TanStack Query to make API calls
2. **API Layer**: Express routes handle requests and validate with Zod schemas
3. **Storage Layer**: Memory storage implements IStorage interface for data operations
4. **Response**: JSON responses sent back to client with proper error handling
5. **UI Update**: React Query automatically updates UI components with fresh data

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL driver for Neon database
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI component primitives
- **zod**: Runtime type validation and schema definition

### Development Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development
- **Frontend**: Vite dev server with HMR on client directory
- **Backend**: tsx for TypeScript execution with automatic restart
- **Database**: Environment variable `DATABASE_URL` for connection

### Production
- **Build Process**: 
  1. Vite builds frontend to `dist/public`
  2. ESBuild bundles backend to `dist/index.js`
- **Server**: Single Node.js process serves both API and static files
- **Database**: PostgreSQL via Drizzle ORM with migrations

### Environment Setup
- **Database**: Requires `DATABASE_URL` environment variable
- **Sessions**: Configured for PostgreSQL session store
- **Static Files**: Production serves built frontend from `/dist/public`

## Changelog

```
Changelog:
- July 04, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```