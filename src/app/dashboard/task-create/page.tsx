'use client';
import { useEffect } from 'react';
import { Stack, Typography, TextField, Button } from '@mui/material';

export default function Page(): React.JSX.Element {
  useEffect(() => {
    // Side effects or fetch calls
  }, []);

  return (
    <Stack spacing={2} sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Create Task
      </Typography>
      <TextField label="Task Title" variant="outlined" fullWidth />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
      />
      <Button variant="contained" color="primary">
        Submit
      </Button>
    </Stack>
  );
}
