'use client';
import { useEffect, useState } from 'react';
import { Stack, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl, FormHelperText } from '@mui/material';
import axios from 'axios';

export default function Page(): React.JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [helperId, setHelperId] = useState<string>('');
  const [taskDate, setTaskDate] = useState<string>('');
  const [taskTime, setTaskTime] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [lat, setLat] = useState<string>('50.000000');
  const [lon, setLon] = useState<string>('-85.000000');
  const [duration, setDuration] = useState<string>('');
  const [errors, setErrors] = useState<{
    helperId?: string;
    taskDate?: string;
    taskTime?: string;
    description?: string;
    address?: string;
    lat?: string;
    lon?: string;
    duration?: string;
  }>({});

  useEffect(() => {
    // Fetch users for dropdown (helperId)
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('custom-auth-token');
        const response = await axios.get<UserResponse>(
          'https://drdc-api-717c5d9fc784.herokuapp.com/api/users',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data.data); // Store users in state
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);



  const handleSubmit = () => {

    const newErrors:any = {};

    if (!helperId) newErrors.helperId = 'Helper is required';
    if (!taskDate) newErrors.taskDate = 'Task Date is required';
    if (!taskTime) newErrors.taskTime = 'Task Time is required';
    if (!description) newErrors.description = 'Description is required';
    if (!address) newErrors.address = 'Address is required';
    if (!lat || isNaN(parseFloat(lat))) newErrors.lat = 'Latitude is required and should be a valid number';
    if (!lon || isNaN(parseFloat(lon))) newErrors.lon = 'Longitude is required and should be a valid number';
    if (!duration) newErrors.duration = 'Duration is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const taskData = {
      helperId,
      taskDate,
      taskTime,
      description,
      address,
      lat,
      lon,
      duration,
    };
    console.log('Task Data:', taskData);
  };

  return (
    <Stack spacing={2} sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Create Task
      </Typography>

      <FormControl fullWidth variant="outlined">
        <InputLabel id="helperId-label">Select Helper</InputLabel>
        <Select
          labelId="helperId-label"
          value={helperId}
          onChange={(e) => setHelperId(e.target.value)}
          label="Select Helper"
        >
          {users
            .filter((user)=> user.role === 'helper')
            .map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.email}
              </MenuItem>
        ))}
        </Select>
        {errors.helperId && <FormHelperText>{errors.helperId}</FormHelperText>}
      </FormControl>

      <TextField
        // label="Task Date"
        variant="outlined"
        type="date"
        fullWidth
        value={taskDate}
        onChange={(e) => setTaskDate(e.target.value)}
        error={!!errors.taskDate}
        helperText={errors.taskDate}
      />
      <TextField
        // label="Task Time"
        variant="outlined"
        type="time"
        fullWidth
        value={taskTime}
        onChange={(e) => setTaskTime(e.target.value)}
        error={!!errors.taskTime}
        helperText={errors.taskTime}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={!!errors.description}
        helperText={errors.description}
      />
      <TextField
        label="Address"
        variant="outlined"
        fullWidth
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        error={!!errors.address}
        helperText={errors.address}
      />
      <TextField
        label="Latitude"
        variant="outlined"
        fullWidth
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        error={!!errors.lat}
        helperText={errors.lat}
      />
      <TextField
        label="Longitude"
        variant="outlined"
        fullWidth
        value={lon}
        onChange={(e) => setLon(e.target.value)}
        error={!!errors.lon}
        helperText={errors.lon}
      />
      <TextField
        label="Duration"
        variant="outlined"
        fullWidth
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        error={!!errors.duration}
        helperText={errors.duration}
      />

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Stack>
  );
}

type User = {
  id: string;
  name: string;
  role: string;
  email: string;
};

type UserResponse = {
  data: User[];
};
