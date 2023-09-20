const serviceContact = require('../services/contact.service')

exports.getAllContacts = (req, res) => {
    serviceContact.getAll()
        .then((data) => {
            if (!data || !data.length) {
                res.status(204).send({ contacts: [] });
            }
            res.status(200).send({ contacts: data });
        })
        .catch((err) => {
            res.status(500).send(httpError(500, { error_description: "An error occurred while getting all user" }));
        })
}

exports.getContactByEmail = (req, res) => {
    if (!req.params.email) {
        res.status(400).send(httpError(400, { error_description: `Mandatory params missing or wrong (email)` }));
    }
    serviceContact.getOneByEmail(req.params.email)
        .then((data) => {
            if (!data || !data.length) {
                res.status(204).send({ contacts: null });
            }
            res.status(200).send({ contact: data });
        })
        .catch((err) => {
            res.status(500).send(httpError(500, { error_description: "An error occurred while getting user by email" }));
        })
}

exports.getContact = (req, res) => {
    if (!req.params.id) {
        res.status(400).send(`Mandatory params missing (id)`);
    }
    serviceContact.getOne(req.params.id)
        .then((data) => {
            if (!data || !data.length) {
                res.status(204).send({ contacts: null });
            }
            res.status(200).send({ contact: data });
        })
        .catch((err) => {
            res.status(500).send(httpError(500, { error_description: "An error occurred while getting user" }));
        })
}

exports.createContact = (req, res) => {
    if (!req.body || !req.body.email) {
        res.status(400).send(httpError(400, { error_description: `Mandatory body fields missing (email)` }));

    }
    serviceContact.add(req.body)
        .then((data) => {
            res.status(201).send(`User ${id} created successfully`);
        })
        .catch((err) => {
            res.status(500).send(httpError(500, { error_description: "An error occurred while creating user" }));
        })
}

exports.updateContact = (req, res) => {
    if (!req.body || !req.body.email) {
        res.status(400).send(httpError(400, { error_description: `Mandatory body fields missing (email)` }));
    } else if (!req.params.id) {
        res.status(400).send(httpError(400, { error_description: `Mandatory params missing (id)` }));
    }
    serviceContact.updateById(req.params.id, req.body)
        .then((data) => {
            res.status(200).send(`User ${id} updated successfully`);
        })
        .catch((err) => {
            res.status(500).send(httpError(500, { error_description: "An error occurred while updating user" }));
        })
}

exports.deleteContact = (req, res) => {
    if (!req.params.id) {
        res.status(400).send(httpError(400, { error_description: `Mandatory params missing (id)` }));
    }
    serviceContact.deleteById(req.params.id)
        .then((data) => {
            res.status(200).send(`User ${id} deleted successfully`);
        })
        .catch((err) => {
            res.status(500).send(httpError(500, { error_description: "An error occurred while deleting user" }));
        })
}