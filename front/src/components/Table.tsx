import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createFakeData(
  lastname: string,
  firstname: string,
  email: string,
  address: string,
  phoneNumber: string,
  age: number,
) {
  return { lastname, firstname, email, address, phoneNumber, age };
}

const rows = [
  createFakeData('Doe', 'John', 'john.doe@gmail.com', '123 rue de la vie', '0987654321', 21),
  createFakeData('Travis', 'Sarah', 'sarah.travis@gmail.com', '123 rue de la vie', '0987654321', 16),
  createFakeData('Serin', 'Michel', 'michel.serin@gmail.com', '123 rue de la vie', '0987654321', 45),
  createFakeData('Pontou', 'Martine', 'pontou.martine@gmail.com', '123 rue de la vie', '0987654321', 38),
];

export default function ContactTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="">Nom</TableCell>
            <TableCell align="">Prénom</TableCell>
            <TableCell align="">Email</TableCell>
            <TableCell align="">Adresse</TableCell>
            <TableCell align="">Téléphone</TableCell>
            <TableCell align="">Âge</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.lastname + row.firstname}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="">
                {row.lastname}
              </TableCell>
              <TableCell align="">{row.firstname}</TableCell>
              <TableCell align="">{row.email}</TableCell>
              <TableCell align="">{row.address}</TableCell>
              <TableCell align="">{row.phoneNumber}</TableCell>
              <TableCell align="">{row.age}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}