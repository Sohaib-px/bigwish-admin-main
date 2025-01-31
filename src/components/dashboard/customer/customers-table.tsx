'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import { useSelection } from '@/hooks/use-selection';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  address: string;
  phone: string;
  createdAt: Date;
};

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: User[];
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  rowsPerPage?: number;
}

export function CustomersTable({
   count = 0,
   rows = [],
   page = 0,
   rowsPerPage = 0,
   onPageChange = (page: number) => {},
   onRowsPerPageChange = (rowsPerPage: number) => {},
 }: CustomersTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((customer) => customer.id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedUsers, setSelectedUsers] = React.useState<User[]>([]);

  const handleDelete = () => {
    // Handle delete logic here
    setOpenDialog(false);
    deselectAll();
  };

  React.useEffect(() => {
    setSelectedUsers(rows.filter((row) => selected?.has(row.id)));
  }, [selected, rows]);

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Signed Up</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.id);

              return (
                <TableRow hover key={row.id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(row.id);
                        } else {
                          deselectOne(row.id);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Typography variant="subtitle2">{row.firstName} {row.lastName}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{dayjs(row.createdAt).format('MMM D, YYYY')}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={(event, page) => { onPageChange(page); }}
        onRowsPerPageChange={(event) => {
          const rowsPerPage = parseInt(event.target.value, 10);
          onRowsPerPageChange(rowsPerPage);
        }}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 25]}
      />
      {/* Delete Button */}
      {selectedSome && (
        <Box sx={{ padding: 2 }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpenDialog(true)}
          >
            Delete Selected
          </Button>
        </Box>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {selectedUsers.length} user(s)?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
