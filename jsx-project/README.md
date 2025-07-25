# Admin Dashboard - React JSX with Bootstrap

A professional React admin dashboard with complete menu management functionality built with React JSX, React Bootstrap, Express.js, and core CSS.

## Features

- **Professional Admin Layout**: Clean sidebar navigation and top navbar using React Bootstrap
- **Dashboard**: Statistics cards and quick action tiles
- **Menu Management**: Complete CRUD operations for navigation menus
- **Data Table**: Advanced table with search, filtering, and pagination using Bootstrap Table
- **Form Management**: Add/edit forms with validation using React Hook Form
- **Responsive Design**: Works on all device sizes with Bootstrap responsive classes
- **Modern UI**: Built with React Bootstrap components and custom CSS

## Tech Stack

### Frontend
- **React 18** with JSX (no TypeScript)
- **React Bootstrap** for UI components
- **Wouter** for routing
- **TanStack Query** for server state management
- **React Hook Form** with Zod validation
- **Bootstrap 5** for styling
- **Custom CSS** for additional styling
- **Vite** for build tooling

### Backend
- **Express.js** with JavaScript
- **Drizzle ORM** for database operations
- **Zod** for data validation
- **In-memory storage** (easily replaceable with PostgreSQL)

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── layout/     # Layout components (Sidebar, Navbar)
│   │   │   ├── AddMenuForm.jsx
│   │   │   └── MenuDataTable.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── MenuList.jsx
│   │   │   ├── AddMenu.jsx
│   │   │   └── not-found.jsx
│   │   ├── lib/            # Utility functions and configurations
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css       # Custom CSS with Bootstrap integration
│   └── index.html
├── server/                 # Backend Express application
│   ├── index.js           # Server entry point
│   ├── routes.js          # API route definitions
│   ├── storage.js         # Data access layer
│   └── vite.js            # Development server integration
├── shared/                # Shared schemas and types
│   └── schema.js          # Database schema and validation
├── package.json
├── vite.config.js
└── README.md
```

## Key Features

### React Bootstrap Components Used
- **Container, Row, Col**: For responsive grid layout
- **Card**: For dashboard cards and content containers
- **Table**: For data display with responsive features
- **Form**: For form components with validation
- **Button**: For actions and navigation
- **Alert**: For success/error messages
- **Modal**: For delete confirmations
- **Navbar, Nav**: For navigation components
- **Badge**: For status indicators
- **Spinner**: For loading states

### Custom CSS Features
- **Professional Color Scheme**: Teal primary color with Bootstrap integration
- **Custom Variables**: CSS custom properties for consistent theming
- **Animations**: Fade-in and slide-in effects
- **Responsive Design**: Mobile-first approach with custom breakpoints
- **Custom Components**: Enhanced styling for dashboard cards, tables, and forms

### Form Management
- **React Hook Form**: Performant form handling without controlled components
- **Zod Validation**: Schema-based validation for forms and API
- **Bootstrap Form Components**: Styled form controls with validation feedback
- **Switch Components**: Toggle switches for boolean values
- **Select Dropdowns**: For parent menu selection and filtering

### Data Management
- **TanStack Query**: Server state management with caching
- **RESTful API**: Clean API design with proper HTTP methods
- **In-memory Storage**: Development-friendly data persistence
- **Zod Validation**: Request/response validation
- **Error Handling**: Proper error messages and user feedback

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd admin-dashboard-jsx
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5000`

### Building for Production

```bash
npm run build
npm start
```

## Development Features

- **Hot Module Replacement**: Instant updates during development
- **No TypeScript**: Pure JavaScript with JSX for simplicity
- **ESLint & Prettier**: Code formatting and linting
- **Responsive Design**: Mobile-first approach with Bootstrap

## Styling Guide

### Color Scheme
- **Primary**: `#1f8b8f` (Teal)
- **Secondary**: `#f8f9fa` (Light Gray)
- **Success**: `#28a745` (Green)
- **Warning**: `#ffc107` (Yellow)
- **Danger**: `#dc3545` (Red)

### Custom CSS Classes
- `.dashboard-card`: Enhanced card styling with hover effects
- `.form-container`: Styled form containers
- `.table-container`: Enhanced table styling
- `.status-badge`: Custom status indicators
- `.fade-in`, `.slide-in`: Animation classes

## API Endpoints

- `GET /api/menu-items` - Get all menu items
- `GET /api/menu-items/:id` - Get single menu item
- `POST /api/menu-items` - Create new menu item
- `PUT /api/menu-items/:id` - Update menu item
- `DELETE /api/menu-items/:id` - Delete menu item

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.