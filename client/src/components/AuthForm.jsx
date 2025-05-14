import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  Link,
  Alert,
} from '@mui/material';

const API_BASE = 'http://localhost:5000/api';

function AuthForm({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password || (!isLogin && (!name || !country))) {
      setError('Please fill in all required fields.');
      return;
    }

    const endpoint = isLogin ? '/auth/login' : '/auth/signup';
    const payload = isLogin ? { email, password } : { email, password, name, country };

    try {
      const res = await axios.post(API_BASE + endpoint, payload);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        navigate('/projects');
      }
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component={Paper}
        elevation={6}
        sx={{
          mt: 8,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {isLogin ? 'Login' : 'Signup'}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
          {!isLogin && (
            <>
              <TextField
                margin="normal"
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </>
          )}

          <TextField
            margin="normal"
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary" // Uses theme.primary.main => black
            sx={{ mt: 3, py: 1.5 }}
          >
            {isLogin ? 'Login' : 'Signup'}
          </Button>


          <Box mt={2} textAlign="center">
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                setError('');
                setIsLogin(!isLogin);
              }}
            >
              {isLogin
                ? 'Need an account? Sign up'
                : 'Already have an account? Log in'}
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default AuthForm;
