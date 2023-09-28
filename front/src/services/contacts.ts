import axios from 'axios';
import { Contact } from '../models/contact'

const url: string = 'http://localhost:4000';
const base: string = 'contacts'

export const getAll = () => {
    return axios.get(`${url}/${base}`)
}

export const getById = (id: string) => {
    return axios.get(`${url}/${base}/${id}`)
}

export const getByEmail = (email: string) => {
    return axios.get(`${url}/${base}/email/${email}`)
}

export const create = (contact: Contact) => {
    return axios.post(`${url}/${base}`, contact)
}

export const updateById = (id: string, contact: Contact) => {
    return axios.put(`${url}/${base}/${id}`, contact)
}

export const deleteById = (id: string) => {
    return axios.delete(`${url}/${base}/${id}`)
}