const serviceContact = require('../services/contact.service')
const httpError = require('http-errors');

exports.getAllContacts = (req, res) => {
    serviceContact.getAll()
        .then((data) => {
            if (!data || !data.length) {
                return res.status(204).send({ contacts: [] });
            }
            return res.status(200).send({ contacts: data });
        })
        .catch((err) => {
            console.error('err', err);
            return res.status(500).send(httpError(500, { error_description: "An error occurred while getting all user" }));
        })
}

exports.getContactByEmail = (req, res) => {
    if (!req.params.email) {
        return res.status(400).send(httpError(400, { error_description: `Mandatory params missing or wrong (email)` }));
    }
    serviceContact.getOneByEmail(req.params.email)
        .then((data) => {
            if (!data || !data.length) {
                return res.status(204).send({ contacts: null });
            }
            return res.status(200).send({ contact: data });
        })
        .catch((err) => {
            console.error('err', err);
            return res.status(500).send(httpError(500, { error_description: "An error occurred while getting user by email" }));
        })
}

exports.getContact = (req, res) => {
    if (!req.params.id) {
        return res.status(400).send(`Mandatory params missing (id)`);
    }
    serviceContact.getOne(req.params.id)
        .then((data) => {
            if (!data || !data.length) {
                return res.status(204).send({ contacts: null });
            }
            return res.status(200).send({ contact: data });
        })
        .catch((err) => {
            console.error('err', err);
            return res.status(500).send(httpError(500, { error_description: "An error occurred while getting user" }));
        })
}

exports.createContact = (req, res) => {
    if (!req.body || !req.body.email) {
        return res.status(400).send(httpError(400, { error_description: `Mandatory body fields missing (email)` }));

    }
    serviceContact.add(req.body)
        .then((data) => {
            return res.status(201).send(`User created successfully`);
        })
        .catch((err) => {
            console.error('err', err);
            return res.status(500).send(httpError(500, { error_description: "An error occurred while creating user" }));
        })
}

exports.updateContact = (req, res) => {
    if (!req.body || !req.body.email) {
        return res.status(400).send(httpError(400, { error_description: `Mandatory body fields missing (email)` }));
    } else if (!req.params.id) {
        return res.status(400).send(httpError(400, { error_description: `Mandatory params missing (id)` }));
    }
    serviceContact.updateById(req.params.id, req.body)
        .then((data) => {
            return res.status(200).send(`User ${req.params.id} updated successfully`);
        })
        .catch((err) => {
            console.error('err', err);
            return res.status(500).send(httpError(500, { error_description: "An error occurred while updating user" }));
        })
}

exports.deleteContact = (req, res) => {
    if (!req.params.id) {
        return res.status(400).send(httpError(400, { error_description: `Mandatory params missing (id)` }));
    }
    serviceContact.deleteById(req.params.id)
        .then((data) => {
            return res.status(200).send(`User ${req.params.id} deleted successfully`);
        })
        .catch((err) => {
            console.error('err', err);
            return res.status(500).send(httpError(500, { error_description: "An error occurred while deleting user" }));
        })
}