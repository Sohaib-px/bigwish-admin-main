'use client'
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { logger } from '@/lib/default-logger';
import { Task, TasksTable } from '@/components/dashboard/task/tasks-table';
import { TasksFilters } from '@/components/dashboard/task/tasks-filters';

type TaskResponse = {
  data: Task[];
};

//export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {

  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [page, setPage]= React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
  const [paginatedTasks, setPaginatedTasks] = React.useState<Task[]> ([]);

  React.useEffect(() => {

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('custom-auth-token');
        const response = await axios.get<TaskResponse>(
          'https://drdc-api-717c5d9fc784.herokuapp.com/api/tasks',
        { headers:
          {'Authorization': `Bearer ${token}`}
        });
        let allTasks = response.data.data;
        setTasks(allTasks);
        setPaginatedTasks(applyPagination(allTasks, page, rowsPerPage))
      } catch (error) {
        logger.debug('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Customers</Typography>
        </Stack>
      </Stack>
      <TasksFilters />
      <TasksTable
        count={tasks.length}
        page={page}
        onPageChange={(page) => {
          setPage(page);
          setPaginatedTasks(applyPagination(tasks, page, rowsPerPage));
        }}
        onRowsPerPageChange={(rowsPerPage) => {
          setRowsPerPage(rowsPerPage);
          //setPage(0);
        }}
        rows={paginatedTasks}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: Task[], page: number, rowsPerPage: number): Task[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
