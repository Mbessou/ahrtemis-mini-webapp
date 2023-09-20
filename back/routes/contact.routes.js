const express = require('express')
const router = express.Router()
const contact = require('../controllers/contact.controller');

router.get('/contacts', contact.getAllContacts)
router.get('/contacts/email/:email', contact.getContactByEmail)
router.get('/contacts/:id', contact.getContact)
router.post('/contacts', contact.createContact)
router.put('/contacts/:id', contact.updateContact)
router.delete('/contacts/:id', contact.deleteContact)

module.exports = router;