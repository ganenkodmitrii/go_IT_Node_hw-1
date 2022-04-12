const fs = require('fs').promises
const path = require('path')
const generateUniqueId = require('generate-unique-id')

const contactsPath = path.join(__dirname, '../db/contacts.json')

export async function listContacts() {
  try {
    return JSON.parse(await fs.readFile(contactsPath))
  } catch (err) {
    return err.message
  }
}

export async function getContactById(contactId) {
  try {
    const foundContact = JSON.parse(await fs.readFile(contactsPath)).find((contact) => contact.id === contactId)
    return foundContact || 'Contact not found'
  } catch (err) {
    return err.message
  }
}

export async function searchContact(value) {
  try {
    const foundContact = JSON.parse(await fs.readFile(contactsPath)).find((contact) => contact.name.includes(value))

    return foundContact || 'Contact not found'
  } catch (err) {
    return err.message
  }
}

export async function removeContact(contactId) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath)).filter((contact) => contact.id !== contactId)

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  } catch (err) {
    return err.message
  }
}

export async function addContact({ id: defaultId, name, email, phone }) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath))
    const id = defaultId || Number(generateUniqueId({ length: 5, useLetters: false }))
    contacts.push({ id, name, email, phone })
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  } catch (err) {
    return err.message
  }
}
