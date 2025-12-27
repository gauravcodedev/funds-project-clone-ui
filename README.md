# Funds Project UI

A modern React application built with Vite and Material-UI (MUI) for personal details setup form.

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
funds-project-ui/
├── src/
│   ├── App.jsx                    # Main App component
│   ├── components/
│   │   └── SetupProfile.jsx        # Personal details form component
│   ├── main.jsx                    # Application entry point
│   └── index.css                   # Global styles
├── index.html                      # HTML template
├── vite.config.js                  # Vite configuration
└── package.json                    # Project dependencies
```

## Technologies

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Material-UI (MUI)** - React component library
- **Emotion** - CSS-in-JS library (required by MUI)
- **ESLint** - Code linting

## Production Build

To build for production:

```bash
npm run build
```

The production build will be created in the `dist` directory. The build is optimized with:
- Code minification
- Tree shaking
- Code splitting (vendor and MUI chunks)
- Asset optimization

## Development

The project uses Vite for fast development with Hot Module Replacement (HMR). Any changes you make to the code will be reflected immediately in the browser.

## Features

- Personal information form with validation
- Responsive design
- Material-UI components
- Form state management
- Clean and modern UI

