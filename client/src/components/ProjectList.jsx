import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import {
  Box,
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
  Grid,
} from '@mui/material';

const ProjectList = ({ projects, setProjects, setSelectedProjectId, fetchTasks, token }) => {
  const [newProjectName, setNewProjectName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    if (!token) {
      console.error('No token provided');
      return;
    }
    try {
      const res = await api.get('/projects', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const createProject = async () => {
    if (!token) {
      console.error('No token provided');
      return;
    }
    try {
      await api.post(
        '/projects',
        { name: newProjectName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewProjectName('');
      fetchProjects();
    } catch (err) {
      console.error('Error creating project:', err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom textAlign="center" fontWeight={600} mb={2}>
          Your Projects
        </Typography>

        <Box display="flex" gap={2} mt={2}>
          <TextField
            fullWidth
            label="New Project Name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={createProject}
            disabled={!newProjectName.trim()}
          >
            Create
          </Button>
        </Box>

        {/* Display "No Projects Available" if there are no projects */}
        {projects.length === 0 ? (
          <Typography variant="body1" textAlign="center" mt={3}>
            No Projects Available
          </Typography>
        ) : (
          <List sx={{ mt: 3, borderRadius: 2, boxShadow: 1, bgcolor: 'background.paper' }}>
            {projects.map((project) => (
              <ListItem key={project._id} disablePadding>
                <ListItemButton
                  onClick={() => {
                    setSelectedProjectId(project._id);
                    fetchTasks(project._id);
                    navigate('/tasks');
                  }}
                  sx={{
                    px: 2,
                    py: 1.5,
                    '&:hover': {
                      bgcolor: 'primary.light',
                      color: 'white',
                      borderRadius: 2,
                    },
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: 'white',
                    },
                  }}
                >
                  <ListItemText
                    primary={project.name}
                    primaryTypographyProps={{
                      fontWeight: 500,
                      fontSize: '1rem',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default ProjectList;
