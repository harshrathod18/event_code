# Admin Dashboard - React Menu Management System

A professional React admin dashboard with complete menu management functionality built with React, TypeScript, Express.js, and modern UI components.

## Features

- **Professional Admin Layout**: Clean sidebar navigation and top navbar
- **Dashboard**: Statistics cards and quick action tiles
- **Menu Management**: Complete CRUD operations for navigation menus
- **Data Table**: Advanced table with search, filtering, and pagination
- **Form Management**: Add/edit forms with validation
- **Responsive Design**: Works on all device sizes
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Wouter** for routing
- **TanStack Query** for server state management
- **React Hook Form** with Zod validation
- **shadcn/ui** components
- **Tailwind CSS** for styling
- **Vite** for build tooling

### Backend
- **Express.js** with TypeScript
- **Drizzle ORM** for database operations
- **Zod** for data validation
- **In-memory storage** (easily replaceable with PostgreSQL)

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/         # shadcn/ui components
│   │   │   ├── layout/     # Layout components (Sidebar, Navbar)
│   │   │   ├── AddMenuForm.tsx
│   │   │   └── MenuDataTable.tsx
│   │   ├── pages/          # Page components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── MenuList.tsx
│   │   │   ├── AddMenu.tsx
│   │   │   └── not-found.tsx
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   └── index.html
├── server/                 # Backend Express application
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Data access layer
│   └── vite.ts            # Development server integration
├── shared/                # Shared types and schemas
│   └── schema.ts          # Database schema and validation
└── Configuration files (package.json, tsconfig.json, etc.)
```

## Pages Included

### 1. Dashboard (`/dashboard`)
- Statistics cards showing system metrics
- Quick action tiles for common tasks
- Professional layout with responsive design

### 2. Menu List (`/menu-list`)
- Data table with all menu items
- Search and filter functionality
- Edit and delete actions
- Add new menu button
- Pagination support

### 3. Add/Edit Menu (`/add-menu`, `/menu-edit/:id`)
- Complete form for creating/editing menu items
- Parent menu selection dropdown
- Icon and link configuration
- Status toggles (Menu Status, Is Submenu, Page Status)
- Order number for menu positioning
- File upload placeholder for menu images

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5000`

## API Endpoints

- `GET /api/menu-items` - Get all menu items
- `GET /api/menu-items/:id` - Get specific menu item
- `POST /api/menu-items` - Create new menu item
- `PUT /api/menu-items/:id` - Update menu item
- `DELETE /api/menu-items/:id` - Delete menu item

## Database Schema

### Menu Items Table
- `id`: Primary key (UUID)
- `menuName`: Display name for the menu item
- `icon`: Icon identifier (e.g., 'home', 'users', 'settings')
- `menuLink`: URL path for the menu item
- `orderNo`: Sorting order number
- `parentMenuId`: Reference to parent menu for submenus
- `menuStatus`: Boolean - whether menu is active
- `isSubmenu`: Boolean - whether this is a submenu item
- `pageStatus`: Boolean - whether the page is active
- `imageUrl`: Optional image URL for menu item

## Key Components

### Layout Components
- **AdminLayout**: Main layout wrapper with sidebar and navbar
- **Sidebar**: Navigation sidebar with menu items and role sections
- **TopNavbar**: Header with user profile and actions

### Feature Components
- **MenuDataTable**: Advanced data table with search, filter, and actions
- **AddMenuForm**: Form component for creating/editing menu items

### UI Components
Complete set of shadcn/ui components including:
- Form controls (Input, Select, Switch, Button)
- Data display (Table, Card, Badge)
- Feedback (Toast, Alert)
- Navigation (Tabs, Dropdown)

## Styling

The application uses a professional color scheme:
- **Primary Color**: Teal (`hsl(187, 85%, 35%)`)
- **Background**: Light gray (`#f9fafb`)
- **Sidebar**: White with subtle shadows
- **Status Colors**: Green for active, Yellow for inactive

## Development Features

- **Hot Module Replacement**: Instant updates during development
- **TypeScript**: Full type safety across frontend and backend
- **ESLint & Prettier**: Code formatting and linting
- **Responsive Design**: Mobile-first approach

## Production Deployment

The application is configured for easy deployment on platforms like Replit, Vercel, or similar services. The build process creates optimized static files and a production-ready Express server.

## License

This project is provided as a complete admin dashboard solution with all pages and functionality included.