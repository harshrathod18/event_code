# Admin Panel Application

## Overview

This is a modern full-stack admin panel application built with React, Express.js, and PostgreSQL. The application provides a menu management system with a clean, responsive interface using shadcn/ui components and Tailwind CSS. It follows a monorepo structure with shared types and schemas between frontend and backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom configuration

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL (configured for Neon Database)
- **Validation**: Zod schemas shared between frontend and backend
- **Development**: Hot reloading with custom Vite integration

### Project Structure
```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions and configurations
├── server/                 # Backend Express application
│   ├── routes.ts           # API route definitions
│   ├── storage.ts          # Data access layer
│   └── vite.ts             # Development server integration
├── shared/                 # Shared types and schemas
│   └── schema.ts           # Database schema and validation
└── migrations/             # Database migration files
```

## Key Components

### Database Schema
- **Users Table**: Basic user authentication with username/password
- **Menu Items Table**: Navigation menu management with hierarchical structure
  - Supports parent-child relationships for submenus
  - Configurable ordering, status, and icons
  - Optional image URLs for enhanced menu items

### API Layer
- RESTful API endpoints for menu CRUD operations
- Zod validation for request/response data
- Error handling with appropriate HTTP status codes
- Request logging middleware for development

### Frontend Components
- **AdminLayout**: Main layout with sidebar navigation and top navbar
- **MenuDataTable**: Data table with search, filtering, and pagination
- **AddMenuForm**: Form component for creating/editing menu items
- **UI Components**: Complete set of shadcn/ui components for consistent design

### Data Storage
- **Production**: PostgreSQL with Drizzle ORM
- **Development**: In-memory storage with sample data
- **Type Safety**: Shared TypeScript types between frontend and backend

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **API Processing**: Express routes validate requests and interact with storage layer
3. **Database Operations**: Drizzle ORM handles database queries and type safety
4. **Response Handling**: Data is validated and transformed before sending to client
5. **UI Updates**: TanStack Query manages cache updates and re-renders

## External Dependencies

### Core Technologies
- **@neondatabase/serverless**: PostgreSQL connection for serverless environments
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@radix-ui**: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Type safety across the entire application
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Replit-specific development features

### Form and Validation
- **react-hook-form**: Performant form handling
- **zod**: Schema validation for TypeScript
- **@hookform/resolvers**: Integration between React Hook Form and Zod

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React app to static files in `dist/public`
2. **Backend Build**: esbuild bundles Express server to `dist/index.js`
3. **Database Setup**: Drizzle migrations ensure schema is up-to-date

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment mode (development/production)
- **REPL_ID**: Replit-specific deployment identifier

### Development vs Production
- **Development**: Uses Vite dev server with HMR and in-memory storage
- **Production**: Serves static files from Express with PostgreSQL database
- **Database**: Development can use memory storage, production requires PostgreSQL

### Scalability Considerations
- Stateless Express server design supports horizontal scaling
- Database queries are optimized with proper indexing
- Static asset serving can be offloaded to CDN
- Component-based architecture allows for easy feature additions