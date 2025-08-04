# Notes App Frontend

A modern, responsive notes application built with React, Vite, and Tailwind CSS 4.

## Features

- 🔐 **JWT Authentication**: Secure login and registration
- 📝 **Full CRUD Operations**: Create, read, update, delete notes
- 🏷️ **Labels System**: Organize notes with custom colored labels
- 📌 **Pin & Archive**: Pin important notes, archive old ones
- 🎨 **Color Themes**: Choose colors for notes, supports dark/light mode
- 🔍 **Search & Filter**: Find notes quickly with search and filters
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- ⚡ **Fast Performance**: Built with Vite for instant HMR

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Context API** - State management
- **Axios** - HTTP client
- **Lucide React** - Modern icon library
- **React Hot Toast** - Toast notifications
- **date-fns** - Date formatting

## Project Structure

```
notes-app-frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── NoteCard.jsx
│   │   └── ...
│   ├── contexts/           # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── NotesContext.jsx
│   │   └── ThemeContext.jsx
│   ├── pages/              # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── ...
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Installation

1. Clone the repository and navigate to the frontend directory

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (optional):
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Key Features Implementation

### Authentication Flow
- JWT tokens stored in localStorage
- Automatic token injection in API requests
- Protected routes with PrivateRoute component
- Auto-logout on 401 responses

### State Management
- **AuthContext**: User authentication state
- **NotesContext**: Notes and labels data
- **ThemeContext**: Dark/light mode toggle

### Component Architecture
- Reusable UI components (Button, Input, Modal, etc.)
- Smart containers handle business logic
- Dumb components for presentation
- Custom hooks for shared logic

### Responsive Design
- Mobile-first approach
- Collapsible sidebar on mobile
- Touch-friendly interactions
- Optimized for all screen sizes

## API Integration

The frontend expects the backend API to be running on `http://localhost:5000`. All API calls are proxied through Vite during development.

### API Endpoints Used:
- **Auth**: `/api/auth/*`
- **Notes**: `/api/notes/*`
- **Labels**: `/api/labels/*`

## Styling Guidelines

### Tailwind CSS 4 Features
- Uses the latest Tailwind CSS 4 alpha
- Custom color palette for brand consistency
- Dark mode support with `dark:` variants
- Custom animations for smooth UX

### Color Scheme
- Primary: Blue shades for actions
- Gray: Neutral UI elements
- Status colors: Green (success), Red (error), Yellow (warning)
- Note colors: 14 predefined colors for personalization

## Performance Optimizations

- Lazy loading for routes
- Debounced search input
- Optimistic UI updates
- Efficient re-renders with proper state management
- Image optimization (when implemented)

## Security Best Practices

- JWT tokens never exposed in URLs
- XSS protection with proper data sanitization
- CORS configured for API requests
- Secure password requirements
- Auto-logout on token expiration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Contributing Guidelines

1. Follow the existing code structure
2. Use meaningful component and variable names
3. Add PropTypes or TypeScript (future enhancement)
4. Write reusable components
5. Test on multiple screen sizes
6. Ensure dark mode compatibility

## Future Enhancements

- [ ] Drag and drop note reordering
- [ ] Rich text editor for notes
- [ ] Note sharing functionality
- [ ] Offline support with service workers
- [ ] Real-time collaboration
- [ ] File attachments
- [ ] Note templates
- [ ] Export notes (PDF, Markdown)
- [ ] Keyboard shortcuts
- [ ] PWA support

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend is running on port 5000
   - Check Vite proxy configuration

2. **Authentication Issues**
   - Clear localStorage and re-login
   - Check token expiration

3. **Styling Issues**
   - Ensure Tailwind CSS 4 is properly installed
   - Check PostCSS configuration

4. **Build Errors**
   - Delete node_modules and reinstall
   - Check for version conflicts

## License

MIT License - Feel free to use this project for personal or commercial purposes.