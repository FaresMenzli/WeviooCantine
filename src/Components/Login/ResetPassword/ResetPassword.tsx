import React, { useState, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, styled, ButtonProps } from '@mui/material';
import './ResetPassword.css'
import { orange, purple } from '@mui/material/colors';
interface ResetPasswordParams {
  token: string;
}

const ResetPassword: React.FC = () => {
  const { token } = useParams<keyof ResetPasswordParams>() as ResetPasswordParams;
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
   
    backgroundColor: orange[500],
    "&:hover": {
      backgroundColor: orange[700],
    },
  }));
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handlePasswordReset = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/reset-password', { token, password });
      if (response.status === 200) {
        setSuccess('Password reset successfully');
        navigate('/login');
      }
    } catch (err) {
      setError('Failed to reset password');
    }
  };

  return (
    <div className='bg'>
         <div className='bg-body-tertiary p-5 rounded-4 w-25 mx-auto position-relative top-7'>
      <Box mt={5}>
        <Typography className='text-center' variant="h4" gutterBottom>Reset Password</Typography>
        <TextField
          fullWidth
          label="New Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={handlePasswordChange}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">{success}</Typography>}
        <ColorButton
        className='mt-3'
          fullWidth
          variant="contained"
          color="primary"
          onClick={handlePasswordReset}
        >
          Reset Password
        </ColorButton>
      </Box>
      </div>
    </div>
  );
};

export default ResetPassword;
