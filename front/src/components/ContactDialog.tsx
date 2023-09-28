import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as contactService from '../services/contacts';
import { Contact } from '../models/contact';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import '../assets/ContactDialog.css';
import { VALIDATE_EMAIL, VALIDATE_PHONENUMBER } from '../utils/validation';

export default function ContactDialog(props: { open: boolean, onClose: () => void, create: boolean, onValidate: (success: boolean) => void, onDelete: (success: boolean) => void, baseContact?: Contact }) {
    const [contact, setContact] = useState<Contact>(new Contact());
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const onDialogClose = (): void => {
        setConfirmDelete(false);
        props.onClose();
    }

    useEffect(() => {
        if (!props.create && props.baseContact) {
            console.log(props.baseContact)
            setContact(props.baseContact)
        } else {
            setContact(new Contact())
        }
    }, [props.open])

    const isValidData = (): boolean => {
        let res = true;
        let errorContact = { ...contact }
        if (!contact.email.length || !contact.email.match(VALIDATE_EMAIL)) {
            errorContact = { ...errorContact, errors: { ...errorContact.errors, email: true } }
            res = false
        }
        if (contact.phonenumber.length && !contact.phonenumber.match(VALIDATE_PHONENUMBER)) {
            errorContact = { ...errorContact, errors: { ...errorContact.errors, phonenumber: true } }
            res = false
        }
        if (!res) setContact(errorContact);
        return res
    }

    const createContact = (): void => {
        if (!isValidData()) return;
        contactService.create(contact)
            .then((res: any) => {
                console.log("success", res)
                props.onValidate(true)
            })
            .catch((error: any) => {
                console.log("error", error)
                props.onValidate(false)
            })
    }

    const updateContact = (): void => {
        if (!isValidData()) return;
        contactService.updateById(contact.id, contact)
            .then((res: any) => {
                console.log("success", res)
                props.onValidate(true)
            })
            .catch((error: any) => {
                console.log("error", error)
                props.onValidate(false)
            })
    }

    const deleteContact = (): void => {
        contactService.deleteById(contact.id)
            .then((res: any) => {
                console.log("success", res)
                props.onDelete(true)
            })
            .catch((error: any) => {
                console.log("error", error)
                props.onDelete(false)
            })
    }

    return (
        <>
            <Dialog open={props.open} onClose={onDialogClose} fullWidth={true} fullScreen={fullScreen} maxWidth={'md'}>
                <DialogTitle>Ajouter un contact</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} alignItems="flex-start">
                        <TextField
                            autoFocus
                            required
                            error={contact?.errors?.email}
                            helperText={contact?.errors?.email ? "L'email n'est pas valide" : ''}
                            value={contact.email}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setContact({ ...contact, email: event.target.value, errors: { ...contact.errors, email: false } });
                            }}
                            id="email"
                            label="Email"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            value={contact.firstname}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setContact({ ...contact, firstname: event.target.value, errors: { ...contact.errors, firstname: false } });
                            }}
                            id="firstname"
                            label="Prénom"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            value={contact.lastname}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setContact({ ...contact, lastname: event.target.value, errors: { ...contact.errors, lastname: false } });
                            }}
                            id="lastname"
                            label="Nom"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            value={contact.address}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setContact({ ...contact, address: event.target.value, errors: { ...contact.errors, address: false } });
                            }}
                            multiline
                            id="address"
                            label="Adresse"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            value={contact.phonenumber}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setContact({ ...contact, phonenumber: event.target.value, errors: { ...contact.errors, phonenumber: false } });
                            }}
                            error={contact?.errors?.phonenumber}
                            helperText={contact?.errors?.phonenumber ? "Le numéro de téléphone n'est pas valide" : ''}
                            id="phonenumber"
                            label="Téléphone"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            value={contact.age}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setContact({ ...contact, age: isNaN(event.target.valueAsNumber) ? undefined : event.target.valueAsNumber, errors: { ...contact.errors, age: false } });
                            }}
                            id="age"
                            label="Age"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                    </Stack>
                </DialogContent>
                {props.create ?
                    (<DialogActions>
                        <Button variant='outlined' color="warning" onClick={onDialogClose}>Annuler</Button>
                        <Button variant='contained' onClick={createContact}>Créer</Button>
                    </DialogActions>) : (<DialogActions>
                        <Stack spacing={2} sx={{ width: '100%' }} direction='row' justifyContent='space-between'>
                            {!confirmDelete ? (<Button variant='outlined' color="error" onClick={() => setConfirmDelete(true)}>Supprimer</Button>)
                                : (<Button variant='contained' color="error" onClick={deleteContact}>Confirmer la suppression</Button>)
                            }
                            <Stack spacing={2} direction='row'>
                                <Button variant='outlined' color="warning" onClick={onDialogClose}>Annuler</Button>
                                <Button variant='contained' onClick={updateContact}>Mettre à jour</Button>
                            </Stack>
                        </Stack>
                    </DialogActions>)}

            </Dialog>
        </>

    );
}