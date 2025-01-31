'use client'
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { User } from '@/components/dashboard/customer/customers-table';

// pages/index.tsx

import axios from 'axios';
import { logger } from '@/lib/default-logger';

type UserResponse = {
  data: User[];
};

//export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {

  const [users, setUsers] = React.useState<User[]>([]);
  const [page, setPage]= React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
  const [paginatedCustomers, setPaginatedCustomers] = React.useState<User[]> ([]);

  React.useEffect(() => {

    const fetchUsers = async () => {
      // const url = `${process.env.BASE_URL}`;
      // console.log(url);
      try {
        const token = localStorage.getItem('custom-auth-token');
        const response = await axios.get<UserResponse>(
          'https://drdc-api-717c5d9fc784.herokuapp.com/api/users',
        { headers:
          {'Authorization': `Bearer ${token}`}
        });
        let allUsers = response.data.data;
        setUsers(allUsers);
        setPaginatedCustomers(applyPagination(allUsers, page, rowsPerPage))
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
      <CustomersFilters />
      <CustomersTable
        count={users.length}
        page={page}
        onPageChange={(page) => {
          setPage(page);
          setPaginatedCustomers(applyPagination(users, page, rowsPerPage));
        }}
        onRowsPerPageChange={(rowsPerPage) => {
          setRowsPerPage(rowsPerPage);
          //setPage(0);
        }}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: User[], page: number, rowsPerPage: number): User[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
