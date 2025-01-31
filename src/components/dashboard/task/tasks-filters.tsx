import * as React from 'react';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from 'next/link'; // Import Link from next/link

export function TasksFilters(): React.JSX.Element {
  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ padding: 2, display: 'flex', justifyContent: 'space-between' }}>
        <OutlinedInput
          defaultValue=""
          fullWidth
          placeholder="Search task"
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
            </InputAdornment>
          }
          sx={{ maxWidth: '500px' }}
        />

        <Link href="/dashboard/task-create" passHref>
          <Button variant="contained" color="primary">
            Create Task
          </Button>
        </Link>
      </Box>
    </Card>
  );
}
