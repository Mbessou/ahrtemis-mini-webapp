const pgp = require('pg-promise')()
const db = pgp(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`)

exports.getAll = async () => {
    return await db.manyOrNone('SELECT * FROM contacts')
}

exports.getOne = async (id) => {
    return await db.oneOrNone('SELECT * FROM contacts WHERE id = $1', id)
}

exports.getOneByEmail = async (email) => {
    return await db.oneOrNone('SELECT * FROM contacts WHERE email = $1', id)
}

exports.updateById = async (id, body) => {
    const { firstname, lastname, email, address, phonenumber, age } = body;
    const values = [firstname, lastname, email, address, phonenumber, age, id]
    const query = `
        UPDATE contacts
        SET
            firstname = $1,
            lastname = $2,
            email = $3,
            address = $4,
            phonenumber = $5,
            age = $6
        WHERE id = $7
    `
    return await db.oneOrNone(query, values)
}

exports.add = async (body) => {
    const { firstname, lastname, email, address, phonenumber, age } = body;
    const values = [firstname, lastname, email, address, phonenumber, age]
    const query = `
            INSERT INTO contacts (firstname, lastname, email, address, phonenumber, age)
        VALUES ($1, $2, $3, $4, $5, $6)
    `
    return await db.oneOrNone(query, values)
}

exports.deleteById = async (id) => {
    return await db.oneOrNone('DELETE FROM contacts WHERE id = $1', id)
}