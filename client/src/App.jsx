import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthForm from './components/AuthForm';
import ProjectList from './components/ProjectList';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const API_BASE = 'http://localhost:5000/api';

function App() {
  const [token, setToken] = useState('');
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');

  const fetchProjects = async () => {
    const res = await axios.get(`${API_BASE}/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProjects(res.data);
  };

  const fetchTasks = async (projectId) => {
    const res = await axios.get(`${API_BASE}/tasks/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  useEffect(() => {
    if (token) {
      fetchProjects();
    }
  }, [token]);

  return (
    <Router>
      <div className="App">
        {!token ? (
          <AuthForm setToken={setToken} />
        ) : (
          <AuthenticatedRoutes
            token={token}
            setToken={setToken}
            projects={projects}
            setProjects={setProjects}
            selectedProjectId={selectedProjectId}
            setSelectedProjectId={setSelectedProjectId}
            tasks={tasks}
            fetchTasks={fetchTasks}
            setTasks={setTasks}
          />
        )}
      </div>
    </Router>
  );
}

function AuthenticatedRoutes({
  token,
  setToken,
  projects,
  setProjects,
  selectedProjectId,
  setSelectedProjectId,
  tasks,
  fetchTasks,
  setTasks,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken('');
    setProjects([]);
    setTasks([]);
    setSelectedProjectId('');
    navigate('/');
  };

  return (
    <div style={{ backgroundColor: 'rgb(240, 240, 240)', minHeight: '100vh' }}>
      {/* Logout button only */}
      <div style={{ textAlign: 'right', padding: '10px' }}>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: 'black',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            height: '40px',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s',
            marginRight: '20px',
            marginTop: '20px',
            
          }}
        >
          Logout
        </button>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/projects" />} />

        <Route
          path="/projects"
          element={
            <div style={{ padding: '20px' }}>
              <h2>Project Management</h2>
              <ProjectList
                projects={projects}
                setProjects={setProjects}
                setSelectedProjectId={setSelectedProjectId}
                fetchTasks={fetchTasks}
                token={token}
              />
            </div>
          }
        />

        <Route
          path="/tasks"
          element={
            <div style={{ padding: '20px' }}>
              <h2>Task Management</h2>
              <TaskForm
                token={token}
                fetchTasks={fetchTasks}
                selectedProjectId={selectedProjectId}
              />
              <TaskList
                tasks={tasks}
                deleteTask={async (taskId) => {
                  await axios.delete(`${API_BASE}/tasks/${taskId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  fetchTasks(selectedProjectId);
                }}
                updateTask={async (taskId, updatedData) => {
                  await axios.put(`${API_BASE}/tasks/${taskId}`, updatedData, {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  fetchTasks(selectedProjectId);
                }}
              />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
