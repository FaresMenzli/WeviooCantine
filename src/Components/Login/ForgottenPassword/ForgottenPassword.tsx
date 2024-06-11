import React, { useState } from 'react';
import axios from 'axios';

import { Alert, Box, Button, ButtonProps, Container, CssBaseline, TextField, Typography, styled } from '@mui/material';
import { useBackendUrl } from '../../../Contexts/BackendUrlContext';
import { orange, purple } from '@mui/material/colors';

const ForgottenPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { backendUrl } = useBackendUrl();

    const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    
      backgroundColor: orange[500],
      "&:hover": {
        backgroundColor: orange[700],
      },
    }));
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      try {
        await axios.post(backendUrl+'/api/forgot-password', { email });
        setSuccessMessage('Password reset link sent to your email.');
        setErrorMessage('');
      } catch (error) {
        setErrorMessage('There was an error sending the password reset email.');
        setSuccessMessage('');
      }
    };
  
    return (
      <div className='bg'  >
        <CssBaseline />
        <Box
          sx={{
            paddingTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className='bg-body-tertiary p-5 rounded-4 mt-5 w-25'>
          <Typography component="h1" className='text-center' variant="h5">
            Enter your E-mail
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <ColorButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </ColorButton>
          </Box>
          </div>
        </Box>
      </div>
    );
  };
  

export default ForgottenPassword;
