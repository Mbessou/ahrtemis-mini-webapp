import { useEffect, useState } from 'react'
import './App.css'
import ContactTable from './components/ContactTable'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ContactDialog from './components/ContactDialog';
import * as React from 'react';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Contact } from './models/contact';
import * as contactService from './services/contacts';

const Alert = React.forwardRef(function Alert(props: any, ref: React.ForwardedRef<HTMLInputElement> | null): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const [open, setOpen] = useState<Boolean>(false);
  const [rows, setRows] = useState<Contact[]>([]);
  const [dialogType, setDialogType] = useState<String>('create');
  const [contact, setContact] = useState<Contact | null>(null);
  const [openSnackbar, setOpenSnackBar] = useState<Boolean>(false);
  const [snackbarInfo, setSnackbarInfo] = useState<{ text: string, status?: string }>({ text: '', status: '' });

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = (): void => {
    contactService.getAll()
      .then((res: any) => {
        console.log('getAll new', res.data.contacts)
        setRows(res.data.contacts)
      })
      .catch((error: any) => {
        console.error(error)
      })
  }

  const handleClickOpen = (): void => {
    setDialogType('create');
    setContact(null);
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const showError = (text: string): void => {
    setSnackbarInfo({ text: text, status: "error" });
    setOpenSnackBar(true);
  };

  const showSuccess = (text: string): void => {
    setSnackbarInfo({ text: text, status: "success" });
    setOpenSnackBar(true);
  };

  const handleSnackbarClose = (): void => {
    setSnackbarInfo({ text: "" });
    setOpenSnackBar(false);
  };

  const handleRowClick = (contactToUpdate: Contact): void => {
    console.log('contactToUpdate', contactToUpdate)
    setContact(contactToUpdate);
    setDialogType('modify');
    setOpen(true);
  }

  const onValidate = (success: boolean): void => {
    if (success) {
      fetchContacts()
      showSuccess(dialogType === 'create' ? 'Le contact a bien été créé' : 'Le contact a bien été modifié');
    } else {
      showError(dialogType === 'create' ? 'La création du contact a échoué' : 'La modification du contact a échoué');
    }
    setContact(null);
    setOpen(false);
  };

  const onDelete = (success: boolean): void => {
    if (success) {
      fetchContacts()
      showSuccess('Le contact a bien été supprimé');
    } else {
      showError('La suppression du contact a échoué');
    }
    setContact(null);
    setOpen(false);
  };

  return (
    <>
      <Stack spacing={2} alignItems="flex-start">
        <Button variant="contained" onClick={handleClickOpen}>
          Créer un contact
        </Button>
        <ContactTable onRowClick={handleRowClick} rows={rows}></ContactTable>
        <ContactDialog open={open} onClose={handleClose} create={dialogType === 'create'} onValidate={onValidate} baseContact={contact} onDelete={onDelete} />
      </Stack>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar}
        onClose={handleSnackbarClose}
        autoHideDuration={4000}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarInfo.status}
          sx={{ width: "100%" }}
        >
          {snackbarInfo.text}
        </Alert>
      </Snackbar>
    </>
  )
}

export default App
