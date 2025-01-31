'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function TaskEdit(): React.JSX.Element {
  const { id } = useParams(); // Get the dynamic ID
  const router = useRouter();

  const [task, setTask] = React.useState<{ title: string; description: string } | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (id) {
      // Fetch task details by ID
      axios
        .get(`https://your-api-endpoint.com/tasks/${id}`)
        .then((response) => {
          setTask(response.data);
        })
        .catch((error) => {
          console.error('Failed to fetch task:', error);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSave = () => {
    if (task) {
      // Save the updated task
      axios
        .put(`https://your-api-endpoint.com/tasks/${id}`, task)
        .then(() => {
          alert('Task updated successfully');
          router.push('/dashboard/task'); // Redirect after saving
        })
        .catch((error) => {
          console.error('Failed to update task:', error);
        });
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Stack spacing={3} sx={{ width: '50%', margin: 'auto', marginTop: '3rem' }}>
      <Typography variant="h4">Edit Task</Typography>
      <TextField
        label="Title"
        value={task?.title || ''}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />
      <TextField
        label="Description"
        value={task?.description || ''}
        multiline
        rows={4}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />
      <Button variant="contained" onClick={handleSave} sx={{ alignSelf: 'flex-end' }}>
        Save
      </Button>
    </Stack>
  );
}
