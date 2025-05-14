import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  styled
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function TaskList({ tasks, deleteTask, updateTask }) {
  const handleStatusChange = (taskId, e) => {
    const newStatus = e.target.value;
    updateTask(taskId, { status: newStatus });
  };

  const Wrapper = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '16px',
    gap: '16px',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
    },
    '@media (min-width: 600px)': {
      flexDirection: 'row',
    },
  });

  return (
    <Box maxWidth="md" mx="auto" p={4}>
      <Typography variant="h5" align="center" gutterBottom>
        Tasks
      </Typography>

      {/* Display message if no tasks available */}
      {tasks.length === 0 ? (
        <Typography variant="h6" color="textSecondary" textAlign="center" mt={3}>
          No Tasks Available
        </Typography>
      ) : (
        <Wrapper container spacing={3}>
          {tasks.map((task) => (
            <Grid item xs={12} key={task._id}>
              <Card elevation={3}>
                <CardContent>
                  {/* Centered Row layout: Title, Status, Delete */}
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexWrap="wrap"
                    gap={3}
                    mb={1}
                  >
                    {/* Title */}
                    <Typography variant="h6" sx={{ minWidth: '150px', textAlign: 'center' }}>
                      {task.title}
                    </Typography>

                    {/* Status Dropdown */}
                    <FormControl sx={{ minWidth: 160 }} size="small">
                      <InputLabel id={`status-label-${task._id}`}>Status</InputLabel>
                      <Select
                        labelId={`status-label-${task._id}`}
                        id={`status-${task._id}`}
                        value={task.status}
                        label="Status"
                        onChange={(e) => handleStatusChange(task._id, e)}
                      >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                      </Select>
                    </FormControl>

                    {/* Delete Button */}
                    <IconButton
                      color="error"
                      onClick={() => deleteTask(task._id)}
                      aria-label={`Delete task ${task.title}`}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>

                  {/* Optional: Task Description */}
                  {task.description && (
                    <Typography variant="body2" color="textSecondary" textAlign="center">
                      {task.description}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Wrapper>
      )}
    </Box>
  );
}

export default TaskList;
