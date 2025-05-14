# MERN Task Tracker Application

## Project Overview
This is a full-stack MERN (MongoDB, Express, React, Node.js) task tracker application that allows users to register, authenticate, manage projects, and track tasks within those projects. The backend provides a RESTful API, while the frontend is a React application built with Vite.

## Technologies Used
- **Backend:** Node.js, Express, MongoDB, Mongoose, dotenv, CORS
- **Frontend:** React, React Router, Axios, Vite, Tailwind CSS, Material UI
- **Others:** JWT for authentication, ESLint for linting

## Folder Structure
- `server/` - Backend API server
  - `controllers/` - Route controllers for auth, projects, and tasks
  - `middleware/` - Authentication middleware
  - `models/` - Mongoose models for User, Project, and Task
  - `routes/` - API route definitions
  - `server.js` - Express server entry point
  - `.env` - Environment variables for server (not included in repo)
- `client/` - Frontend React application
  - `src/` - React components and app logic
  - `public/` - Static assets
  - `index.html` - Main HTML file
  - `package.json` - Frontend dependencies and scripts

## Installation

### Prerequisites
- Node.js and npm installed
- MongoDB instance (local or cloud)

### Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`.

### Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The React app will be available at `http://localhost:3000` (or the port Vite assigns).

## Usage
- Register or log in via the frontend.
- Create and manage projects.
- Add, update, and delete tasks within projects.
- Logout when finished.

## API Endpoints (Backend)
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/projects` - Get all projects for authenticated user
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project
- `GET /api/tasks/:projectId` - Get tasks for a project
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task


## Environment Variables
- `MONGO_URI` - MongoDB connection string for the backend.
- `PORT` - Port for the backend server (default 5000).

## License
This project is open source and available under the MIT License.

---

Thank you for using the MERN Task Tracker Application!
