import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  Stack,
} from '@mui/material';

const API_BASE = 'http://localhost:5000/api';

function TaskForm({ token, selectedProjectId, fetchTasks }) {
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    status: 'Pending',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      API_BASE + '/tasks',
      { ...taskForm, project: selectedProjectId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (res.status === 201) {
      fetchTasks(selectedProjectId);
      setTaskForm({ title: '', description: '', status: 'Pending' });
    }
  };

  return (
    <Box maxWidth="sm" mx="auto" component={Paper} elevation={4} p={4} mt={4}>
      <Typography variant="h5" align="center" gutterBottom>
        Create Task
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Title"
            value={taskForm.title}
            onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
            fullWidth
            required
          />
          <TextField
            label="Description"
            value={taskForm.description}
            onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
            multiline
            rows={3}
            fullWidth
            required
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={taskForm.status}
              label="Status"
              onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Task
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default TaskForm;
