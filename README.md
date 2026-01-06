## Project overview

This frontend application is the client-side interface for a personal media tracking platform that allows users to manage books, movies, and TV series they have consumed or plan to consume.

It is a real-world application actively used by multiple users and designed with a focus on clarity, performance, and maintainability.

## Key features

- User authentication with JWT
- Google Sign-In integration using Firebase
- Protected routes based on authentication state
- Centralized state management with Pinia
- REST API consumption via Axios
- User-specific dashboards and rankings
- Responsive UI built with Tailwind CSS

## Technical stack

- **Vue 3** with Composition API
- **Vite** for fast development and optimized builds
- **Vue Router** for client-side routing
- **Pinia** for global state management
- **Axios** for API communication
- **Firebase SDK** for Google authentication
- **Tailwind CSS** for styling
- **ESLint + Prettier** for code quality and formatting

## Architecture notes

- Authentication state is handled globally using Pinia
- JWT tokens are decoded client-side to manage user sessions
- Route guards prevent access to protected views
- API layer is centralized for easier maintenance and scalability


## Backend

This frontend consumes a Node.js + Express REST API.
The backend repository is available separately.

