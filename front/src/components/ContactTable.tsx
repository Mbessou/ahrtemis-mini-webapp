import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { Contact } from '../models/contact';
import { collapseStr } from '../utils/transforms';

export default function ContactTable(props: { onRowClick: (contact: Contact) => void, rows: Contact[] }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Téléphone</TableCell>
              <TableCell>Âge</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.lastname + row.firstname}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, transition: 'all', transitionDuration: '300ms', cursor: 'pointer', ':hover': { backgroundColor: '#e2e2e2' } }}
                  onClick={() => props.onRowClick(row)}
                >
                  <TableCell>{row.lastname}</TableCell>
                  <TableCell>{row.firstname}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    {row.address.length > 20 ?
                      (<Tooltip title={row.address}>
                        {collapseStr(row.address)}
                      </Tooltip>)
                      : (row.address)}
                  </TableCell>
                  <TableCell>{row.phonenumber}</TableCell>
                  <TableCell>{row.age}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={props.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}